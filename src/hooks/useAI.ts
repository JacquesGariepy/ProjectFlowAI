import { useState, useEffect } from 'react';
import { AIService, createAIService } from '../config/ai';

interface AIHookConfig {
  provider?: 'openai' | 'anthropic' | 'google' | 'groq';
  apiKey?: string;
  model?: string;
}

export const useAI = (config?: AIHookConfig) => {
  const [aiService, setAiService] = useState<AIService | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const provider = config?.provider || 
        (import.meta.env.VITE_AI_PROVIDER as 'openai' | 'anthropic' | 'google' | 'groq') || 
        'openai';
      const apiKey = config?.apiKey || import.meta.env.VITE_AI_API_KEY || '';
      
      if (!apiKey || apiKey === 'your-api-key-here' || apiKey === 'test-key-replace-with-real-key') {
        console.warn('AI API key not configured. AI features will use fallback responses.');
        setAiService(null);
        setError(null);
        return;
      }
      
      const service = createAIService({
        provider,
        apiKey,
        model: config?.model || import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini'
      });
      
      setAiService(service);
      setError(null);
    } catch (err) {
      console.error('Failed to initialize AI service:', err);
      setError('Failed to initialize AI service');
      setAiService(null);
    }
  }, [config]);

  const generateResponse = async (prompt: string): Promise<string> => {
    if (!aiService) {
      throw new Error('AI service not available');
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await aiService.generateResponse(prompt);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI generation failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeProject = async (projectData: any): Promise<string> => {
    if (!aiService) {
      throw new Error('AI service not available');
    }

    setIsLoading(true);
    setError(null);

    try {
      const analysis = await aiService.analyzeProject(projectData);
      return analysis;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Project analysis failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTaskSuggestions = async (projectContext: any): Promise<string[]> => {
    if (!aiService) {
      throw new Error('AI service not available');
    }

    setIsLoading(true);
    setError(null);

    try {
      const suggestions = await aiService.generateTaskSuggestions(projectContext);
      return suggestions;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Task suggestions failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    aiService,
    isLoading,
    error,
    isAvailable: !!aiService,
    generateResponse,
    analyzeProject,
    generateTaskSuggestions,
  };
};