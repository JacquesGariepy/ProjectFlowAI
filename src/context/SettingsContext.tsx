import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { UserSettings } from '../types';

export interface AISettings {
  enabled: boolean;
  autoOptimization: boolean;
  predictiveAnalytics: boolean;
  smartNotifications: boolean;
  voiceCommands: boolean;
  dataSharing: boolean;
  modelVersion: 'gpt-4' | 'gpt-3.5' | 'claude';
  responseSpeed: 'fast' | 'balanced' | 'accurate';
  maxTokens: number;
  temperature: number;
  apiKey?: string;
  customInstructions: string;
}

export interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis';
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
  status: 'connected' | 'disconnected' | 'error';
  lastConnection?: string;
  connectionPool: {
    min: number;
    max: number;
    idle: number;
  };
}

export interface BackupConfig {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  destination: 'local' | 'cloud' | 's3' | 'ftp';
  enabled: boolean;
  lastBackup?: string;
  size?: string;
  retention: number; // days
  compression: boolean;
  encryption: boolean;
  schedule: {
    hour: number;
    minute: number;
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
  };
  cloudConfig?: {
    provider: 'aws' | 'google' | 'azure';
    bucket: string;
    region: string;
    accessKey: string;
    secretKey: string;
  };
}

export interface Integration {
  id: string;
  name: string;
  type: 'slack' | 'github' | 'figma' | 'drive' | 'trello' | 'notion' | 'discord';
  description: string;
  connected: boolean;
  lastSync?: string;
  status: 'active' | 'error' | 'pending';
  config: {
    apiKey?: string;
    webhookUrl?: string;
    accessToken?: string;
    refreshToken?: string;
    scopes?: string[];
    channelId?: string;
    workspaceId?: string;
  };
  settings: {
    syncEnabled: boolean;
    notificationsEnabled: boolean;
    autoSync: boolean;
    syncInterval: number; // minutes
  };
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: number; // minutes
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSymbols: boolean;
    historySize: number; // prevent reusing last N passwords
  };
  ipWhitelist: string[];
  allowMultipleSessions: boolean;
  requireEmailVerification: boolean;
  loginNotifications: boolean;
}

export interface NotificationSettings {
  enabled: boolean;
  email: boolean;
  push: boolean;
  desktop: boolean;
  sms: boolean;
  taskUpdates: boolean;
  projectDeadlines: boolean;
  teamMentions: boolean;
  systemAlerts: boolean;
  weeklyReports: boolean;
  channels: {
    email: {
      address: string;
      verified: boolean;
      frequency: 'instant' | 'hourly' | 'daily';
    };
    push: {
      enabled: boolean;
      deviceTokens: string[];
    };
    sms: {
      number: string;
      verified: boolean;
      emergencyOnly: boolean;
    };
  };
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM
    end: string; // HH:MM
    timezone: string;
  };
}

export interface AdvancedSettings {
  debug: boolean;
  analytics: boolean;
  crashReporting: boolean;
  performanceMonitoring: boolean;
  experimentalFeatures: boolean;
  apiRateLimit: number;
  cacheSize: number; // MB
  logLevel: 'error' | 'warn' | 'info' | 'debug';
  dataRetention: number; // days
  customCSS: string;
  webhooks: {
    id: string;
    url: string;
    events: string[];
    secret: string;
    enabled: boolean;
  }[];
}

// New comprehensive structure
export interface NewNotificationSettings {
  email: {
    projectUpdates: boolean;
    taskAssignments: boolean;
    deadlineReminders: boolean;
    weeklyReports: boolean;
    securityAlerts: boolean;
  };
  push: {
    enabled: boolean;
    quietHours: {
      start: string;
      end: string;
    };
  };
  frequency: 'instant' | 'hourly' | 'daily' | 'weekly';
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  compactMode: boolean;
  showAnimations: boolean;
  showTooltips: boolean;
  highContrast: boolean;
  fontSize: number;
}

export interface IntegrationSettings {
  github: {
    enabled: boolean;
    apiKey: string;
    webhookUrl: string;
  };
  slack: {
    enabled: boolean;
    apiKey: string;
    webhookUrl: string;
  };
  figma: {
    enabled: boolean;
    apiKey: string;
    webhookUrl: string;
  };
  chromeExtension: {
    enabled: boolean;
    apiKey: string;
    webhookUrl: string;
  };
  webhooks: Array<{
    id: string;
    name: string;
    url: string;
    events: string[];
    enabled: boolean;
  }>;
}

export interface BackupSettings {
  configurations: Array<{
    id: string;
    name: string;
    type: 'full' | 'incremental' | 'differential';
    schedule: 'hourly' | 'daily' | 'weekly' | 'monthly';
    destinations: string[];
    retention: number;
    enabled: boolean;
    lastRun: string | null;
    nextRun: string | null;
  }>;
}

export interface NewAdvancedSettings {
  debugMode: boolean;
  experimentalFeatures: boolean;
  analyticsEnabled: boolean;
  cacheSize: number;
  maxConcurrentTasks: number;
  apiTimeout: number;
}

interface GlobalSettings {
  user: UserSettings;
  ai: AISettings;
  databases: DatabaseConnection[];
  backup: BackupSettings;
  integrations: IntegrationSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
  advanced: NewAdvancedSettings;
  lastSaved: string;
  version: string;
}

type SettingsAction = 
  | { type: 'UPDATE_USER_SETTINGS'; payload: Partial<UserSettings> }
  | { type: 'UPDATE_AI_SETTINGS'; payload: Partial<AISettings> }
  | { type: 'ADD_DATABASE'; payload: DatabaseConnection }
  | { type: 'UPDATE_DATABASE'; payload: { id: string; updates: Partial<DatabaseConnection> } }
  | { type: 'REMOVE_DATABASE'; payload: string }
  | { type: 'ADD_BACKUP'; payload: any }
  | { type: 'UPDATE_BACKUP'; payload: { id: string; updates: any } }
  | { type: 'REMOVE_BACKUP'; payload: string }
  | { type: 'UPDATE_INTEGRATION_SETTINGS'; payload: Partial<IntegrationSettings> }
  | { type: 'UPDATE_SECURITY_SETTINGS'; payload: Partial<SecuritySettings> }
  | { type: 'UPDATE_NOTIFICATION_SETTINGS'; payload: Partial<NotificationSettings> }
  | { type: 'UPDATE_APPEARANCE_SETTINGS'; payload: Partial<AppearanceSettings> }
  | { type: 'UPDATE_ADVANCED_SETTINGS'; payload: Partial<NewAdvancedSettings> }
  | { type: 'LOAD_SETTINGS'; payload: GlobalSettings }
  | { type: 'RESET_SETTINGS'; payload?: undefined }
  | { type: 'EXPORT_SETTINGS'; payload?: undefined }
  | { type: 'IMPORT_SETTINGS'; payload: GlobalSettings };

const defaultSettings: GlobalSettings = {
  user: {
    notifications: {
      enabled: true,
      email: true,
      push: true,
      desktop: false,
      taskUpdates: true,
      projectDeadlines: true,
      teamMentions: true,
    },
    privacy: {
      profileVisibility: 'team',
      showOnlineStatus: true,
      allowDirectMessages: true,
    },
    preferences: {
      theme: 'system',
      language: 'fr',
      timezone: 'Europe/Paris',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
    },
  },
  ai: {
    enabled: true,
    autoOptimization: true,
    predictiveAnalytics: true,
    smartNotifications: true,
    voiceCommands: false,
    dataSharing: true,
    modelVersion: 'gpt-4',
    responseSpeed: 'balanced',
    maxTokens: 4000,
    temperature: 0.7,
    customInstructions: '',
  },
  databases: [],
  backup: {
    configurations: []
  },
  integrations: {
    github: {
      enabled: false,
      apiKey: '',
      webhookUrl: ''
    },
    slack: {
      enabled: false,
      apiKey: '',
      webhookUrl: ''
    },
    figma: {
      enabled: false,
      apiKey: '',
      webhookUrl: ''
    },
    chromeExtension: {
      enabled: false,
      apiKey: '',
      webhookUrl: ''
    },
    webhooks: []
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 720, // 12 hours
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: false,
      historySize: 5,
    },
    ipWhitelist: [],
    allowMultipleSessions: true,
    requireEmailVerification: true,
    loginNotifications: true,
  },
  notifications: {
    enabled: true,
    email: true,
    push: true,
    desktop: false,
    sms: false,
    taskUpdates: true,
    projectDeadlines: true,
    teamMentions: true,
    systemAlerts: true,
    weeklyReports: true,
    projectUpdates: true,
    taskAssignments: true,
    deadlineReminders: true,
    securityAlerts: true,
    channels: {
      email: {
        address: '',
        verified: false,
        frequency: 'instant',
      },
      push: {
        enabled: true,
        deviceTokens: [],
      },
      sms: {
        number: '',
        verified: false,
        emergencyOnly: true,
      },
    },
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
      timezone: 'Europe/Paris',
    },
    frequency: 'instant' as const,
  },
  appearance: {
    theme: 'system',
    primaryColor: 'blue',
    compactMode: false,
    showAnimations: true,
    showTooltips: true,
    highContrast: false,
    fontSize: 16
  },
  advanced: {
    debugMode: false,
    experimentalFeatures: false,
    analyticsEnabled: true,
    cacheSize: 100,
    maxConcurrentTasks: 5,
    apiTimeout: 30
  },
  lastSaved: new Date().toISOString(),
  version: '1.0.0',
};

function settingsReducer(state: GlobalSettings, action: SettingsAction): GlobalSettings {
  const newState = { ...state, lastSaved: new Date().toISOString() };

  switch (action.type) {
    case 'UPDATE_USER_SETTINGS':
      return {
        ...newState,
        user: { ...state.user, ...action.payload },
      };

    case 'UPDATE_AI_SETTINGS':
      return {
        ...newState,
        ai: { ...state.ai, ...action.payload },
      };

    case 'ADD_DATABASE':
      return {
        ...newState,
        databases: [...state.databases, action.payload],
      };

    case 'UPDATE_DATABASE':
      return {
        ...newState,
        databases: state.databases.map(db =>
          db.id === action.payload.id ? { ...db, ...action.payload.updates } : db
        ),
      };

    case 'REMOVE_DATABASE':
      return {
        ...newState,
        databases: state.databases.filter(db => db.id !== action.payload),
      };

    case 'ADD_BACKUP':
      return {
        ...newState,
        backup: {
          ...state.backup,
          configurations: [...state.backup.configurations, action.payload]
        },
      };

    case 'UPDATE_BACKUP':
      return {
        ...newState,
        backup: {
          ...state.backup,
          configurations: state.backup.configurations.map(backup =>
            backup.id === action.payload.id ? { ...backup, ...action.payload.updates } : backup
          )
        },
      };

    case 'REMOVE_BACKUP':
      return {
        ...newState,
        backup: {
          ...state.backup,
          configurations: state.backup.configurations.filter(backup => backup.id !== action.payload)
        },
      };

    case 'UPDATE_INTEGRATION_SETTINGS':
      return {
        ...newState,
        integrations: { ...state.integrations, ...action.payload },
      };

    case 'UPDATE_SECURITY_SETTINGS':
      return {
        ...newState,
        security: { ...state.security, ...action.payload },
      };

    case 'UPDATE_NOTIFICATION_SETTINGS':
      return {
        ...newState,
        notifications: { ...state.notifications, ...action.payload },
      };

    case 'UPDATE_APPEARANCE_SETTINGS':
      return {
        ...newState,
        appearance: { ...state.appearance, ...action.payload },
      };

    case 'UPDATE_ADVANCED_SETTINGS':
      return {
        ...newState,
        advanced: { ...state.advanced, ...action.payload },
      };

    case 'LOAD_SETTINGS':
      return action.payload;

    case 'RESET_SETTINGS':
      return { ...defaultSettings, lastSaved: new Date().toISOString() };

    case 'IMPORT_SETTINGS':
      return { ...action.payload, lastSaved: new Date().toISOString() };

    default:
      return state;
  }
}

interface SettingsContextType {
  settings: GlobalSettings;
  dispatch: React.Dispatch<SettingsAction>;
  saveSettings: () => Promise<void>;
  loadSettings: () => Promise<void>;
  exportSettings: () => string;
  importSettings: (data: string) => Promise<void>;
  resetSettings: () => Promise<void>;
  testDatabaseConnection: (id: string) => Promise<boolean>;
  runBackup: (id: string) => Promise<void>;
  connectIntegration: (id: string) => Promise<void>;
  disconnectIntegration: (id: string) => Promise<void>;
  validateSecurityPolicy: (password: string) => { valid: boolean; errors: string[] };
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const STORAGE_KEY = 'projectflow-settings';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, defaultSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    // Auto-save settings when they change (localStorage only)
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      } catch (error) {
        console.warn('Failed to save settings to localStorage:', error);
      }
    }, 1000); // Debounce saves

    return () => clearTimeout(timeoutId);
  }, [settings]);

  const saveSettings = async (): Promise<void> => {
    try {
      // Always save to localStorage first
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

      // Try to sync to backend silently (don't throw errors)
      try {
        if (API_BASE_URL) {
          await fetch(`${API_BASE_URL}/settings`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            },
            body: JSON.stringify(settings),
          });
        }
      } catch (apiError) {
        // Silent fail for API - we still have localStorage
      }
    } catch (error) {
      console.warn('Failed to save settings locally:', error);
    }
  };

  const loadSettings = async (): Promise<void> => {
    try {
      // Load from localStorage first (offline-first approach)
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsedSettings = JSON.parse(saved);
          dispatch({ type: 'LOAD_SETTINGS', payload: { ...defaultSettings, ...parsedSettings } });
        } catch (parseError) {
          // If parsing fails, use defaults
          dispatch({ type: 'LOAD_SETTINGS', payload: defaultSettings });
        }
      } else {
        // No saved settings, use defaults
        dispatch({ type: 'LOAD_SETTINGS', payload: defaultSettings });
      }

      // Try to sync from backend silently in background
      try {
        if (API_BASE_URL) {
          const response = await fetch(`${API_BASE_URL}/settings`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
            },
          });

          if (response.ok) {
            const serverSettings = await response.json();
            // Only update if server has newer data
            if (new Date(serverSettings.lastSaved) > new Date(settings.lastSaved)) {
              dispatch({ type: 'LOAD_SETTINGS', payload: serverSettings });
              localStorage.setItem(STORAGE_KEY, JSON.stringify(serverSettings));
            }
          }
        }
      } catch (apiError) {
        // Silent fail for API - we have localStorage data
      }
    } catch (error) {
      console.warn('Failed to load settings, using defaults:', error);
      dispatch({ type: 'LOAD_SETTINGS', payload: defaultSettings });
    }
  };

  const exportSettings = (): string => {
    const exportData = {
      ...settings,
      // Remove sensitive data
      databases: settings.databases.map(db => ({
        ...db,
        password: '[ENCRYPTED]',
      })),
      integrations: settings.integrations.map(integration => ({
        ...integration,
        config: {
          ...integration.config,
          apiKey: integration.config.apiKey ? '[ENCRYPTED]' : undefined,
          accessToken: integration.config.accessToken ? '[ENCRYPTED]' : undefined,
          refreshToken: integration.config.refreshToken ? '[ENCRYPTED]' : undefined,
        },
      })),
      ai: {
        ...settings.ai,
        apiKey: settings.ai.apiKey ? '[ENCRYPTED]' : undefined,
      },
    };

    return JSON.stringify(exportData, null, 2);
  };

  const importSettings = async (data: string): Promise<void> => {
    try {
      const importedSettings = JSON.parse(data);
      
      // Validate structure
      if (!importedSettings.version) {
        throw new Error('Invalid settings file');
      }

      // Merge with current settings, preserving sensitive data
      const mergedSettings: GlobalSettings = {
        ...importedSettings,
        databases: importedSettings.databases?.map((db: any) => ({
          ...db,
          password: db.password === '[ENCRYPTED]' ? 
            settings.databases.find(existing => existing.id === db.id)?.password || '' : 
            db.password,
        })) || [],
        integrations: importedSettings.integrations?.map((integration: any) => ({
          ...integration,
          config: {
            ...integration.config,
            apiKey: integration.config.apiKey === '[ENCRYPTED]' ? 
              settings.integrations.find(existing => existing.id === integration.id)?.config.apiKey || undefined : 
              integration.config.apiKey,
            accessToken: integration.config.accessToken === '[ENCRYPTED]' ? 
              settings.integrations.find(existing => existing.id === integration.id)?.config.accessToken || undefined : 
              integration.config.accessToken,
            refreshToken: integration.config.refreshToken === '[ENCRYPTED]' ? 
              settings.integrations.find(existing => existing.id === integration.id)?.config.refreshToken || undefined : 
              integration.config.refreshToken,
          },
        })) || [],
        ai: {
          ...importedSettings.ai,
          apiKey: importedSettings.ai.apiKey === '[ENCRYPTED]' ? 
            settings.ai.apiKey : 
            importedSettings.ai.apiKey,
        },
      };

      dispatch({ type: 'IMPORT_SETTINGS', payload: mergedSettings });
      await saveSettings();
    } catch (error) {
      console.error('Failed to import settings:', error);
      throw new Error('Invalid settings file format');
    }
  };

  const resetSettings = async (): Promise<void> => {
    dispatch({ type: 'RESET_SETTINGS' });
    await saveSettings();
  };

  const testDatabaseConnection = async (id: string): Promise<boolean> => {
    const db = settings.databases.find(d => d.id === id);
    if (!db) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/database/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({
          type: db.type,
          host: db.host,
          port: db.port,
          database: db.database,
          username: db.username,
          password: db.password,
          ssl: db.ssl,
        }),
      });

      const result = await response.json();
      const success = result.success;

      dispatch({
        type: 'UPDATE_DATABASE',
        payload: {
          id,
          updates: {
            status: success ? 'connected' : 'error',
            lastConnection: new Date().toISOString(),
          },
        },
      });

      return success;
    } catch (error) {
      dispatch({
        type: 'UPDATE_DATABASE',
        payload: {
          id,
          updates: {
            status: 'error',
            lastConnection: new Date().toISOString(),
          },
        },
      });
      return false;
    }
  };

  const runBackup = async (id: string): Promise<void> => {
    const backup = settings.backups.find(b => b.id === id);
    if (!backup || !backup.enabled) return;

    try {
      const response = await fetch(`${API_BASE_URL}/backup/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ backupId: id }),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch({
          type: 'UPDATE_BACKUP',
          payload: {
            id,
            updates: {
              lastBackup: new Date().toISOString(),
              size: result.size,
            },
          },
        });
      }
    } catch (error) {
      console.error('Backup failed:', error);
      throw error;
    }
  };

  const connectIntegration = async (id: string): Promise<void> => {
    const integration = settings.integrations.find(i => i.id === id);
    if (!integration) return;

    try {
      const response = await fetch(`${API_BASE_URL}/integrations/${integration.type}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(integration.config),
      });

      if (response.ok) {
        const result = await response.json();
        dispatch({
          type: 'UPDATE_INTEGRATION',
          payload: {
            id,
            updates: {
              connected: true,
              status: 'active',
              lastSync: new Date().toISOString(),
              config: { ...integration.config, ...result.config },
            },
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'UPDATE_INTEGRATION',
        payload: {
          id,
          updates: {
            connected: false,
            status: 'error',
          },
        },
      });
      throw error;
    }
  };

  const disconnectIntegration = async (id: string): Promise<void> => {
    const integration = settings.integrations.find(i => i.id === id);
    if (!integration) return;

    try {
      await fetch(`${API_BASE_URL}/integrations/${integration.type}/disconnect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify({ integrationId: id }),
      });

      dispatch({
        type: 'UPDATE_INTEGRATION',
        payload: {
          id,
          updates: {
            connected: false,
            status: 'pending',
            lastSync: undefined,
          },
        },
      });
    } catch (error) {
      console.error('Failed to disconnect integration:', error);
      throw error;
    }
  };

  const validateSecurityPolicy = (password: string): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    const policy = settings.security.passwordPolicy;

    if (password.length < policy.minLength) {
      errors.push(`Password must be at least ${policy.minLength} characters long`);
    }

    if (policy.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (policy.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (policy.requireNumbers && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (policy.requireSymbols && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };

  const value: SettingsContextType = {
    settings,
    dispatch,
    saveSettings,
    loadSettings,
    exportSettings,
    importSettings,
    resetSettings,
    testDatabaseConnection,
    runBackup,
    connectIntegration,
    disconnectIntegration,
    validateSecurityPolicy,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export default SettingsContext;