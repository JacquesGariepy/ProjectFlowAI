import { BackupConfig } from '../context/SettingsContext';

interface BackupJob {
  id: string;
  configId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  progress: number; // 0-100
  size: number; // bytes
  compressedSize?: number;
  location: string;
  logs: BackupLog[];
  error?: string;
  retryCount: number;
  estimatedCompletion?: string;
}

interface BackupLog {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: any;
}

interface BackupHistory {
  id: string;
  configId: string;
  timestamp: string;
  status: 'success' | 'failed' | 'partial';
  size: string;
  duration: number; // seconds
  location: string;
  verificationStatus: 'verified' | 'failed' | 'pending' | 'skipped';
  compressionRatio?: number;
}

interface BackupDestination {
  type: 'local' | 'cloud' | 's3' | 'ftp' | 'sftp' | 'dropbox' | 'gdrive';
  name: string;
  config: {
    path?: string;
    bucket?: string;
    region?: string;
    accessKey?: string;
    secretKey?: string;
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    token?: string;
  };
  available: boolean;
  spaceUsed: number;
  spaceTotal: number;
  lastSync?: string;
}

interface BackupMetrics {
  totalBackups: number;
  successfulBackups: number;
  failedBackups: number;
  totalSize: number;
  averageDuration: number;
  lastBackup: string;
  nextBackup: string;
  storageUsage: {
    destination: string;
    used: number;
    total: number;
    percentage: number;
  }[];
  compressionStats: {
    averageRatio: number;
    totalSaved: number;
  };
}

interface RestoreJob {
  id: string;
  backupId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  endTime?: string;
  targetPath: string;
  restoredFiles: number;
  totalFiles: number;
  error?: string;
}

interface BackupValidation {
  backupId: string;
  status: 'valid' | 'corrupted' | 'incomplete';
  checkedFiles: number;
  corruptedFiles: number;
  missingFiles: number;
  checksumErrors: number;
  validationTime: number;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class BackupService {
  private static getAuthHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'application/json',
    };
  }

  static async createBackupConfig(config: Omit<BackupConfig, 'id'>): Promise<{
    success: boolean;
    configId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/configs`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(config),
      });

      const result = await response.json();
      return {
        success: response.ok,
        configId: result.configId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create backup config',
      };
    }
  }

  static async updateBackupConfig(configId: string, updates: Partial<BackupConfig>): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/configs/${configId}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(updates),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update backup config',
      };
    }
  }

  static async deleteBackupConfig(configId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/configs/${configId}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete backup config',
      };
    }
  }

  static async runBackup(configId: string): Promise<{
    success: boolean;
    jobId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/run`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ configId }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        jobId: result.jobId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start backup',
      };
    }
  }

  static async getBackupJob(jobId: string): Promise<BackupJob | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/jobs/${jobId}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get backup job:', error);
    }

    return null;
  }

  static async getActiveJobs(): Promise<BackupJob[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/jobs/active`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get active jobs:', error);
    }

    return [];
  }

  static async cancelBackupJob(jobId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/jobs/${jobId}/cancel`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to cancel backup job',
      };
    }
  }

  static async getBackupHistory(configId?: string, limit: number = 50): Promise<BackupHistory[]> {
    try {
      const url = new URL(`${API_BASE_URL}/backup/history`);
      if (configId) url.searchParams.append('configId', configId);
      url.searchParams.append('limit', limit.toString());

      const response = await fetch(url.toString(), {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get backup history:', error);
    }

    return [];
  }

  static async restoreFromBackup(
    backupId: string, 
    targetPath: string,
    options?: {
      overwrite?: boolean;
      includePatterns?: string[];
      excludePatterns?: string[];
    }
  ): Promise<{
    success: boolean;
    restoreJobId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/restore`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          backupId,
          targetPath,
          options,
        }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        restoreJobId: result.restoreJobId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to start restore',
      };
    }
  }

  static async getRestoreJob(jobId: string): Promise<RestoreJob | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/restore-jobs/${jobId}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get restore job:', error);
    }

    return null;
  }

  static async validateBackup(backupId: string): Promise<{
    success: boolean;
    validation?: BackupValidation;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/${backupId}/validate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();
      return {
        success: response.ok,
        validation: result.validation,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to validate backup',
      };
    }
  }

  static async getBackupMetrics(): Promise<BackupMetrics | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/metrics`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get backup metrics:', error);
    }

    return null;
  }

  static async testDestination(destination: BackupDestination): Promise<{
    success: boolean;
    available: boolean;
    spaceInfo?: {
      used: number;
      total: number;
      available: number;
    };
    latency?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/test-destination`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(destination),
      });

      const result = await response.json();
      return {
        success: response.ok,
        available: result.available,
        spaceInfo: result.spaceInfo,
        latency: result.latency,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        available: false,
        error: error instanceof Error ? error.message : 'Test failed',
      };
    }
  }

  static async getDestinations(): Promise<BackupDestination[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/destinations`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get destinations:', error);
    }

    return [];
  }

  static async addDestination(destination: Omit<BackupDestination, 'available' | 'spaceUsed' | 'spaceTotal'>): Promise<{
    success: boolean;
    destinationId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/destinations`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(destination),
      });

      const result = await response.json();
      return {
        success: response.ok,
        destinationId: result.destinationId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add destination',
      };
    }
  }

  static async scheduleBackup(configId: string, schedule: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string; // HH:MM
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
    timezone: string;
  }): Promise<{
    success: boolean;
    scheduleId?: string;
    nextRun?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/schedule`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ configId, schedule }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        scheduleId: result.scheduleId,
        nextRun: result.nextRun,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to schedule backup',
      };
    }
  }

  static async getScheduledBackups(): Promise<{
    configId: string;
    configName: string;
    frequency: string;
    nextRun: string;
    lastRun?: string;
    enabled: boolean;
  }[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/scheduled`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get scheduled backups:', error);
    }

    return [];
  }

  static async exportBackupReport(format: 'pdf' | 'excel' | 'json' = 'pdf'): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/report?format=${format}`, {
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

  static async cleanupOldBackups(configId: string, retentionDays: number): Promise<{
    success: boolean;
    deletedCount?: number;
    freedSpace?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/backup/cleanup`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ configId, retentionDays }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        deletedCount: result.deletedCount,
        freedSpace: result.freedSpace,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Cleanup failed',
      };
    }
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  static calculateCompressionRatio(originalSize: number, compressedSize: number): number {
    if (originalSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
  }

  static estimateBackupTime(dataSize: number, networkSpeed: number): number {
    // Estimate in seconds, considering compression and overhead
    const compressionRatio = 0.7; // Assume 30% compression
    const overhead = 1.2; // 20% overhead for metadata, verification, etc.
    
    const effectiveSize = dataSize * compressionRatio * overhead;
    return Math.ceil(effectiveSize / networkSpeed);
  }

  static validateBackupConfig(config: Partial<BackupConfig>): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!config.name?.trim()) {
      errors.push('Backup name is required');
    }

    if (!config.frequency) {
      errors.push('Backup frequency is required');
    }

    if (!config.destination) {
      errors.push('Backup destination is required');
    }

    if (config.retention !== undefined && config.retention < 1) {
      errors.push('Retention period must be at least 1 day');
    }

    if (config.schedule) {
      if (!config.schedule.hour || config.schedule.hour < 0 || config.schedule.hour > 23) {
        errors.push('Invalid backup hour (0-23)');
      }
      if (!config.schedule.minute || config.schedule.minute < 0 || config.schedule.minute > 59) {
        errors.push('Invalid backup minute (0-59)');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static generateBackupName(prefix: string = 'backup'): string {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
    return `${prefix}-${timestamp}`;
  }
}

export type {
  BackupJob,
  BackupLog,
  BackupHistory,
  BackupDestination,
  BackupMetrics,
  RestoreJob,
  BackupValidation,
};