import { 
  DatabaseConnection, 
  BackupConfig, 
  Integration, 
  AISettings,
  SecuritySettings,
  NotificationSettings 
} from '../context/SettingsContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Encryption utilities for sensitive data
class EncryptionService {
  private static key = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key-change-in-production';

  static async encrypt(data: string): Promise<string> {
    try {
      // In production, use proper encryption library like crypto-js
      return btoa(data); // Simple base64 for demo
    } catch (error) {
      console.error('Encryption failed:', error);
      return data;
    }
  }

  static async decrypt(encryptedData: string): Promise<string> {
    try {
      return atob(encryptedData); // Simple base64 decode for demo
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData;
    }
  }
}

// Database service
export class DatabaseService {
  static async testConnection(config: Omit<DatabaseConnection, 'id' | 'status' | 'lastConnection'>): Promise<{
    success: boolean;
    error?: string;
    latency?: number;
  }> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${API_BASE_URL}/database/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          ...config,
          password: await EncryptionService.encrypt(config.password),
        }),
      });

      const result = await response.json();
      const latency = Date.now() - startTime;

      return {
        success: response.ok && result.success,
        error: result.error,
        latency,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed',
        latency: Date.now() - startTime,
      };
    }
  }

  static async getConnectionStats(id: string): Promise<{
    totalQueries: number;
    queriesPerSecond: number;
    averageResponseTime: number;
    activeConnections: number;
    errors24h: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${id}/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get database stats:', error);
    }

    // Fallback with mock data
    return {
      totalQueries: Math.floor(Math.random() * 100000),
      queriesPerSecond: Math.floor(Math.random() * 2000),
      averageResponseTime: Math.floor(Math.random() * 50) + 10,
      activeConnections: Math.floor(Math.random() * 20) + 5,
      errors24h: Math.floor(Math.random() * 10),
    };
  }

  static async executeQuery(id: string, query: string): Promise<{
    success: boolean;
    data?: any[];
    error?: string;
    executionTime?: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${id}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ query }),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Query execution failed',
      };
    }
  }
}

// Backup service
export class BackupService {
  static async runBackup(config: BackupConfig): Promise<{
    success: boolean;
    size?: string;
    location?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          id: config.id,
          destination: config.destination,
          compression: config.compression,
          encryption: config.encryption,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          size: result.size,
          location: result.location,
        };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.message,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Backup failed',
      };
    }
  }

  static async scheduleBackup(config: BackupConfig): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(config),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to schedule backup:', error);
      return false;
    }
  }

  static async getBackupHistory(configId: string): Promise<{
    id: string;
    timestamp: string;
    size: string;
    status: 'success' | 'failed' | 'partial';
    location: string;
    duration: number;
  }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/${configId}/history`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get backup history:', error);
    }

    return [];
  }

  static async restoreFromBackup(backupId: string, targetPath?: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/${backupId}/restore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ targetPath }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Restore failed',
      };
    }
  }
}

// Integration service
export class IntegrationService {
  static async connect(type: string, config: any): Promise<{
    success: boolean;
    config?: any;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/integrations/${type}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(config),
      });

      const result = await response.json();
      return {
        success: response.ok,
        config: result.config,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }

  static async disconnect(type: string, integrationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/integrations/${type}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ integrationId }),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to disconnect integration:', error);
      return false;
    }
  }

  static async sync(integrationId: string): Promise<{
    success: boolean;
    syncedItems?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/integrations/${integrationId}/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      const result = await response.json();
      return {
        success: response.ok,
        syncedItems: result.syncedItems,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sync failed',
      };
    }
  }

  static async getOAuthUrl(type: string): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/integrations/${type}/oauth-url`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result.url;
      }
    } catch (error) {
      console.error('Failed to get OAuth URL:', error);
    }

    return null;
  }

  static async handleOAuthCallback(type: string, code: string): Promise<{
    success: boolean;
    config?: any;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/integrations/${type}/oauth-callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        config: result.config,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'OAuth callback failed',
      };
    }
  }
}

// AI service
export class AISettingsService {
  static async validateApiKey(provider: string, apiKey: string): Promise<{
    valid: boolean;
    quota?: {
      used: number;
      limit: number;
      resetDate: string;
    };
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/validate-key`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ provider, apiKey }),
      });

      const result = await response.json();
      return {
        valid: response.ok && result.valid,
        quota: result.quota,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        valid: false,
        error: error instanceof Error ? error.message : 'Validation failed',
      };
    }
  }

  static async getUsageStats(): Promise<{
    totalRequests: number;
    totalTokens: number;
    averageResponseTime: number;
    errorRate: number;
    costThisMonth: number;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/usage-stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get AI usage stats:', error);
    }

    // Fallback with mock data
    return {
      totalRequests: Math.floor(Math.random() * 10000),
      totalTokens: Math.floor(Math.random() * 1000000),
      averageResponseTime: Math.floor(Math.random() * 2000) + 500,
      errorRate: Math.random() * 5,
      costThisMonth: Math.random() * 100,
    };
  }

  static async testModel(settings: AISettings, prompt: string): Promise<{
    success: boolean;
    response?: string;
    responseTime?: number;
    tokensUsed?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/ai/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          model: settings.modelVersion,
          prompt,
          maxTokens: settings.maxTokens,
          temperature: settings.temperature,
        }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        response: result.response,
        responseTime: result.responseTime,
        tokensUsed: result.tokensUsed,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Test failed',
      };
    }
  }
}

// Security service
export class SecurityService {
  static async changePassword(currentPassword: string, newPassword: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          currentPassword: await EncryptionService.encrypt(currentPassword),
          newPassword: await EncryptionService.encrypt(newPassword),
        }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password change failed',
      };
    }
  }

  static async setup2FA(): Promise<{
    success: boolean;
    qrCode?: string;
    secret?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/setup`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      const result = await response.json();
      return {
        success: response.ok,
        qrCode: result.qrCode,
        secret: result.secret,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '2FA setup failed',
      };
    }
  }

  static async verify2FA(code: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '2FA verification failed',
      };
    }
  }

  static async disable2FA(password: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/2fa/disable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          password: await EncryptionService.encrypt(password),
        }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '2FA disable failed',
      };
    }
  }

  static async getSecurityLog(): Promise<{
    id: string;
    action: string;
    timestamp: string;
    ipAddress: string;
    userAgent: string;
    status: 'success' | 'failed' | 'warning';
    details?: string;
  }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/security-log`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get security log:', error);
    }

    return [];
  }
}

// Notification service
export class NotificationService {
  static async sendTestNotification(type: 'email' | 'push' | 'sms'): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ type }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Test notification failed',
      };
    }
  }

  static async updatePreferences(settings: NotificationSettings): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(settings),
      });

      return response.ok;
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
      return false;
    }
  }

  static async verifyChannel(type: 'email' | 'sms', code: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ type, code }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Verification failed',
      };
    }
  }
}

export {
  EncryptionService,
  DatabaseService,
  BackupService,
  IntegrationService,
  AISettingsService,
  SecurityService,
  NotificationService,
};