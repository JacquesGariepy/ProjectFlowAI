import { AISettings } from '../context/SettingsContext';

interface AIModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic' | 'google' | 'cohere' | 'huggingface';
  type: 'text' | 'chat' | 'image' | 'code' | 'embedding';
  maxTokens: number;
  costPer1kTokens: number;
  contextWindow: number;
  capabilities: string[];
  description: string;
  recommended: boolean;
  available: boolean;
}

interface AIUsageStats {
  totalRequests: number;
  totalTokens: number;
  totalCost: number;
  averageResponseTime: number;
  successRate: number;
  errorRate: number;
  popularModels: { model: string; usage: number; }[];
  dailyUsage: { date: string; requests: number; tokens: number; cost: number; }[];
  monthlyQuota: {
    used: number;
    limit: number;
    resetDate: string;
  };
}

interface AIResponse {
  id: string;
  model: string;
  prompt: string;
  response: string;
  tokensUsed: number;
  responseTime: number;
  cost: number;
  timestamp: string;
  status: 'success' | 'error' | 'partial';
  error?: string;
  metadata?: any;
}

interface AIOptimization {
  suggestions: {
    type: 'cost' | 'performance' | 'quality';
    current: string;
    suggested: string;
    impact: string;
    savings?: number;
  }[];
  modelRecommendations: {
    currentModel: string;
    suggestedModel: string;
    reason: string;
    expectedImprovement: string;
  }[];
  promptOptimizations: {
    original: string;
    optimized: string;
    improvements: string[];
  }[];
}

interface ModelComparison {
  models: string[];
  metrics: {
    responseTime: number[];
    cost: number[];
    quality: number[];
    accuracy: number[];
  };
  testPrompts: {
    prompt: string;
    responses: { model: string; response: string; score: number; }[];
  }[];
  recommendation: string;
}

interface AIProvider {
  id: string;
  name: string;
  apiUrl: string;
  requiresKey: boolean;
  models: AIModel[];
  status: 'active' | 'inactive' | 'error';
  healthCheck?: {
    lastCheck: string;
    status: 'healthy' | 'degraded' | 'down';
    responseTime: number;
  };
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class AIService {
  private static getAuthHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'application/json',
    };
  }

  static async getAvailableModels(): Promise<AIModel[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/models`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get AI models:', error);
    }

    // Fallback with default models
    return this.getDefaultModels();
  }

  private static getDefaultModels(): AIModel[] {
    return [
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'openai',
        type: 'chat',
        maxTokens: 4096,
        costPer1kTokens: 0.03,
        contextWindow: 8192,
        capabilities: ['text-generation', 'code', 'analysis', 'creative-writing'],
        description: 'Most capable model with best reasoning abilities',
        recommended: true,
        available: true,
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'openai',
        type: 'chat',
        maxTokens: 4096,
        costPer1kTokens: 0.002,
        contextWindow: 4096,
        capabilities: ['text-generation', 'code', 'analysis'],
        description: 'Fast and cost-effective for most tasks',
        recommended: false,
        available: true,
      },
      {
        id: 'claude-3-opus',
        name: 'Claude 3 Opus',
        provider: 'anthropic',
        type: 'chat',
        maxTokens: 4096,
        costPer1kTokens: 0.015,
        contextWindow: 200000,
        capabilities: ['text-generation', 'analysis', 'reasoning', 'creative-writing'],
        description: 'Excellent for complex reasoning and analysis',
        recommended: false,
        available: true,
      },
    ];
  }

  static async validateApiKey(provider: string, apiKey: string): Promise<{
    valid: boolean;
    quota?: {
      used: number;
      limit: number;
      resetDate: string;
    };
    models?: string[];
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/validate-key`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ provider, apiKey }),
      });

      const result = await response.json();
      return {
        valid: response.ok && result.valid,
        quota: result.quota,
        models: result.models,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Validation failed',
      };
    }
  }

  static async testModel(
    modelId: string, 
    prompt: string, 
    settings?: Partial<AISettings>
  ): Promise<{
    success: boolean;
    response?: AIResponse;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/test`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          model: modelId,
          prompt,
          maxTokens: settings?.maxTokens || 1000,
          temperature: settings?.temperature || 0.7,
          customInstructions: settings?.customInstructions || '',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        return {
          success: true,
          response: result.response,
        };
      } else {
        return {
          success: false,
          error: result.message || 'Test failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Test failed',
      };
    }
  }

  static async getUsageStats(timeframe: 'day' | 'week' | 'month' = 'month'): Promise<AIUsageStats | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/usage-stats?timeframe=${timeframe}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get usage stats:', error);
    }

    return null;
  }

  static async optimizeSettings(currentSettings: AISettings): Promise<AIOptimization | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/optimize`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ settings: currentSettings }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get optimization suggestions:', error);
    }

    return null;
  }

  static async compareModels(modelIds: string[], testPrompts: string[]): Promise<ModelComparison | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/compare`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ models: modelIds, prompts: testPrompts }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to compare models:', error);
    }

    return null;
  }

  static async getProviders(): Promise<AIProvider[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/providers`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get providers:', error);
    }

    return [];
  }

  static async updateProviderConfig(
    providerId: string, 
    config: { apiKey?: string; baseUrl?: string; }
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/providers/${providerId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(config),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }

  static async getResponseHistory(limit: number = 50): Promise<AIResponse[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/history?limit=${limit}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get response history:', error);
    }

    return [];
  }

  static async generatePromptTemplate(
    task: string, 
    context?: string
  ): Promise<{
    success: boolean;
    template?: string;
    variables?: string[];
    examples?: string[];
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/prompt-template`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ task, context }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        template: result.template,
        variables: result.variables,
        examples: result.examples,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Template generation failed',
      };
    }
  }

  static async analyzePromptPerformance(prompt: string): Promise<{
    score: number;
    suggestions: string[];
    optimized: string;
    reasoning: string;
  } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/analyze-prompt`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ prompt }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to analyze prompt:', error);
    }

    return null;
  }

  static async enableAutoOptimization(enabled: boolean): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/auto-optimization`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ enabled }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }

  static async setUsageLimits(limits: {
    dailyRequests?: number;
    monthlyCost?: number;
    tokenLimit?: number;
  }): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/usage-limits`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(limits),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Update failed',
      };
    }
  }

  static async exportUsageData(format: 'json' | 'csv' | 'xlsx' = 'json'): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/export-usage?format=${format}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return {
          success: true,
          url,
        };
      } else {
        const result = await response.json();
        return {
          success: false,
          error: result.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Export failed',
      };
    }
  }

  static async getHealthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    services: {
      name: string;
      status: 'up' | 'down';
      responseTime: number;
      lastCheck: string;
    }[];
    uptime: number;
  } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/health`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get health check:', error);
    }

    return null;
  }

  static formatCost(cost: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
    }).format(cost);
  }

  static formatTokens(tokens: number): string {
    if (tokens < 1000) return tokens.toString();
    if (tokens < 1000000) return `${(tokens / 1000).toFixed(1)}K`;
    return `${(tokens / 1000000).toFixed(1)}M`;
  }

  static calculateResponseTime(startTime: number, endTime: number): number {
    return endTime - startTime;
  }

  static estimateCost(tokens: number, model: AIModel): number {
    return (tokens / 1000) * model.costPer1kTokens;
  }

  static async createCustomModel(config: {
    name: string;
    baseModel: string;
    trainingData?: string;
    hyperparameters?: any;
  }): Promise<{
    success: boolean;
    modelId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/custom-models`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(config),
      });

      const result = await response.json();
      return {
        success: response.ok,
        modelId: result.modelId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Model creation failed',
      };
    }
  }

  static async getCustomModels(): Promise<{
    id: string;
    name: string;
    baseModel: string;
    status: 'training' | 'ready' | 'failed';
    accuracy?: number;
    createdAt: string;
  }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/custom-models`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get custom models:', error);
    }

    return [];
  }
}

export type {
  AIModel,
  AIUsageStats,
  AIResponse,
  AIOptimization,
  ModelComparison,
  AIProvider,
};