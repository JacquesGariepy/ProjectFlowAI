import { igniteEngine, loadModels, Message } from 'multi-llm-ts';

export interface AIConfig {
  provider: 'anthropic' | 'azure' | 'cerebras' | 'deepseek' | 'google' | 'groq' | 'meta' | 'mistralai' | 'openai' | 'ollama' | 'openrouter' | 'xai';
  apiKey: string;
  model?: string;
}

export class AIService {
  private engine: any;
  private config: AIConfig;
  private models: any;
  private initialized: boolean = false;

  constructor(config: AIConfig) {
    this.config = config;
  }

  private async setupProvider() {
    if (this.initialized) return;
    
    try {
      // Check if we have a valid API key
      if (!this.config.apiKey || this.config.apiKey === 'test-key-replace-with-real-key' || this.config.apiKey === 'your-api-key-here') {
        throw new Error('Invalid API key - using fallback mode');
      }
      
      this.engine = igniteEngine(this.config.provider, {
        apiKey: this.config.apiKey
      });
      
      // Load available models for the provider
      this.models = await loadModels(this.config.provider, {
        apiKey: this.config.apiKey
      });
      
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize AI engine:', error);
      throw error;
    }
  }

  private getDefaultModel(): string {
    switch (this.config.provider) {
      case 'openai':
        return 'gpt-4o-mini';
      case 'anthropic':
        return 'claude-sonnet-4-20250514';
      case 'google':
        return 'gemini-pro';
      case 'groq':
        return 'llama-3.1-8b-instant';
      default:
        return 'gpt-4o-mini';
    }
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      // Ensure service is initialized
      await this.setupProvider();
      
      // Check if models are available
      if (!this.models || !this.models.chat || this.models.chat.length === 0) {
        throw new Error('No chat models available');
      }
      
      // Use the first available chat model or find specific model
      const selectedModel = this.config.model 
        ? this.models.chat.find((m: any) => m.id === this.config.model) || this.models.chat[0]
        : this.models.chat[0];
      
      if (!selectedModel) {
        throw new Error('No suitable model found');
      }
      
      const messages = [
        new Message('user', prompt)
      ];
      
      const response = await this.engine.complete(selectedModel, messages);
      return response.content || response.toString();
    } catch (error) {
      console.error('AI service error:', error);
      
      // Si erreur 429 (rate limit), attendre avant de réessayer
      if (error instanceof Error && (error.message?.includes('429') || error.message?.includes('Too Many Requests'))) {
        console.warn('Rate limit reached, switching to fallback mode');
        throw new Error('Rate limit reached - using fallback responses');
      }
      
      throw new Error('Failed to generate AI response');
    }
  }

  async analyzeProject(projectData: any): Promise<string> {
    const prompt = `Analyze this project data and provide insights:
    ${JSON.stringify(projectData, null, 2)}
    
    Please provide:
    1. Project status summary
    2. Key metrics and trends
    3. Recommendations for improvement
    4. Risk assessment`;

    return this.generateResponse(prompt);
  }

  async generateTaskSuggestions(projectContext: any): Promise<string[]> {
    const prompt = `Based on this project context, suggest relevant tasks:
    ${JSON.stringify(projectContext, null, 2)}
    
    Provide 5-10 specific, actionable task suggestions that would help improve the project.`;

    const response = await this.generateResponse(prompt);
    return response.split('\n').filter(line => line.trim().length > 0);
  }
}

export const createAIService = (config: AIConfig): AIService => {
  return new AIService(config);
};