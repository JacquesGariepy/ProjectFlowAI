import React, { useState, useEffect, useCallback } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Brain, 
  Plug, 
  Database, 
  Download, 
  Upload,
  Save,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  Mail,
  Globe,
  Moon,
  Sun,
  Monitor,
  Check,
  X,
  AlertTriangle,
  Info,
  Zap,
  Cloud,
  HardDrive,
  FileText,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  Lock,
  Unlock,
  Camera,
  MapPin,
  Phone,
  Calendar,
  Languages,
  Clock,
  Wifi,
  Server,
  Link,
  Code,
  Github,
  Slack,
  Chrome,
  Figma,
  TestTube,
  Activity,
  BarChart3,
  Settings2
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

// Services
import { ProfileService, UserProfile } from '../services/profileService';
import { SecurityService, PasswordStrength, TwoFactorSetup } from '../services/securityService';
import { AIService, AIModel, AIUsageStats } from '../services/aiService';
import { BackupService, BackupJob, BackupHistory } from '../services/backupService';
import { DatabaseService, DatabaseStats } from '../services/databaseService';
import { NotificationService } from '../services/settingsService';

type SettingsSection = 'profile' | 'security' | 'notifications' | 'appearance' | 'ai' | 'integrations' | 'database' | 'backup' | 'advanced';

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { t } = useLanguage();
  const { settings, dispatch: settingsDispatch, saveSettings } = useSettings();
  const { currentUser } = state;
  
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Profile states
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  
  // Security states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | null>(null);
  const [twoFactorSetup, setTwoFactorSetup] = useState<TwoFactorSetup | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  
  // AI states
  const [availableModels, setAvailableModels] = useState<AIModel[]>([]);
  const [aiUsageStats, setAiUsageStats] = useState<AIUsageStats | null>(null);
  const [testingModel, setTestingModel] = useState(false);
  const [testPrompt, setTestPrompt] = useState('Write a hello world function in Python');
  const [testResult, setTestResult] = useState<string>('');
  
  // Database states
  const [databaseStats, setDatabaseStats] = useState<Record<string, DatabaseStats>>({});
  const [testingConnections, setTestingConnections] = useState<Set<string>>(new Set());
  
  // Backup states
  const [activeBackups, setActiveBackups] = useState<BackupJob[]>([]);
  const [backupHistory, setBackupHistory] = useState<BackupHistory[]>([]);
  const [runningBackup, setRunningBackup] = useState<string | null>(null);

  const menuItems = [
    { id: 'profile', label: t.settings.personalInfo, icon: User },
    { id: 'security', label: t.settings.security, icon: Shield },
    { id: 'notifications', label: t.settings.notifications, icon: Bell },
    { id: 'appearance', label: t.settings.preferences, icon: Palette },
    { id: 'ai', label: t.settings.aiIntelligence, icon: Brain },
    { id: 'integrations', label: t.settings.integrations, icon: Plug },
    { id: 'database', label: t.settings.databaseLabel, icon: Database },
    { id: 'backup', label: t.settings.backupData, icon: Download },
    { id: 'advanced', label: t.settings.advanced, icon: Settings2 }
  ];

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      // Load profile data with fallback
      try {
        const profileData = await ProfileService.getProfile();
        if (profileData) setProfile(profileData);
      } catch (error) {
        console.warn('Profile service unavailable, using fallback data');
        setProfile({
          id: 'demo-user',
          name: currentUser?.name || 'Demo User',
          email: currentUser?.email || 'demo@example.com',
          avatar: '',
          jobTitle: 'Developer',
          department: 'Engineering',
          location: 'Remote',
          timezone: 'UTC',
          phone: '',
          bio: 'Demo user profile',
          isVerified: false,
          lastActivity: new Date().toISOString(),
          joinedAt: new Date().toISOString()
        });
      }

      // Load AI models with fallback
      try {
        const models = await AIService.getAvailableModels();
        setAvailableModels(models);
      } catch (error) {
        console.warn('AI service unavailable, using fallback models');
        setAvailableModels([
          {
            id: 'claude-3-opus',
            name: 'Claude 3 Opus',
            description: 'Most capable model for complex tasks',
            maxTokens: 200000,
            costPer1kTokens: 0.015,
            recommended: true
          },
          {
            id: 'claude-3-sonnet',
            name: 'Claude 3 Sonnet',
            description: 'Balanced performance and speed',
            maxTokens: 200000,
            costPer1kTokens: 0.003,
            recommended: false
          },
          {
            id: 'claude-3-haiku',
            name: 'Claude 3 Haiku',
            description: 'Fastest model for simple tasks',
            maxTokens: 200000,
            costPer1kTokens: 0.00025,
            recommended: false
          }
        ]);
      }

      // Load AI usage stats with fallback
      try {
        const usage = await AIService.getUsageStats();
        setAiUsageStats(usage);
      } catch (error) {
        console.warn('AI usage stats unavailable, using fallback data');
        setAiUsageStats({
          totalRequests: 1247,
          totalTokens: 892456,
          averageResponseTime: 1250,
          totalCost: 24.67,
          requestsThisMonth: 89,
          tokensThisMonth: 45632,
          costThisMonth: 3.21,
          topModels: ['claude-3-sonnet', 'claude-3-opus'],
          dailyUsage: [
            { date: '2024-01-01', requests: 23, tokens: 12450 },
            { date: '2024-01-02', requests: 18, tokens: 9876 }
          ]
        });
      }

      // Load backup data with fallback
      try {
        const jobs = await BackupService.getActiveJobs();
        setActiveBackups(jobs);
      } catch (error) {
        console.warn('Backup service unavailable, using fallback data');
        setActiveBackups([]);
      }

      try {
        const history = await BackupService.getBackupHistory();
        setBackupHistory(history);
      } catch (error) {
        console.warn('Backup history unavailable, using fallback data');
        setBackupHistory([
          {
            id: 'backup-1',
            configId: 'config-1',
            configName: 'Daily Backup',
            startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            size: '2.4 GB',
            type: 'full'
          },
          {
            id: 'backup-2',
            configId: 'config-2',
            configName: 'Incremental Backup',
            startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            endTime: new Date(Date.now() - 23.8 * 60 * 60 * 1000).toISOString(),
            status: 'completed',
            size: '450 MB',
            type: 'incremental'
          }
        ]);
      }

      // Load database stats for each connection with fallback
      const fallbackStats = {
        tables: 24,
        size: '1.2 GB',
        connections: 5,
        uptime: '15 days',
        lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        queries: {
          total: 15423,
          slow: 12,
          failed: 3
        }
      };

      for (const db of settings.databases) {
        try {
          const stats = await DatabaseService.getStats(db.id);
          if (stats) {
            setDatabaseStats(prev => ({ ...prev, [db.id]: stats }));
          }
        } catch (error) {
          console.warn(`Database stats unavailable for ${db.name}, using fallback data`);
          setDatabaseStats(prev => ({ ...prev, [db.id]: fallbackStats }));
        }
      }
    } catch (error) {
      console.error('Failed to load initial data:', error);
      // If everything fails, at least set basic fallback data
      if (!profile) {
        setProfile({
          id: 'fallback-user',
          name: 'Demo User',
          email: 'demo@example.com',
          avatar: '',
          jobTitle: 'User',
          department: 'General',
          location: 'Unknown',
          timezone: 'UTC',
          phone: '',
          bio: 'Fallback profile',
          isVerified: false,
          lastActivity: new Date().toISOString(),
          joinedAt: new Date().toISOString()
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Profile handlers
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async () => {
    if (!profile) return;

    setLoading(true);
    try {
      // Upload avatar if selected
      if (avatarFile) {
        const resized = await ProfileService.resizeImage(avatarFile);
        const uploadResult = await ProfileService.uploadAvatar(resized);
        if (uploadResult.success && uploadResult.url) {
          profile.avatar = uploadResult.url;
        }
      }

      // Update profile
      const result = await ProfileService.updateProfile(profile);
      if (result.success && result.profile) {
        setProfile(result.profile);
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now().toString(),
            title: t.common.success,
            message: 'Profile updated successfully',
            type: 'success',
            isRead: false,
            createdAt: new Date().toISOString()
          }
        });
      } else {
        setErrors({ profile: result.error || 'Update failed' });
      }
    } catch (error) {
      setErrors({ profile: 'Update failed' });
    } finally {
      setLoading(false);
      setAvatarFile(null);
      setAvatarPreview('');
    }
  };

  // Security handlers
  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setErrors({ password: 'Passwords do not match' });
      return;
    }

    if (!passwordStrength || passwordStrength.score < 70) {
      setErrors({ password: 'Password is too weak' });
      return;
    }

    setLoading(true);
    try {
      const result = await SecurityService.changePassword(currentPassword, newPassword);
      if (result.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordStrength(null);
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now().toString(),
            title: t.common.success,
            message: 'Password changed successfully',
            type: 'success',
            isRead: false,
            createdAt: new Date().toISOString()
          }
        });
      } else {
        setErrors({ password: result.error || 'Password change failed' });
      }
    } catch (error) {
      setErrors({ password: 'Password change failed' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordStrengthCheck = useCallback(async (password: string) => {
    if (password.length > 0) {
      const strength = await SecurityService.checkPasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(null);
    }
  }, []);

  const handleSetup2FA = async () => {
    setLoading(true);
    try {
      const result = await SecurityService.setup2FA();
      if (result.success && result.setup) {
        setTwoFactorSetup(result.setup);
      } else {
        setErrors({ security: result.error || '2FA setup failed' });
      }
    } catch (error) {
      setErrors({ security: '2FA setup failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify2FA = async () => {
    if (verificationCode.length !== 6) return;

    setLoading(true);
    try {
      const result = await SecurityService.verify2FA(verificationCode);
      if (result.success) {
        settingsDispatch({
          type: 'UPDATE_SECURITY_SETTINGS',
          payload: { twoFactorEnabled: true }
        });
        setTwoFactorSetup(null);
        setVerificationCode('');
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now().toString(),
            title: t.common.success,
            message: '2FA enabled successfully',
            type: 'success',
            isRead: false,
            createdAt: new Date().toISOString()
          }
        });
      } else {
        setErrors({ security: result.error || '2FA verification failed' });
      }
    } catch (error) {
      setErrors({ security: '2FA verification failed' });
    } finally {
      setLoading(false);
    }
  };

  // AI handlers
  const handleTestModel = async () => {
    if (!testPrompt.trim()) return;

    setTestingModel(true);
    try {
      const result = await AIService.testModel(
        settings.ai.modelVersion,
        testPrompt,
        settings.ai
      );
      
      if (result.success && result.response) {
        setTestResult(result.response.response);
      } else {
        setTestResult(`Error: ${result.error}`);
      }
    } catch (error) {
      setTestResult('Test failed');
    } finally {
      setTestingModel(false);
    }
  };

  const handleAISettingsChange = (key: string, value: any) => {
    settingsDispatch({
      type: 'UPDATE_AI_SETTINGS',
      payload: { [key]: value }
    });
  };

  // Database handlers
  const handleTestDatabaseConnection = async (connectionId: string) => {
    const connection = settings.databases.find(db => db.id === connectionId);
    if (!connection) return;

    setTestingConnections(prev => new Set(prev).add(connectionId));
    try {
      const result = await DatabaseService.testConnection(connection);
      
      settingsDispatch({
        type: 'UPDATE_DATABASE',
        payload: {
          id: connectionId,
          updates: {
            status: result.success ? 'connected' : 'error',
            lastConnection: new Date().toISOString()
          }
        }
      });

      // Load stats if connected
      if (result.success) {
        const stats = await DatabaseService.getStats(connectionId);
        if (stats) {
          setDatabaseStats(prev => ({ ...prev, [connectionId]: stats }));
        }
      }
    } catch (error) {
      console.error('Database test failed:', error);
    } finally {
      setTestingConnections(prev => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
    }
  };

  // Backup handlers
  const handleRunBackup = async (configId: string) => {
    setRunningBackup(configId);
    try {
      const result = await BackupService.runBackup(configId);
      
      if (result.success && result.jobId) {
        // Refresh active jobs
        const jobs = await BackupService.getActiveJobs();
        setActiveBackups(jobs);
        
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: {
            id: Date.now().toString(),
            title: t.common.success,
            message: 'Backup started successfully',
            type: 'info',
            isRead: false,
            createdAt: new Date().toISOString()
          }
        });
      } else {
        setErrors({ backup: result.error || 'Backup failed to start' });
      }
    } catch (error) {
      setErrors({ backup: 'Backup failed to start' });
    } finally {
      setRunningBackup(null);
    }
  };

  // Save settings
  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      await saveSettings();
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: t.common.success,
          message: 'Settings saved successfully',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    } catch (error) {
      setErrors({ save: 'Failed to save settings' });
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.personalInfo}</h3>
            
            {profile && (
              <div className="space-y-4">
                {/* Avatar Upload */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={avatarPreview || profile.avatar || ProfileService.generateAvatarPlaceholder(profile.name)}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                    />
                    <label className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{profile.name}</h4>
                    <p className="text-sm text-slate-600">{profile.jobTitle || 'Member'}</p>
                    {profile.isVerified && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.fullName}</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.email}</label>
                    <div className="flex space-x-2">
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {!profile.isVerified && (
                        <button
                          onClick={() => ProfileService.verifyEmail(profile.email)}
                          className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProfileSave}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Saving...' : t.common.save}
                </button>

                {errors.profile && (
                  <div className="text-red-600 text-sm">{errors.profile}</div>
                )}
              </div>
            )}
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.security}</h3>
            
            {/* Password Change */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.changePassword}</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.currentPassword}</label>
                  <div className="relative">
                    <input
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.newPassword}</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      handlePasswordStrengthCheck(e.target.value);
                    }}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {passwordStrength && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              passwordStrength.score < 30 ? 'bg-red-500' :
                              passwordStrength.score < 70 ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${passwordStrength.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{passwordStrength.score}%</span>
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <ul className="mt-1 text-xs text-slate-600">
                          {passwordStrength.feedback.map((feedback, index) => (
                            <li key={index}>• {feedback}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.confirmNewPassword}</label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handlePasswordChange}
                  disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Changing...' : t.settings.changePassword}
                </button>

                {errors.password && (
                  <div className="text-red-600 text-sm">{errors.password}</div>
                )}
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.twoFactorAuthentication}</h4>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-slate-600">
                    {settings.security.twoFactorEnabled ? t.settings.enabled : t.settings.disabled}
                  </p>
                </div>
                <div className={`flex items-center space-x-2 ${settings.security.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>
                  {settings.security.twoFactorEnabled ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  <span className="font-medium">
                    {settings.security.twoFactorEnabled ? t.settings.secure : t.settings.notSecure}
                  </span>
                </div>
              </div>

              {!settings.security.twoFactorEnabled && !twoFactorSetup && (
                <button
                  onClick={handleSetup2FA}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Setting up...' : t.settings.enable2FA}
                </button>
              )}

              {twoFactorSetup && (
                <div className="space-y-4">
                  <div className="text-center">
                    <img src={twoFactorSetup.qrCode} alt="QR Code" className="mx-auto mb-4 border rounded-lg" />
                    <p className="text-sm text-slate-600 mb-4">
                      {t.settings.scanQR}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.verificationCode}</label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono"
                    />
                  </div>

                  <button
                    onClick={handleVerify2FA}
                    disabled={loading || verificationCode.length !== 6}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'Verifying...' : t.settings.enable2FA}
                  </button>
                </div>
              )}

              {errors.security && (
                <div className="text-red-600 text-sm mt-2">{errors.security}</div>
              )}
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.aiConfiguration}</h3>
            
            {/* AI Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-900">{t.settings.enableAI}</h4>
                  <p className="text-sm text-slate-600">{t.settings.enableAIDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.ai.enabled}
                    onChange={(e) => handleAISettingsChange('enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Model Selection */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-4">{t.settings.modelVersion}</h4>
                
                <div className="space-y-3">
                  {availableModels.map((model) => (
                    <label key={model.id} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="radio"
                        name="aiModel"
                        value={model.id}
                        checked={settings.ai.modelVersion === model.id}
                        onChange={(e) => handleAISettingsChange('modelVersion', e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h5 className="font-medium text-slate-900">{model.name}</h5>
                          {model.recommended && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {t.settings.recommended}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600">{model.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500 mt-1">
                          <span>Max tokens: {model.maxTokens.toLocaleString()}</span>
                          <span>Cost: ${model.costPer1kTokens}/1k tokens</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Model Testing */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-4">Test Model</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Test Prompt</label>
                    <textarea
                      value={testPrompt}
                      onChange={(e) => setTestPrompt(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter a test prompt..."
                    />
                  </div>

                  <button
                    onClick={handleTestModel}
                    disabled={testingModel || !testPrompt.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                  >
                    <TestTube className="w-4 h-4" />
                    <span>{testingModel ? 'Testing...' : 'Test Model'}</span>
                  </button>

                  {testResult && (
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900 mb-2">Response:</h5>
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap">{testResult}</pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Usage Stats */}
              {aiUsageStats && (
                <div className="border border-slate-200 rounded-lg p-4">
                  <h4 className="font-medium text-slate-900 mb-4">Usage Statistics</h4>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{aiUsageStats.totalRequests.toLocaleString()}</p>
                      <p className="text-sm text-slate-600">Total Requests</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{AIService.formatTokens(aiUsageStats.totalTokens)}</p>
                      <p className="text-sm text-slate-600">Total Tokens</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{aiUsageStats.averageResponseTime}ms</p>
                      <p className="text-sm text-slate-600">Avg Response Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{AIService.formatCost(aiUsageStats.totalCost)}</p>
                      <p className="text-sm text-slate-600">Total Cost</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.notifications}</h3>
            
            {/* Email Notifications */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.emailNotifications}</h4>
              
              <div className="space-y-4">
                {[
                  { key: 'projectUpdates', label: t.settings.projectUpdates },
                  { key: 'taskAssignments', label: t.settings.taskAssignments },
                  { key: 'deadlineReminders', label: t.settings.deadlineReminders },
                  { key: 'weeklyReports', label: t.settings.weeklyReports },
                  { key: 'securityAlerts', label: t.settings.securityAlerts }
                ].map((notification) => (
                  <div key={notification.key} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-slate-900">{notification.label}</h5>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications[notification.key as keyof typeof settings.notifications] as boolean || false}
                        onChange={(e) => settingsDispatch({
                          type: 'UPDATE_NOTIFICATION_SETTINGS',
                          payload: { 
                            [notification.key]: e.target.checked
                          }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Push Notifications */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.pushNotifications}</h4>
              
              <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg mb-4">
                <div>
                  <h5 className="font-medium text-slate-900">{t.settings.enablePush}</h5>
                  <p className="text-sm text-slate-600">Allow browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.channels?.push?.enabled || false}
                    onChange={(e) => {
                      if (e.target.checked && 'Notification' in window) {
                        Notification.requestPermission().then(permission => {
                          settingsDispatch({
                            type: 'UPDATE_NOTIFICATION_SETTINGS',
                            payload: { 
                              channels: {
                                ...settings.notifications.channels,
                                push: { 
                                  ...settings.notifications.channels?.push,
                                  enabled: permission === 'granted'
                                }
                              }
                            }
                          });
                        });
                      } else {
                        settingsDispatch({
                          type: 'UPDATE_NOTIFICATION_SETTINGS',
                          payload: { 
                            channels: {
                              ...settings.notifications.channels,
                              push: { 
                                ...settings.notifications.channels?.push,
                                enabled: false
                              }
                            }
                          }
                        });
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.quietHours}</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">From:</span>
                      <input
                        type="time"
                        value={settings.notifications.quietHours?.start || '22:00'}
                        onChange={(e) => settingsDispatch({
                          type: 'UPDATE_NOTIFICATION_SETTINGS',
                          payload: { 
                            quietHours: {
                              ...settings.notifications.quietHours,
                              start: e.target.value
                            }
                          }
                        })}
                        className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-600">To:</span>
                      <input
                        type="time"
                        value={settings.notifications.quietHours?.end || '08:00'}
                        onChange={(e) => settingsDispatch({
                          type: 'UPDATE_NOTIFICATION_SETTINGS',
                          payload: { 
                            quietHours: {
                              ...settings.notifications.quietHours,
                              end: e.target.value
                            }
                          }
                        })}
                        className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Frequency */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.frequency}</h4>
              
              <div className="space-y-3">
                {[
                  { value: 'instant', label: t.settings.instant },
                  { value: 'hourly', label: t.settings.hourly },
                  { value: 'daily', label: t.settings.daily },
                  { value: 'weekly', label: t.settings.weekly }
                ].map((frequency) => (
                  <label key={frequency.value} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input
                      type="radio"
                      name="frequency"
                      value={frequency.value}
                      checked={settings.notifications.frequency === frequency.value}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_NOTIFICATION_SETTINGS',
                        payload: { frequency: e.target.value as any }
                      })}
                      className="text-blue-600"
                    />
                    <span className="font-medium text-slate-900">{frequency.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.preferences}</h3>
            
            {/* Theme Selection */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.theme}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'light', label: t.settings.lightTheme, icon: Sun },
                  { value: 'dark', label: t.settings.darkTheme, icon: Moon },
                  { value: 'system', label: t.settings.systemTheme, icon: Monitor }
                ].map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <label key={theme.value} className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                      settings.appearance.theme === theme.value 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      <input
                        type="radio"
                        name="theme"
                        value={theme.value}
                        checked={settings.appearance.theme === theme.value}
                        onChange={(e) => settingsDispatch({
                          type: 'UPDATE_APPEARANCE_SETTINGS',
                          payload: { theme: e.target.value as any }
                        })}
                        className="sr-only"
                      />
                      <Icon className="w-8 h-8 mb-2" />
                      <span className="font-medium">{theme.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Color Scheme */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.colorScheme}</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'blue', label: 'Blue', color: 'bg-blue-500' },
                  { value: 'purple', label: 'Purple', color: 'bg-purple-500' },
                  { value: 'green', label: 'Green', color: 'bg-green-500' },
                  { value: 'orange', label: 'Orange', color: 'bg-orange-500' },
                  { value: 'red', label: 'Red', color: 'bg-red-500' },
                  { value: 'indigo', label: 'Indigo', color: 'bg-indigo-500' },
                  { value: 'pink', label: 'Pink', color: 'bg-pink-500' },
                  { value: 'gray', label: 'Gray', color: 'bg-gray-500' }
                ].map((color) => (
                  <label key={color.value} className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    settings.appearance.primaryColor === color.value 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}>
                    <input
                      type="radio"
                      name="primaryColor"
                      value={color.value}
                      checked={settings.appearance.primaryColor === color.value}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_APPEARANCE_SETTINGS',
                        payload: { primaryColor: e.target.value }
                      })}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                    <span className="text-sm font-medium">{color.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Interface Options */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.interface}</h4>
              
              <div className="space-y-4">
                {[
                  { key: 'compactMode', label: t.settings.compactMode, desc: 'Reduce spacing for more content' },
                  { key: 'showAnimations', label: t.settings.animations, desc: 'Enable smooth transitions and effects' },
                  { key: 'showTooltips', label: t.settings.tooltips, desc: 'Show helpful tips on hover' },
                  { key: 'highContrast', label: t.settings.highContrast, desc: 'Increase contrast for better readability' }
                ].map((option) => (
                  <div key={option.key} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-slate-900">{option.label}</h5>
                      <p className="text-sm text-slate-600">{option.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.appearance[option.key as keyof typeof settings.appearance] as boolean}
                        onChange={(e) => settingsDispatch({
                          type: 'UPDATE_APPEARANCE_SETTINGS',
                          payload: { [option.key]: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Font Size */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.fontSize}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Small</span>
                  <span className="text-sm text-slate-600">Large</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="20"
                  value={settings.appearance.fontSize}
                  onChange={(e) => settingsDispatch({
                    type: 'UPDATE_APPEARANCE_SETTINGS',
                    payload: { fontSize: parseInt(e.target.value) }
                  })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center">
                  <span className="text-sm text-slate-600">Current: {settings.appearance.fontSize}px</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.integrations}</h3>
            
            {/* Development Tools */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.developmentTools}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    key: 'github', 
                    name: 'GitHub', 
                    icon: Github, 
                    connected: settings.integrations.github.enabled,
                    description: 'Sync with GitHub repositories'
                  },
                  { 
                    key: 'slack', 
                    name: 'Slack', 
                    icon: Slack, 
                    connected: settings.integrations.slack.enabled,
                    description: 'Team communication integration'
                  },
                  { 
                    key: 'figma', 
                    name: 'Figma', 
                    icon: Figma, 
                    connected: settings.integrations.figma.enabled,
                    description: 'Design collaboration tools'
                  },
                  { 
                    key: 'chrome', 
                    name: 'Chrome Extension', 
                    icon: Chrome, 
                    connected: settings.integrations.chromeExtension.enabled,
                    description: 'Browser extension features'
                  }
                ].map((integration) => {
                  const Icon = integration.icon;
                  return (
                    <div key={integration.key} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6 text-slate-600" />
                          <div>
                            <h5 className="font-medium text-slate-900">{integration.name}</h5>
                            <p className="text-sm text-slate-600">{integration.description}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          integration.connected 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {integration.connected ? 'Connected' : 'Not Connected'}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          if (integration.connected) {
                            settingsDispatch({
                              type: 'UPDATE_INTEGRATION_SETTINGS',
                              payload: { 
                                [integration.key]: { 
                                  enabled: false,
                                  apiKey: '',
                                  webhookUrl: ''
                                }
                              }
                            });
                          } else {
                            // In production, this would open OAuth flow
                            settingsDispatch({
                              type: 'UPDATE_INTEGRATION_SETTINGS',
                              payload: { 
                                [integration.key]: { 
                                  enabled: true,
                                  apiKey: 'demo_key_' + Date.now(),
                                  webhookUrl: `https://api.${integration.key}.com/webhook`
                                }
                              }
                            });
                          }
                        }}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          integration.connected
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </button>

                      {integration.connected && (
                        <div className="mt-3 space-y-2">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">API Key</label>
                            <input
                              type="password"
                              value={settings.integrations[integration.key as keyof typeof settings.integrations].apiKey}
                              onChange={(e) => settingsDispatch({
                                type: 'UPDATE_INTEGRATION_SETTINGS',
                                payload: { 
                                  [integration.key]: { 
                                    ...settings.integrations[integration.key as keyof typeof settings.integrations],
                                    apiKey: e.target.value
                                  }
                                }
                              })}
                              className="w-full px-3 py-1 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter API key..."
                            />
                          </div>
                          {integration.key !== 'chromeExtension' && (
                            <div>
                              <label className="block text-xs font-medium text-slate-700 mb-1">Webhook URL</label>
                              <input
                                type="url"
                                value={settings.integrations[integration.key as keyof typeof settings.integrations].webhookUrl}
                                onChange={(e) => settingsDispatch({
                                  type: 'UPDATE_INTEGRATION_SETTINGS',
                                  payload: { 
                                    [integration.key]: { 
                                      ...settings.integrations[integration.key as keyof typeof settings.integrations],
                                      webhookUrl: e.target.value
                                    }
                                  }
                                })}
                                className="w-full px-3 py-1 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://..."
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Webhooks */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-slate-900">{t.settings.webhooks}</h4>
                <button
                  onClick={() => {
                    const newWebhook = {
                      id: Date.now().toString(),
                      name: 'New Webhook',
                      url: '',
                      events: ['project.created'],
                      enabled: true
                    };
                    settingsDispatch({
                      type: 'UPDATE_INTEGRATION_SETTINGS',
                      payload: { 
                        webhooks: [...settings.integrations.webhooks, newWebhook]
                      }
                    });
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Webhook</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {settings.integrations.webhooks.map((webhook, index) => (
                  <div key={webhook.id} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <input
                        type="text"
                        value={webhook.name}
                        onChange={(e) => {
                          const updatedWebhooks = [...settings.integrations.webhooks];
                          updatedWebhooks[index] = { ...webhook, name: e.target.value };
                          settingsDispatch({
                            type: 'UPDATE_INTEGRATION_SETTINGS',
                            payload: { webhooks: updatedWebhooks }
                          });
                        }}
                        className="font-medium text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0"
                      />
                      <button
                        onClick={() => {
                          const updatedWebhooks = settings.integrations.webhooks.filter((_, i) => i !== index);
                          settingsDispatch({
                            type: 'UPDATE_INTEGRATION_SETTINGS',
                            payload: { webhooks: updatedWebhooks }
                          });
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">URL</label>
                        <input
                          type="url"
                          value={webhook.url}
                          onChange={(e) => {
                            const updatedWebhooks = [...settings.integrations.webhooks];
                            updatedWebhooks[index] = { ...webhook, url: e.target.value };
                            settingsDispatch({
                              type: 'UPDATE_INTEGRATION_SETTINGS',
                              payload: { webhooks: updatedWebhooks }
                            });
                          }}
                          className="w-full px-3 py-1 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://your-webhook-url.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Events</label>
                        <div className="flex flex-wrap gap-2">
                          {['project.created', 'project.updated', 'task.completed', 'user.invited'].map((event) => (
                            <label key={event} className="flex items-center space-x-1">
                              <input
                                type="checkbox"
                                checked={webhook.events.includes(event)}
                                onChange={(e) => {
                                  const updatedWebhooks = [...settings.integrations.webhooks];
                                  const updatedEvents = e.target.checked
                                    ? [...webhook.events, event]
                                    : webhook.events.filter(e => e !== event);
                                  updatedWebhooks[index] = { ...webhook, events: updatedEvents };
                                  settingsDispatch({
                                    type: 'UPDATE_INTEGRATION_SETTINGS',
                                    payload: { webhooks: updatedWebhooks }
                                  });
                                }}
                                className="text-blue-600"
                              />
                              <span className="text-xs text-slate-600">{event}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {settings.integrations.webhooks.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Link className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No webhooks configured</p>
                    <p className="text-sm">Add a webhook to get notified of events</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.databaseLabel}</h3>
            
            {/* Database Connections */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-slate-900">{t.settings.connections}</h4>
                <button
                  onClick={() => {
                    const newConnection = {
                      id: Date.now().toString(),
                      name: 'New Database',
                      type: 'postgresql' as const,
                      host: 'localhost',
                      port: 5432,
                      database: '',
                      username: '',
                      password: '',
                      ssl: false,
                      status: 'disconnected' as const,
                      lastConnection: null
                    };
                    settingsDispatch({
                      type: 'ADD_DATABASE',
                      payload: newConnection
                    });
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Database</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {settings.databases.map((db, index) => (
                  <div key={db.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-slate-600" />
                        <input
                          type="text"
                          value={db.name}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { name: e.target.value } }
                          })}
                          className="font-medium text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-2 px-2 py-1 rounded text-xs font-medium ${
                          db.status === 'connected' ? 'bg-green-100 text-green-700' :
                          db.status === 'error' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            db.status === 'connected' ? 'bg-green-500' :
                            db.status === 'error' ? 'bg-red-500' :
                            'bg-slate-400'
                          }`} />
                          <span>{db.status}</span>
                        </div>
                        
                        <button
                          onClick={() => handleTestDatabaseConnection(db.id)}
                          disabled={testingConnections.has(db.id)}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                        >
                          {testingConnections.has(db.id) ? 'Testing...' : 'Test'}
                        </button>
                        
                        <button
                          onClick={() => settingsDispatch({
                            type: 'REMOVE_DATABASE',
                            payload: db.id
                          })}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
                        <select
                          value={db.type}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { type: e.target.value as any } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="postgresql">PostgreSQL</option>
                          <option value="mysql">MySQL</option>
                          <option value="mongodb">MongoDB</option>
                          <option value="redis">Redis</option>
                          <option value="sqlite">SQLite</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Host</label>
                        <input
                          type="text"
                          value={db.host}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { host: e.target.value } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          placeholder="localhost"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Port</label>
                        <input
                          type="number"
                          value={db.port}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { port: parseInt(e.target.value) || 0 } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Database</label>
                        <input
                          type="text"
                          value={db.database}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { database: e.target.value } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          placeholder="database_name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Username</label>
                        <input
                          type="text"
                          value={db.username}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { username: e.target.value } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
                        <input
                          type="password"
                          value={db.password}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { password: e.target.value } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={db.ssl}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_DATABASE',
                            payload: { id: db.id, updates: { ssl: e.target.checked } }
                          })}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-slate-700">Use SSL</span>
                      </label>
                      
                      {db.lastConnection && (
                        <span className="text-xs text-slate-500">
                          Last connected: {new Date(db.lastConnection).toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    {/* Database Stats */}
                    {databaseStats[db.id] && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                        <h5 className="font-medium text-slate-900 mb-2">Statistics</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">Tables</p>
                            <p className="font-medium">{databaseStats[db.id].tables}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Size</p>
                            <p className="font-medium">{databaseStats[db.id].size}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Connections</p>
                            <p className="font-medium">{databaseStats[db.id].connections}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Uptime</p>
                            <p className="font-medium">{databaseStats[db.id].uptime}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {settings.databases.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Database className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No database connections</p>
                    <p className="text-sm">Add a database connection to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.backupData}</h3>
            
            {/* Backup Configurations */}
            <div className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-slate-900">{t.settings.backupConfigurations}</h4>
                <button
                  onClick={() => {
                    const newBackup = {
                      id: Date.now().toString(),
                      name: 'New Backup',
                      type: 'full' as const,
                      schedule: 'daily' as const,
                      destinations: ['local'],
                      retention: 30,
                      enabled: true,
                      lastRun: null,
                      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
                    };
                    settingsDispatch({
                      type: 'ADD_BACKUP',
                      payload: newBackup
                    });
                  }}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Backup</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {settings.backup.configurations.map((backup, index) => (
                  <div key={backup.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Download className="w-5 h-5 text-slate-600" />
                        <input
                          type="text"
                          value={backup.name}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_BACKUP',
                            payload: { id: backup.id, updates: { name: e.target.value } }
                          })}
                          className="font-medium text-slate-900 bg-transparent border-none focus:outline-none focus:ring-0"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={backup.enabled}
                            onChange={(e) => settingsDispatch({
                              type: 'UPDATE_BACKUP',
                              payload: { id: backup.id, updates: { enabled: e.target.checked } }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                        
                        <button
                          onClick={() => handleRunBackup(backup.id)}
                          disabled={runningBackup === backup.id}
                          className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                        >
                          {runningBackup === backup.id ? 'Running...' : 'Run Now'}
                        </button>
                        
                        <button
                          onClick={() => settingsDispatch({
                            type: 'REMOVE_BACKUP',
                            payload: backup.id
                          })}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
                        <select
                          value={backup.type}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_BACKUP',
                            payload: { id: backup.id, updates: { type: e.target.value as any } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="full">Full Backup</option>
                          <option value="incremental">Incremental</option>
                          <option value="differential">Differential</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Schedule</label>
                        <select
                          value={backup.schedule}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_BACKUP',
                            payload: { id: backup.id, updates: { schedule: e.target.value as any } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="hourly">Hourly</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">Retention (days)</label>
                        <input
                          type="number"
                          value={backup.retention}
                          onChange={(e) => settingsDispatch({
                            type: 'UPDATE_BACKUP',
                            payload: { id: backup.id, updates: { retention: parseInt(e.target.value) || 0 } }
                          })}
                          className="w-full px-3 py-2 border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                          min="1"
                          max="365"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-slate-700 mb-2">Destinations</label>
                      <div className="flex flex-wrap gap-2">
                        {['local', 'cloud', 's3', 'ftp'].map((dest) => (
                          <label key={dest} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={backup.destinations.includes(dest)}
                              onChange={(e) => {
                                const updatedDestinations = e.target.checked
                                  ? [...backup.destinations, dest]
                                  : backup.destinations.filter(d => d !== dest);
                                settingsDispatch({
                                  type: 'UPDATE_BACKUP',
                                  payload: { id: backup.id, updates: { destinations: updatedDestinations } }
                                });
                              }}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-slate-700 capitalize">{dest}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <div>
                        {backup.lastRun && (
                          <span>Last run: {new Date(backup.lastRun).toLocaleString()}</span>
                        )}
                      </div>
                      <div>
                        {backup.nextRun && (
                          <span>Next run: {new Date(backup.nextRun).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {settings.backup.configurations.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <Download className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>No backup configurations</p>
                    <p className="text-sm">Add a backup configuration to protect your data</p>
                  </div>
                )}
              </div>
            </div>

            {/* Active Backups */}
            {activeBackups.length > 0 && (
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-4">Active Backups</h4>
                
                <div className="space-y-3">
                  {activeBackups.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                        </div>
                        <div>
                          <h5 className="font-medium text-slate-900">{job.name}</h5>
                          <p className="text-sm text-slate-600">{job.type} backup • {job.progress}% complete</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{job.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Backup History */}
            {backupHistory.length > 0 && (
              <div className="border border-slate-200 rounded-lg p-4">
                <h4 className="font-medium text-slate-900 mb-4">Recent Backups</h4>
                
                <div className="space-y-2">
                  {backupHistory.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          entry.status === 'completed' ? 'bg-green-500' :
                          entry.status === 'failed' ? 'bg-red-500' :
                          'bg-orange-500'
                        }`} />
                        <div>
                          <h5 className="font-medium text-slate-900">{entry.configName}</h5>
                          <p className="text-sm text-slate-600">
                            {new Date(entry.startTime).toLocaleString()}
                            {entry.endTime && ` • ${Math.round((new Date(entry.endTime).getTime() - new Date(entry.startTime).getTime()) / 1000)}s`}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          entry.status === 'completed' ? 'bg-green-100 text-green-700' :
                          entry.status === 'failed' ? 'bg-red-100 text-red-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {entry.status}
                        </span>
                        
                        {entry.size && (
                          <span className="text-sm text-slate-600">{entry.size}</span>
                        )}
                        
                        {entry.status === 'completed' && (
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.settings.advanced}</h3>
            
            {/* System Settings */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.systemSettings}</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-slate-900">{t.settings.debugMode}</h5>
                    <p className="text-sm text-slate-600">Enable detailed logging and debugging</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.advanced.debugMode}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_ADVANCED_SETTINGS',
                        payload: { debugMode: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-slate-900">{t.settings.experimentalFeatures}</h5>
                    <p className="text-sm text-slate-600">Enable beta features and experimental functionality</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.advanced.experimentalFeatures}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_ADVANCED_SETTINGS',
                        payload: { experimentalFeatures: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                  <div>
                    <h5 className="font-medium text-slate-900">{t.settings.analyticsTracking}</h5>
                    <p className="text-sm text-slate-600">Help improve the app by sharing anonymous usage data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.advanced.analyticsEnabled}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_ADVANCED_SETTINGS',
                        payload: { analyticsEnabled: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Performance Settings */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">{t.settings.performance}</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cache Size (MB)</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="50"
                      max="1000"
                      value={settings.advanced.cacheSize}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_ADVANCED_SETTINGS',
                        payload: { cacheSize: parseInt(e.target.value) }
                      })}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-slate-600 w-16">{settings.advanced.cacheSize} MB</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Max Concurrent Tasks</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={settings.advanced.maxConcurrentTasks}
                      onChange={(e) => settingsDispatch({
                        type: 'UPDATE_ADVANCED_SETTINGS',
                        payload: { maxConcurrentTasks: parseInt(e.target.value) }
                      })}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <span className="text-sm text-slate-600 w-12">{settings.advanced.maxConcurrentTasks}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">API Timeout (seconds)</label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={settings.advanced.apiTimeout}
                    onChange={(e) => settingsDispatch({
                      type: 'UPDATE_ADVANCED_SETTINGS',
                      payload: { apiTimeout: parseInt(e.target.value) || 30 }
                    })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">Data Management</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <h5 className="font-medium text-yellow-800">Clear Cache</h5>
                      <p className="text-sm text-yellow-700">Remove all cached data to free up space</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('projectflow_cache');
                      dispatch({
                        type: 'ADD_NOTIFICATION',
                        payload: {
                          id: Date.now().toString(),
                          title: 'Cache Cleared',
                          message: 'All cached data has been removed',
                          type: 'info',
                          isRead: false,
                          createdAt: new Date().toISOString()
                        }
                      });
                    }}
                    className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Clear Cache
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <h5 className="font-medium text-red-800">Reset Settings</h5>
                      <p className="text-sm text-red-700">Reset all settings to default values</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all settings? This action cannot be undone.')) {
                        settingsDispatch({ type: 'RESET_SETTINGS', payload: undefined });
                        dispatch({
                          type: 'ADD_NOTIFICATION',
                          payload: {
                            id: Date.now().toString(),
                            title: 'Settings Reset',
                            message: 'All settings have been reset to defaults',
                            type: 'info',
                            isRead: false,
                            createdAt: new Date().toISOString()
                          }
                        });
                      }
                    }}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reset Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Export/Import */}
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-4">Export/Import Settings</h4>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    const settingsData = JSON.stringify(settings, null, 2);
                    const blob = new Blob([settingsData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `projectflow-settings-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Settings</span>
                </button>
                
                <label className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Import Settings</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const importedSettings = JSON.parse(event.target?.result as string);
                            settingsDispatch({ type: 'IMPORT_SETTINGS', payload: importedSettings });
                            dispatch({
                              type: 'ADD_NOTIFICATION',
                              payload: {
                                id: Date.now().toString(),
                                title: 'Settings Imported',
                                message: 'Settings have been imported successfully',
                                type: 'success',
                                isRead: false,
                                createdAt: new Date().toISOString()
                              }
                            });
                          } catch (error) {
                            dispatch({
                              type: 'ADD_NOTIFICATION',
                              payload: {
                                id: Date.now().toString(),
                                title: 'Import Failed',
                                message: 'Failed to import settings file',
                                type: 'error',
                                isRead: false,
                                createdAt: new Date().toISOString()
                              }
                            });
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      default:
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
            <SettingsIcon className="w-8 h-8 text-blue-600" />
            <span>{t.settings.title}</span>
          </h1>
          <p className="text-slate-600 mt-1">{t.settings.subtitle}</p>
        </div>
        
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          <span>{loading ? 'Saving...' : t.common.save}</span>
        </button>
      </div>

      {/* Error Display */}
      {Object.keys(errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="font-medium">Errors:</h4>
          </div>
          <ul className="mt-2 text-sm text-red-600">
            {Object.entries(errors).map(([key, error]) => (
              <li key={key}>• {error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SettingsSection)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            {loading && activeSection !== 'profile' && activeSection !== 'security' && activeSection !== 'ai' ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;