import React, { useState, useEffect } from 'react';
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
  Figma
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { UserSettings } from '../types';

type SettingsSection = 'profile' | 'security' | 'notifications' | 'appearance' | 'ai' | 'integrations' | 'database' | 'backup' | 'blog';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  connected: boolean;
  lastSync?: string;
  status: 'active' | 'error' | 'pending';
}

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'redis';
  host: string;
  port: number;
  database: string;
  status: 'connected' | 'disconnected' | 'error';
  lastConnection?: string;
}

interface BackupConfig {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  destination: 'local' | 'cloud' | 's3';
  enabled: boolean;
  lastBackup?: string;
  size?: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  readTime: number;
}

const Settings: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { t } = useLanguage();
  const { currentUser } = state;
  
  const [activeSection, setActiveSection] = useState<SettingsSection>('profile');
  const [settings, setSettings] = useState<UserSettings>(currentUser?.settings || {
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
  });

  // Security states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  // Profile states
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    location: currentUser?.location || '',
    bio: '',
    website: '',
    linkedin: '',
    github: ''
  });

  // AI settings
  const [aiSettings, setAiSettings] = useState({
    enabled: true,
    autoOptimization: true,
    predictiveAnalytics: true,
    smartNotifications: true,
    voiceCommands: false,
    dataSharing: true,
    modelVersion: 'gpt-4',
    responseSpeed: 'balanced'
  });

  // Integrations
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Slack',
      description: 'Synchroniser les notifications et messages',
      icon: Slack,
      connected: true,
      lastSync: '2024-01-20T10:30:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'GitHub',
      description: 'Intégration avec les repositories',
      icon: Github,
      connected: false,
      status: 'pending'
    },
    {
      id: '3',
      name: 'Figma',
      description: 'Synchroniser les designs et prototypes',
      icon: Figma,
      connected: true,
      lastSync: '2024-01-19T15:45:00Z',
      status: 'error'
    },
    {
      id: '4',
      name: 'Google Drive',
      description: 'Stockage et partage de fichiers',
      icon: Cloud,
      connected: true,
      lastSync: '2024-01-20T09:15:00Z',
      status: 'active'
    }
  ]);

  // Database connections
  const [databases, setDatabases] = useState<DatabaseConnection[]>([
    {
      id: '1',
      name: 'Production DB',
      type: 'postgresql',
      host: 'prod-db.company.com',
      port: 5432,
      database: 'projectflow_prod',
      status: 'connected',
      lastConnection: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      name: 'Analytics DB',
      type: 'mongodb',
      host: 'analytics.company.com',
      port: 27017,
      database: 'analytics',
      status: 'connected',
      lastConnection: '2024-01-20T09:45:00Z'
    },
    {
      id: '3',
      name: 'Cache Redis',
      type: 'redis',
      host: 'cache.company.com',
      port: 6379,
      database: '0',
      status: 'error',
      lastConnection: '2024-01-19T18:30:00Z'
    }
  ]);

  // Backup configurations
  const [backups, setBackups] = useState<BackupConfig[]>([
    {
      id: '1',
      name: 'Base de données complète',
      frequency: 'daily',
      destination: 'cloud',
      enabled: true,
      lastBackup: '2024-01-20T02:00:00Z',
      size: '2.3 GB'
    },
    {
      id: '2',
      name: 'Fichiers utilisateurs',
      frequency: 'weekly',
      destination: 's3',
      enabled: true,
      lastBackup: '2024-01-18T03:00:00Z',
      size: '856 MB'
    },
    {
      id: '3',
      name: 'Configuration système',
      frequency: 'monthly',
      destination: 'local',
      enabled: false,
      lastBackup: '2024-01-01T01:00:00Z',
      size: '45 MB'
    }
  ]);

  // Blog posts
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'Guide d\'utilisation de l\'IA dans ProjectFlow',
      content: '# Guide d\'utilisation de l\'IA\n\nCe guide vous explique comment utiliser efficacement les fonctionnalités d\'intelligence artificielle...',
      excerpt: 'Découvrez comment tirer parti de l\'IA pour optimiser vos projets',
      status: 'published',
      author: currentUser?.id || '',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      tags: ['IA', 'Guide', 'Productivité'],
      readTime: 5
    },
    {
      id: '2',
      title: 'Nouvelles fonctionnalités - Janvier 2024',
      content: '# Nouvelles fonctionnalités\n\n## Dashboard IA intelligent\n\nNous avons ajouté un nouveau dashboard...',
      excerpt: 'Découvrez les dernières améliorations apportées à la plateforme',
      status: 'draft',
      author: currentUser?.id || '',
      createdAt: '2024-01-20T14:30:00Z',
      updatedAt: '2024-01-20T16:45:00Z',
      tags: ['Nouveautés', 'Fonctionnalités'],
      readTime: 3
    }
  ]);

  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  useEffect(() => {
    // Simulate 2FA status check
    setTwoFactorEnabled(Math.random() > 0.5);
    
    // Generate QR code for 2FA setup
    setQrCode('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5RUiBDb2RlPC90ZXh0Pgo8L3N2Zz4K');
  }, []);

  const menuItems = [
    { id: 'profile', label: t.settings.personalInfo, icon: User },
    { id: 'security', label: t.settings.security, icon: Shield },
    { id: 'notifications', label: t.settings.notifications, icon: Bell },
    { id: 'appearance', label: t.settings.preferences, icon: Palette },
    { id: 'ai', label: 'Intelligence Artificielle', icon: Brain },
    { id: 'integrations', label: t.settings.integrations, icon: Plug },
    { id: 'database', label: 'Base de données', icon: Database },
    { id: 'backup', label: t.settings.backupData, icon: Download },
    { id: 'blog', label: t.nav.blog, icon: FileText }
  ];

  const saveSettings = () => {
    const updatedUser = {
      ...currentUser,
      ...profileData,
      settings
    };
    
    dispatch({ type: 'UPDATE_USER_PROFILE', payload: updatedUser });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Paramètres sauvegardés',
        message: 'Vos paramètres ont été mis à jour avec succès',
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Erreur',
          message: 'Les mots de passe ne correspondent pas',
          type: 'error',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
      return;
    }

    // Simulate password change
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Mot de passe modifié',
        message: 'Votre mot de passe a été changé avec succès',
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const toggle2FA = () => {
    if (!twoFactorEnabled && verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setVerificationCode('');
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: '2FA activée',
          message: 'L\'authentification à deux facteurs a été activée',
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    } else if (twoFactorEnabled) {
      setTwoFactorEnabled(false);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: '2FA désactivée',
          message: 'L\'authentification à deux facteurs a été désactivée',
          type: 'warning',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            connected: !integration.connected,
            status: !integration.connected ? 'active' : 'pending',
            lastSync: !integration.connected ? new Date().toISOString() : undefined
          }
        : integration
    ));
  };

  const testDatabaseConnection = (dbId: string) => {
    setDatabases(prev => prev.map(db => 
      db.id === dbId 
        ? { 
            ...db, 
            status: Math.random() > 0.3 ? 'connected' : 'error',
            lastConnection: new Date().toISOString()
          }
        : db
    ));
  };

  const runBackup = (backupId: string) => {
    setBackups(prev => prev.map(backup => 
      backup.id === backupId 
        ? { 
            ...backup, 
            lastBackup: new Date().toISOString()
          }
        : backup
    ));
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Sauvegarde lancée',
        message: 'La sauvegarde a été démarrée avec succès',
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const createBlogPost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: 'Nouveau post',
      content: '# Nouveau post\n\nContenu du post...',
      excerpt: '',
      status: 'draft',
      author: currentUser?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      readTime: 1
    };
    
    setSelectedBlogPost(newPost);
    setIsCreatingPost(true);
    setShowBlogEditor(true);
  };

  const saveBlogPost = () => {
    if (selectedBlogPost) {
      if (isCreatingPost) {
        setBlogPosts(prev => [...prev, selectedBlogPost]);
      } else {
        setBlogPosts(prev => prev.map(post => 
          post.id === selectedBlogPost.id ? selectedBlogPost : post
        ));
      }
      
      setShowBlogEditor(false);
      setSelectedBlogPost(null);
      setIsCreatingPost(false);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: isCreatingPost ? 'Post créé' : 'Post mis à jour',
          message: `Le post "${selectedBlogPost.title}" a été ${isCreatingPost ? 'créé' : 'mis à jour'}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const deleteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== postId));
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Post supprimé',
        message: 'Le post a été supprimé avec succès',
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.settings.personalInfo}</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h4 className="font-medium text-slate-900">{currentUser?.name || 'User'}</h4>
              <p className="text-sm text-slate-600">{currentUser?.role || 'Member'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Localisation</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Parlez-nous de vous..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Site web</label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
              <input
                type="url"
                value={profileData.linkedin}
                onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">GitHub</label>
              <input
                type="url"
                value={profileData.github}
                onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.settings.changePassword}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe actuel</label>
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Nouveau mot de passe</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Confirmer le nouveau mot de passe</label>
            <input
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={changePassword}
            disabled={!currentPassword || !newPassword || !confirmPassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t.settings.changePassword}
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Authentification à deux facteurs (2FA)</h3>
        
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-slate-900">2FA Status</h4>
              <p className="text-sm text-slate-600">
                {twoFactorEnabled ? 'Activée' : 'Désactivée'}
              </p>
            </div>
            <div className={`flex items-center space-x-2 ${twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {twoFactorEnabled ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
              <span className="font-medium">
                {twoFactorEnabled ? 'Sécurisé' : 'Non sécurisé'}
              </span>
            </div>
          </div>

          {!twoFactorEnabled && (
            <div className="space-y-4">
              <div className="text-center">
                <img src={qrCode} alt="QR Code" className="mx-auto mb-4 border rounded-lg" />
                <p className="text-sm text-slate-600 mb-4">
                  Scannez ce QR code avec votre application d'authentification
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Code de vérification</label>
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
                onClick={toggle2FA}
                disabled={verificationCode.length !== 6}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Activer la 2FA
              </button>
            </div>
          )}

          {twoFactorEnabled && (
            <button
              onClick={toggle2FA}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Désactiver la 2FA
            </button>
          )}
        </div>
      </div>

      {/* Security Log */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Journal de sécurité</h3>
        
        <div className="space-y-3">
          {[
            { action: 'Connexion réussie', time: '2024-01-20 10:30', ip: '192.168.1.100', status: 'success' },
            { action: 'Tentative de connexion échouée', time: '2024-01-19 15:45', ip: '203.0.113.1', status: 'error' },
            { action: 'Mot de passe modifié', time: '2024-01-18 09:15', ip: '192.168.1.100', status: 'warning' },
            { action: '2FA activée', time: '2024-01-17 14:20', ip: '192.168.1.100', status: 'success' }
          ].map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  log.status === 'success' ? 'bg-green-500' :
                  log.status === 'error' ? 'bg-red-500' : 'bg-orange-500'
                }`}></div>
                <div>
                  <p className="font-medium text-slate-900">{log.action}</p>
                  <p className="text-sm text-slate-600">{log.time} • IP: {log.ip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Préférences de notification</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <h4 className="font-medium text-slate-900">Notifications générales</h4>
              <p className="text-sm text-slate-600">Activer ou désactiver toutes les notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.enabled}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, enabled: e.target.checked }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.notifications.enabled && (
            <>
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Canaux de notification</h4>
                
                {[
                  { key: 'email', label: 'Email', icon: Mail },
                  { key: 'push', label: 'Notifications push', icon: Smartphone },
                  { key: 'desktop', label: 'Notifications bureau', icon: Monitor }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-slate-500" />
                      <span className="font-medium text-slate-900">{label}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, [key]: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Types de notification</h4>
                
                {[
                  { key: 'taskUpdates', label: 'Mises à jour des tâches', description: 'Nouvelles tâches, changements de statut' },
                  { key: 'projectDeadlines', label: 'Échéances de projet', description: 'Rappels avant les dates limites' },
                  { key: 'teamMentions', label: 'Mentions d\'équipe', description: 'Quand vous êtes mentionné dans les commentaires' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <h5 className="font-medium text-slate-900">{label}</h5>
                      <p className="text-sm text-slate-600">{description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications[key as keyof typeof settings.notifications] as boolean}
                        onChange={(e) => setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, [key]: e.target.checked }
                        })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.settings.theme}</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: 'light', label: t.settings.lightMode, icon: Sun },
            { value: 'dark', label: t.settings.darkMode, icon: Moon },
            { value: 'system', label: t.settings.systemMode, icon: Monitor }
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSettings({
                ...settings,
                preferences: { ...settings.preferences, theme: value as any }
              })}
              className={`p-4 border-2 rounded-lg transition-colors ${
                settings.preferences.theme === value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Icon className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <p className="font-medium text-slate-900">{label}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.settings.language} et région</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.language}</label>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, language: e.target.value }
              })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.timezone}</label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, timezone: e.target.value }
              })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
              <option value="America/New_York">America/New_York (GMT-5)</option>
              <option value="America/Los_Angeles">America/Los_Angeles (GMT-8)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.settings.dateFormat}</label>
            <select
              value={settings.preferences.dateFormat}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, dateFormat: e.target.value }
              })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Format d'heure</label>
            <select
              value={settings.preferences.timeFormat}
              onChange={(e) => setSettings({
                ...settings,
                preferences: { ...settings.preferences, timeFormat: e.target.value as any }
              })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="24h">24 heures</option>
              <option value="12h">12 heures (AM/PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAISection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Configuration IA</h3>
        
        <div className="space-y-4">
          {[
            { key: 'enabled', label: 'Activer l\'IA', description: 'Utiliser l\'intelligence artificielle pour optimiser vos projets' },
            { key: 'autoOptimization', label: 'Optimisation automatique', description: 'Permettre à l\'IA d\'optimiser automatiquement vos workflows' },
            { key: 'predictiveAnalytics', label: 'Analyses prédictives', description: 'Prédictions sur les performances et les risques' },
            { key: 'smartNotifications', label: 'Notifications intelligentes', description: 'Notifications personnalisées basées sur l\'IA' },
            { key: 'voiceCommands', label: 'Commandes vocales', description: 'Contrôler l\'application avec la voix' },
            { key: 'dataSharing', label: 'Partage de données', description: 'Partager des données anonymes pour améliorer l\'IA' }
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <h4 className="font-medium text-slate-900">{label}</h4>
                <p className="text-sm text-slate-600">{description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings[key as keyof typeof aiSettings] as boolean}
                  onChange={(e) => setAiSettings({ ...aiSettings, [key]: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Modèle IA</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Version du modèle</label>
            <select
              value={aiSettings.modelVersion}
              onChange={(e) => setAiSettings({ ...aiSettings, modelVersion: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="gpt-4">GPT-4 (Recommandé)</option>
              <option value="gpt-3.5">GPT-3.5 (Plus rapide)</option>
              <option value="claude">Claude (Alternatif)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Vitesse de réponse</label>
            <select
              value={aiSettings.responseSpeed}
              onChange={(e) => setAiSettings({ ...aiSettings, responseSpeed: e.target.value })}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="fast">Rapide</option>
              <option value="balanced">Équilibré</option>
              <option value="accurate">Précis</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.settings.integrations} disponibles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div key={integration.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-8 h-8 text-slate-600" />
                    <div>
                      <h4 className="font-medium text-slate-900">{integration.name}</h4>
                      <p className="text-sm text-slate-600">{integration.description}</p>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    integration.status === 'active' ? 'bg-green-500' :
                    integration.status === 'error' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></div>
                </div>

                {integration.connected && integration.lastSync && (
                  <p className="text-xs text-slate-500 mb-3">
                    Dernière sync: {new Date(integration.lastSync).toLocaleString('fr-FR')}
                  </p>
                )}

                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                    integration.connected
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {integration.connected ? 'Déconnecter' : 'Connecter'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Webhooks</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
            <div>
              <h4 className="font-medium text-slate-900">Webhook de notification</h4>
              <p className="text-sm text-slate-600">https://api.company.com/webhooks/notifications</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Actif</span>
              <button className="p-1 text-slate-400 hover:text-slate-600">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors">
            <Plus className="w-5 h-5 mx-auto mb-1" />
            Ajouter un webhook
          </button>
        </div>
      </div>
    </div>
  );

  const renderDatabaseSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Connexions de base de données</h3>
        
        <div className="space-y-4">
          {databases.map((db) => (
            <div key={db.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-900">{db.name}</h4>
                  <p className="text-sm text-slate-600">{db.type.toUpperCase()} • {db.host}:{db.port}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    db.status === 'connected' ? 'bg-green-500' :
                    db.status === 'error' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    db.status === 'connected' ? 'text-green-700' :
                    db.status === 'error' ? 'text-red-700' : 'text-orange-700'
                  }`}>
                    {db.status === 'connected' ? 'Connecté' :
                     db.status === 'error' ? 'Erreur' : 'Déconnecté'}
                  </span>
                </div>
              </div>

              {db.lastConnection && (
                <p className="text-xs text-slate-500 mb-3">
                  Dernière connexion: {new Date(db.lastConnection).toLocaleString('fr-FR')}
                </p>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => testDatabaseConnection(db.id)}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  Tester la connexion
                </button>
                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors">
          <Plus className="w-5 h-5 mx-auto mb-2" />
          Ajouter une connexion
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Statistiques de la base de données</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium text-slate-900">Taille totale</h4>
            </div>
            <p className="text-2xl font-bold text-slate-900">2.8 GB</p>
            <p className="text-sm text-slate-600">+12% ce mois</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <h4 className="font-medium text-slate-900">Requêtes/sec</h4>
            </div>
            <p className="text-2xl font-bold text-slate-900">1,247</p>
            <p className="text-sm text-slate-600">Moyenne 24h</p>
          </div>

          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <h4 className="font-medium text-slate-900">Temps de réponse</h4>
            </div>
            <p className="text-2xl font-bold text-slate-900">23ms</p>
            <p className="text-sm text-slate-600">Moyenne</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Configurations de sauvegarde</h3>
        
        <div className="space-y-4">
          {backups.map((backup) => (
            <div key={backup.id} className="border border-slate-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-slate-900">{backup.name}</h4>
                  <p className="text-sm text-slate-600">
                    {backup.frequency === 'daily' ? 'Quotidienne' :
                     backup.frequency === 'weekly' ? 'Hebdomadaire' : 'Mensuelle'} • 
                    {backup.destination === 'cloud' ? ' Cloud' :
                     backup.destination === 's3' ? ' Amazon S3' : ' Local'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={backup.enabled}
                      onChange={(e) => setBackups(prev => prev.map(b => 
                        b.id === backup.id ? { ...b, enabled: e.target.checked } : b
                      ))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                {backup.lastBackup && (
                  <div>
                    <p className="text-xs text-slate-500">Dernière sauvegarde</p>
                    <p className="text-sm font-medium text-slate-900">
                      {new Date(backup.lastBackup).toLocaleString('fr-FR')}
                    </p>
                  </div>
                )}
                {backup.size && (
                  <div>
                    <p className="text-xs text-slate-500">Taille</p>
                    <p className="text-sm font-medium text-slate-900">{backup.size}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => runBackup(backup.id)}
                  disabled={!backup.enabled}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Lancer maintenant
                </button>
                <button className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full p-4 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors">
          <Plus className="w-5 h-5 mx-auto mb-2" />
          Nouvelle configuration
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Restauration</h3>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h4 className="font-medium text-orange-900">Zone de danger</h4>
          </div>
          <p className="text-sm text-orange-700 mb-4">
            La restauration remplacera toutes les données actuelles. Cette action est irréversible.
          </p>
          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            Restaurer depuis une sauvegarde
          </button>
        </div>
      </div>
    </div>
  );

  const renderBlogSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{t.blog.allPosts}</h3>
        <button
          onClick={createBlogPost}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>{t.blog.newArticle}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded-full ${
                post.status === 'published' ? 'bg-green-100 text-green-700' :
                post.status === 'draft' ? 'bg-orange-100 text-orange-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {post.status === 'published' ? t.status.published :
                 post.status === 'draft' ? t.status.draft : t.status.archived}
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => {
                    setSelectedBlogPost(post);
                    setIsCreatingPost(false);
                    setShowBlogEditor(true);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteBlogPost(post.id)}
                  className="p-1 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h4 className="font-medium text-slate-900 mb-2 line-clamp-2">{post.title}</h4>
            <p className="text-sm text-slate-600 mb-3 line-clamp-3">{post.excerpt}</p>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{post.readTime} min de lecture</span>
              <span>{new Date(post.updatedAt).toLocaleDateString('fr-FR')}</span>
            </div>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-slate-500">+{post.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Blog Editor Modal */}
      {showBlogEditor && selectedBlogPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">
                {isCreatingPost ? t.blog.newArticle : t.blog.editArticle}
              </h3>
              <button
                onClick={() => setShowBlogEditor(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.blog.postTitle}</label>
                  <input
                    type="text"
                    value={selectedBlogPost.title}
                    onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Extrait</label>
                  <textarea
                    value={selectedBlogPost.excerpt}
                    onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, excerpt: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Résumé de l'article..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
                    <select
                      value={selectedBlogPost.status}
                      onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, status: e.target.value as any })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="draft">{t.status.draft}</option>
                      <option value="published">{t.status.published}</option>
                      <option value="archived">{t.status.archived}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tags (séparés par des virgules)</label>
                    <input
                      type="text"
                      value={selectedBlogPost.tags.join(', ')}
                      onChange={(e) => setSelectedBlogPost({ 
                        ...selectedBlogPost, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                      })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="IA, Guide, Productivité"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.blog.content} (Markdown)</label>
                  <textarea
                    value={selectedBlogPost.content}
                    onChange={(e) => setSelectedBlogPost({ ...selectedBlogPost, content: e.target.value })}
                    rows={20}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                    placeholder="# Titre de l'article

Votre contenu en Markdown..."
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 p-6 border-t border-slate-200">
              <button
                onClick={() => setShowBlogEditor(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.common.cancel}
              </button>
              <button
                onClick={saveBlogPost}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingPost ? t.blog.create : t.common.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'security':
        return renderSecuritySection();
      case 'notifications':
        return renderNotificationsSection();
      case 'appearance':
        return renderAppearanceSection();
      case 'ai':
        return renderAISection();
      case 'integrations':
        return renderIntegrationsSection();
      case 'database':
        return renderDatabaseSection();
      case 'backup':
        return renderBackupSection();
      case 'blog':
        return renderBlogSection();
      default:
        return renderProfileSection();
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
          onClick={saveSettings}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>{t.common.save}</span>
        </button>
      </div>

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
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;