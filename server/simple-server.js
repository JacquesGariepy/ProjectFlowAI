const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock data
const mockUser = {
  id: 'user-1',
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  avatar: '',
  jobTitle: 'Chef de Projet',
  department: 'Développement',
  location: 'Paris, France',
  timezone: 'Europe/Paris',
  phone: '+33 1 23 45 67 89',
  bio: 'Chef de projet expérimenté en développement web',
  isVerified: true,
  lastActivity: new Date().toISOString(),
  joinedAt: '2023-01-15T09:00:00.000Z'
};

const mockSettings = {
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
    modelVersion: 'claude-3-sonnet',
    responseSpeed: 'balanced',
    maxTokens: 4000,
    temperature: 0.7,
    customInstructions: '',
  },
  databases: [],
  backup: { configurations: [] },
  integrations: {
    github: { enabled: false, apiKey: '', webhookUrl: '' },
    slack: { enabled: false, apiKey: '', webhookUrl: '' },
    figma: { enabled: false, apiKey: '', webhookUrl: '' },
    chromeExtension: { enabled: false, apiKey: '', webhookUrl: '' },
    webhooks: []
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 720,
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
      email: { address: 'jean.dupont@example.com', verified: true, frequency: 'instant' },
      push: { enabled: true, deviceTokens: [] },
      sms: { number: '', verified: false, emergencyOnly: true },
    },
    quietHours: { enabled: false, start: '22:00', end: '08:00', timezone: 'Europe/Paris' },
    frequency: 'instant',
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

// API Routes

// Profile
app.get('/api/profile', (req, res) => {
  res.json(mockUser);
});

app.put('/api/profile', (req, res) => {
  res.json({ success: true, profile: { ...mockUser, ...req.body } });
});

// Settings
app.get('/api/settings', (req, res) => {
  res.json(mockSettings);
});

app.put('/api/settings', (req, res) => {
  res.json({ success: true });
});

// AI Models
app.get('/api/ai/models', (req, res) => {
  res.json([
    {
      id: 'claude-3-sonnet',
      name: 'Claude 3 Sonnet',
      description: 'Balanced performance and cost',
      maxTokens: 200000,
      costPer1kTokens: 0.003,
      recommended: true
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      description: 'Most capable model',
      maxTokens: 200000,
      costPer1kTokens: 0.015,
      recommended: false
    },
    {
      id: 'gpt-4',
      name: 'GPT-4',
      description: 'OpenAI most capable model',
      maxTokens: 8000,
      costPer1kTokens: 0.03,
      recommended: false
    }
  ]);
});

// AI Usage Stats
app.get('/api/ai/usage-stats', (req, res) => {
  res.json({
    totalRequests: 1247,
    totalTokens: 89563,
    averageResponseTime: 1850,
    totalCost: 4.27,
    requestsByModel: {
      'claude-3-sonnet': 892,
      'claude-3-opus': 234,
      'gpt-4': 121
    },
    tokensByModel: {
      'claude-3-sonnet': 67892,
      'claude-3-opus': 15234,
      'gpt-4': 6437
    }
  });
});

// Backup Jobs
app.get('/api/backup/jobs/active', (req, res) => {
  res.json([]);
});

app.get('/api/backup/history', (req, res) => {
  res.json([
    {
      id: 'backup-1',
      configId: 'config-1',
      configName: 'Daily Backup',
      status: 'completed',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      size: '2.3 GB',
      type: 'full'
    },
    {
      id: 'backup-2',
      configId: 'config-2',
      configName: 'Weekly Backup',
      status: 'completed',
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      endTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
      size: '8.1 GB',
      type: 'full'
    }
  ]);
});

// Database Stats
app.get('/api/database/:id/stats', (req, res) => {
  res.json({
    tables: 24,
    size: '1.2 GB',
    connections: 3,
    uptime: '7 days'
  });
});

// Security
app.post('/api/security/password-strength', (req, res) => {
  const password = req.body.password;
  const score = Math.min(100, password.length * 10);
  res.json({
    score,
    feedback: score < 50 ? ['Password is too short', 'Add numbers and symbols'] : ['Good password strength']
  });
});

app.post('/api/security/2fa/setup', (req, res) => {
  res.json({
    success: true,
    setup: {
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      secret: 'JBSWY3DPEHPK3PXP'
    }
  });
});

app.post('/api/security/2fa/verify', (req, res) => {
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server started on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});