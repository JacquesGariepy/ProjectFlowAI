import { DatabaseConnection } from '../context/SettingsContext';

interface DatabaseStats {
  totalSize: number;
  tableCount: number;
  indexCount: number;
  connectionCount: number;
  activeQueries: number;
  slowQueries: number;
  queriesPerSecond: number;
  averageResponseTime: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: number;
  lastBackup?: string;
}

interface DatabasePerformance {
  timestamp: string;
  queriesPerSecond: number;
  responseTime: number;
  connectionCount: number;
  cpuUsage: number;
  memoryUsage: number;
  diskIO: {
    reads: number;
    writes: number;
  };
  cacheHitRatio: number;
}

interface DatabaseQuery {
  id: string;
  sql: string;
  database: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: string;
  endTime?: string;
  duration?: number;
  rowsAffected?: number;
  error?: string;
  user: string;
  host: string;
}

interface DatabaseTable {
  name: string;
  schema: string;
  rowCount: number;
  size: number;
  indexes: number;
  lastUpdated: string;
  engine?: string;
  collation?: string;
}

interface DatabaseIndex {
  name: string;
  table: string;
  columns: string[];
  type: 'btree' | 'hash' | 'gist' | 'gin' | 'unique' | 'primary';
  size: number;
  cardinality: number;
  usage: number;
}

interface DatabaseUser {
  name: string;
  host: string;
  privileges: string[];
  connectionCount: number;
  lastLogin?: string;
  status: 'active' | 'locked' | 'expired';
}

interface QueryAnalysis {
  query: string;
  executionPlan: any;
  estimatedCost: number;
  actualCost?: number;
  suggestions: {
    type: 'index' | 'rewrite' | 'partition' | 'cache';
    description: string;
    impact: 'low' | 'medium' | 'high';
    effort: 'easy' | 'moderate' | 'complex';
  }[];
  indexRecommendations: {
    table: string;
    columns: string[];
    reason: string;
    estimatedImprovement: number;
  }[];
}

interface DatabaseHealthCheck {
  overall: 'healthy' | 'warning' | 'critical';
  checks: {
    name: string;
    status: 'pass' | 'warning' | 'fail';
    value?: number;
    threshold?: number;
    message: string;
  }[];
  recommendations: string[];
  score: number; // 0-100
}

interface DatabaseBackupInfo {
  id: string;
  type: 'full' | 'incremental' | 'differential';
  size: number;
  startTime: string;
  endTime: string;
  status: 'success' | 'failed' | 'partial';
  location: string;
  checksum: string;
  compressed: boolean;
  encrypted: boolean;
}

interface DatabaseMigration {
  id: string;
  name: string;
  version: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'rolled_back';
  appliedAt?: string;
  rollbackAt?: string;
  checksum: string;
  executionTime?: number;
  error?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class DatabaseService {
  private static getAuthHeaders() {
    return {
      'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
      'Content-Type': 'application/json',
    };
  }

  static async testConnection(connection: Omit<DatabaseConnection, 'id' | 'status' | 'lastConnection'>): Promise<{
    success: boolean;
    latency?: number;
    version?: string;
    error?: string;
  }> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(`${API_BASE_URL}/database/test-connection`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(connection),
      });

      const result = await response.json();
      const latency = Date.now() - startTime;

      return {
        success: response.ok && result.success,
        latency,
        version: result.version,
        error: response.ok ? result.error : result.message,
      };
    } catch (error) {
      return {
        success: false,
        latency: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Connection test failed',
      };
    }
  }

  static async createConnection(connection: Omit<DatabaseConnection, 'id' | 'status' | 'lastConnection'>): Promise<{
    success: boolean;
    connectionId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/connections`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(connection),
      });

      const result = await response.json();
      return {
        success: response.ok,
        connectionId: result.connectionId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create connection',
      };
    }
  }

  static async updateConnection(connectionId: string, updates: Partial<DatabaseConnection>): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/connections/${connectionId}`, {
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
        error: error instanceof Error ? error.message : 'Failed to update connection',
      };
    }
  }

  static async deleteConnection(connectionId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/connections/${connectionId}`, {
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
        error: error instanceof Error ? error.message : 'Failed to delete connection',
      };
    }
  }

  static async getStats(connectionId: string): Promise<DatabaseStats | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/stats`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get database stats:', error);
    }

    return null;
  }

  static async getPerformanceMetrics(
    connectionId: string, 
    timeframe: '1h' | '24h' | '7d' | '30d' = '24h'
  ): Promise<DatabasePerformance[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/performance?timeframe=${timeframe}`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get performance metrics:', error);
    }

    return [];
  }

  static async executeQuery(
    connectionId: string, 
    query: string,
    options?: {
      limit?: number;
      explain?: boolean;
      timeout?: number;
    }
  ): Promise<{
    success: boolean;
    data?: any[];
    columns?: string[];
    rowCount?: number;
    executionTime?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/query`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ query, options }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        data: result.data,
        columns: result.columns,
        rowCount: result.rowCount,
        executionTime: result.executionTime,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Query execution failed',
      };
    }
  }

  static async getActiveQueries(connectionId: string): Promise<DatabaseQuery[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/queries/active`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get active queries:', error);
    }

    return [];
  }

  static async killQuery(connectionId: string, queryId: string): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/queries/${queryId}/kill`, {
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
        error: error instanceof Error ? error.message : 'Failed to kill query',
      };
    }
  }

  static async getTables(connectionId: string, schema?: string): Promise<DatabaseTable[]> {
    try {
      const url = new URL(`${API_BASE_URL}/database/${connectionId}/tables`);
      if (schema) url.searchParams.append('schema', schema);

      const response = await fetch(url.toString(), {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get tables:', error);
    }

    return [];
  }

  static async getTableInfo(connectionId: string, tableName: string, schema?: string): Promise<{
    table: DatabaseTable;
    columns: {
      name: string;
      type: string;
      nullable: boolean;
      default?: string;
      primaryKey: boolean;
      foreignKey?: {
        table: string;
        column: string;
      };
    }[];
    indexes: DatabaseIndex[];
    constraints: {
      name: string;
      type: 'primary' | 'foreign' | 'unique' | 'check';
      columns: string[];
      definition: string;
    }[];
  } | null> {
    try {
      const url = new URL(`${API_BASE_URL}/database/${connectionId}/tables/${tableName}/info`);
      if (schema) url.searchParams.append('schema', schema);

      const response = await fetch(url.toString(), {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get table info:', error);
    }

    return null;
  }

  static async getIndexes(connectionId: string, tableName?: string): Promise<DatabaseIndex[]> {
    try {
      const url = new URL(`${API_BASE_URL}/database/${connectionId}/indexes`);
      if (tableName) url.searchParams.append('table', tableName);

      const response = await fetch(url.toString(), {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get indexes:', error);
    }

    return [];
  }

  static async analyzeQuery(connectionId: string, query: string): Promise<QueryAnalysis | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/analyze-query`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to analyze query:', error);
    }

    return null;
  }

  static async optimizeQuery(connectionId: string, query: string): Promise<{
    success: boolean;
    optimizedQuery?: string;
    improvements?: string[];
    estimatedImprovement?: number;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/optimize-query`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      return {
        success: response.ok,
        optimizedQuery: result.optimizedQuery,
        improvements: result.improvements,
        estimatedImprovement: result.estimatedImprovement,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Query optimization failed',
      };
    }
  }

  static async getUsers(connectionId: string): Promise<DatabaseUser[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/users`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get database users:', error);
    }

    return [];
  }

  static async runHealthCheck(connectionId: string): Promise<DatabaseHealthCheck | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/health-check`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to run health check:', error);
    }

    return null;
  }

  static async getBackupHistory(connectionId: string): Promise<DatabaseBackupInfo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/backups`, {
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

  static async createBackup(
    connectionId: string, 
    options: {
      type: 'full' | 'incremental' | 'differential';
      compress?: boolean;
      encrypt?: boolean;
      location?: string;
    }
  ): Promise<{
    success: boolean;
    backupId?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/backups`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(options),
      });

      const result = await response.json();
      return {
        success: response.ok,
        backupId: result.backupId,
        error: response.ok ? undefined : result.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Backup creation failed',
      };
    }
  }

  static async restoreBackup(
    connectionId: string, 
    backupId: string,
    options?: {
      targetDatabase?: string;
      overwrite?: boolean;
    }
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/backups/${backupId}/restore`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(options),
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

  static async getMigrations(connectionId: string): Promise<DatabaseMigration[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/migrations`, {
        headers: this.getAuthHeaders(),
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Failed to get migrations:', error);
    }

    return [];
  }

  static async runMigration(
    connectionId: string, 
    migrationId: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/migrations/${migrationId}/run`, {
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
        error: error instanceof Error ? error.message : 'Migration failed',
      };
    }
  }

  static async rollbackMigration(
    connectionId: string, 
    migrationId: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/migrations/${migrationId}/rollback`, {
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
        error: error instanceof Error ? error.message : 'Rollback failed',
      };
    }
  }

  static async exportData(
    connectionId: string,
    options: {
      tables?: string[];
      format: 'sql' | 'csv' | 'json' | 'xlsx';
      includeSchema?: boolean;
      includeData?: boolean;
      compress?: boolean;
    }
  ): Promise<{
    success: boolean;
    url?: string;
    error?: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/database/${connectionId}/export`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(options),
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

  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  static formatQueryTime(milliseconds: number): string {
    if (milliseconds < 1000) return `${milliseconds}ms`;
    if (milliseconds < 60000) return `${(milliseconds / 1000).toFixed(1)}s`;
    return `${(milliseconds / 60000).toFixed(1)}m`;
  }

  static getConnectionString(connection: DatabaseConnection): string {
    const { type, host, port, database, username } = connection;
    
    switch (type) {
      case 'postgresql':
        return `postgresql://${username}@${host}:${port}/${database}`;
      case 'mysql':
        return `mysql://${username}@${host}:${port}/${database}`;
      case 'mongodb':
        return `mongodb://${username}@${host}:${port}/${database}`;
      case 'redis':
        return `redis://${host}:${port}/${database}`;
      default:
        return `${type}://${username}@${host}:${port}/${database}`;
    }
  }

  static validateConnectionConfig(connection: Partial<DatabaseConnection>): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!connection.name?.trim()) {
      errors.push('Connection name is required');
    }

    if (!connection.type) {
      errors.push('Database type is required');
    }

    if (!connection.host?.trim()) {
      errors.push('Host is required');
    }

    if (!connection.port || connection.port < 1 || connection.port > 65535) {
      errors.push('Valid port number is required (1-65535)');
    }

    if (!connection.database?.trim()) {
      errors.push('Database name is required');
    }

    if (!connection.username?.trim()) {
      errors.push('Username is required');
    }

    if (connection.connectionPool) {
      const { min, max, idle } = connection.connectionPool;
      if (min < 0) errors.push('Minimum pool size cannot be negative');
      if (max < min) errors.push('Maximum pool size must be greater than minimum');
      if (idle < 0) errors.push('Idle timeout cannot be negative');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export type {
  DatabaseStats,
  DatabasePerformance,
  DatabaseQuery,
  DatabaseTable,
  DatabaseIndex,
  DatabaseUser,
  QueryAnalysis,
  DatabaseHealthCheck,
  DatabaseBackupInfo,
  DatabaseMigration,
};