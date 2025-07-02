import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Menu,
  ChevronDown,
  X,
  Mic,
  Brain,
  Sparkles,
  Zap,
  Command,
  Clock,
  FileText,
  FolderOpen,
  CheckSquare,
  Users,
  Calendar as CalendarIcon,
  TrendingUp,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Keyboard,
  HelpCircle,
  Star,
  Bookmark,
  History,
  Filter,
  ArrowRight,
  Globe,
  Wifi,
  WifiOff,
  Languages
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { getRelativeTime } from '../utils/dateUtils';

interface HeaderProps {
  activeView: string;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  showVoiceCommands: boolean;
  setShowVoiceCommands: (show: boolean) => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'project' | 'task' | 'user' | 'blog' | 'event';
  description: string;
  url: string;
  icon: React.ComponentType<any>;
  relevance: number;
  itemData?: any; // Données complètes de l'élément pour navigation précise
}

interface VoiceCommand {
  command: string;
  description: string;
  action: () => void;
  category: string;
}

const Header: React.FC<HeaderProps> = ({ 
  activeView, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  showVoiceCommands,
  setShowVoiceCommands
}) => {
  const { state, dispatch } = useAppContext();
  const { currentUser, notifications, searchQuery, projects, tasks, users, calendarEvents } = state;
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [voiceConfidence, setVoiceConfidence] = useState(0);
  const [lastVoiceCommand, setLastVoiceCommand] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications.filter(n => !n.isRead);

  // Navigation function to handle view changes with specific item targeting
  const navigateToView = (view: string, itemId?: string, itemType?: string) => {
    // Use the parent component's navigation system with enhanced parameters
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { 
        view, 
        itemId, 
        itemType,
        action: 'view' // Action type: 'view', 'edit', 'create'
      } 
    }));
  };

  // Voice commands configuration
  const voiceCommands: VoiceCommand[] = [
    {
      command: "créer un nouveau projet",
      description: "Ouvre le formulaire de création de projet",
      action: () => {
        navigateToView('projects', undefined, 'create');
      },
      category: "Navigation"
    },
    {
      command: "afficher les tâches",
      description: "Navigue vers la page des tâches",
      action: () => {
        navigateToView('tasks');
      },
      category: "Navigation"
    },
    {
      command: "ouvrir le calendrier",
      description: "Navigue vers le calendrier",
      action: () => {
        navigateToView('calendar');
      },
      category: "Navigation"
    },
    {
      command: "afficher le blog",
      description: "Navigue vers le blog",
      action: () => {
        navigateToView('blog');
      },
      category: "Navigation"
    },
    {
      command: "analyser les performances",
      description: "Ouvre le dashboard IA",
      action: () => {
        navigateToView('smart-dashboard');
      },
      category: "IA"
    },
    {
      command: "insights ia",
      description: "Ouvre les insights IA avancés",
      action: () => {
        navigateToView('ai-insights');
      },
      category: "IA"
    },
    {
      command: "équipe",
      description: "Navigue vers la page équipe",
      action: () => {
        navigateToView('team');
      },
      category: "Navigation"
    },
    {
      command: "paramètres",
      description: "Ouvre les paramètres",
      action: () => {
        navigateToView('settings');
      },
      category: "Navigation"
    },
    {
      command: "aide",
      description: "Ouvre la page d'aide",
      action: () => {
        navigateToView('help-support');
      },
      category: "Navigation"
    },
    {
      command: "rechercher",
      description: "Active la recherche globale",
      action: () => {
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      },
      category: "Recherche"
    },
    {
      command: "notifications",
      description: "Ouvre le panneau des notifications",
      action: () => {
        setShowNotifications(true);
      },
      category: "Interface"
    },
    {
      command: "profil",
      description: "Ouvre le menu profil",
      action: () => {
        setShowProfile(true);
      },
      category: "Interface"
    }
  ];

  // Keyboard shortcuts
  const keyboardShortcuts = [
    { key: 'Ctrl + K', description: 'Recherche globale', action: ()=> setShowSearch(true) },
    { key: 'Ctrl + N', description: 'Nouveau projet', action: () => navigateToView('projects', undefined, 'create') },
    { key: 'Ctrl + T', description: 'Nouvelle tâche', action: () => navigateToView('tasks', undefined, 'create') },
    { key: 'Ctrl + /', description: 'Raccourcis clavier', action: () => setShowKeyboardShortcuts(true) },
    { key: 'Ctrl + B', description: 'Toggle sidebar', action: () => setSidebarCollapsed(!sidebarCollapsed) },
    { key: 'Ctrl + 1', description: 'Dashboard IA', action: () => navigateToView('smart-dashboard') },
    { key: 'Ctrl + 2', description: 'Projets', action: () => navigateToView('projects') },
    { key: 'Ctrl + 3', description: 'Tâches', action: () => navigateToView('tasks') },
    { key: 'Ctrl + 4', description: 'Équipe', action: () => navigateToView('team') },
    { key: 'Ctrl + 5', description: 'Calendrier', action: () => navigateToView('calendar') },
    { key: 'Ctrl + 6', description: 'Blog', action: () => navigateToView('blog') },
    { key: 'Ctrl + 0', description: 'Paramètres', action: () => navigateToView('settings') },
  ];

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for navigation events from parent
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      // This will be handled by the parent App component
      // We just need to close any open modals
      setShowSearch(false);
      setShowNotifications(false);
      setShowProfile(false);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // Keyboard shortcuts handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            setShowSearch(true);
            setTimeout(() => searchInputRef.current?.focus(), 100);
            break;
          case 'b':
            e.preventDefault();
            setSidebarCollapsed(!sidebarCollapsed);
            break;
          case '/':
            e.preventDefault();
            setShowKeyboardShortcuts(true);
            break;
          case '1':
            e.preventDefault();
            navigateToView('smart-dashboard');
            break;
          case '2':
            e.preventDefault();
            navigateToView('projects');
            break;
          case '3':
            e.preventDefault();
            navigateToView('tasks');
            break;
          case '4':
            e.preventDefault();
            navigateToView('team');
            break;
          case '5':
            e.preventDefault();
            navigateToView('calendar');
            break;
          case '6':
            e.preventDefault();
            navigateToView('blog');
            break;
          case '0':
            e.preventDefault();
            navigateToView('settings');
            break;
          case 'n':
            e.preventDefault();
            navigateToView('projects', undefined, 'create');
            break;
          case 't':
            e.preventDefault();
            navigateToView('tasks', undefined, 'create');
            break;
        }
      }

      if (e.key === 'Escape') {
        setShowSearch(false);
        setShowNotifications(false);
        setShowProfile(false);
        setShowKeyboardShortcuts(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed, setSidebarCollapsed]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enhanced search functionality with complete item data
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search projects with complete data
    projects.forEach(project => {
      if (project.name.toLowerCase().includes(lowerQuery) || 
          project.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: project.id,
          title: project.name,
          type: 'project',
          description: project.description,
          url: 'projects',
          icon: FolderOpen,
          relevance: project.name.toLowerCase().includes(lowerQuery) ? 2 : 1,
          itemData: project // Données complètes du projet
        });
      }
    });

    // Search tasks with complete data
    tasks.forEach(task => {
      if (task.title.toLowerCase().includes(lowerQuery) || 
          task.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: task.id,
          title: task.title,
          type: 'task',
          description: task.description,
          url: 'tasks',
          icon: CheckSquare,
          relevance: task.title.toLowerCase().includes(lowerQuery) ? 2 : 1,
          itemData: task // Données complètes de la tâche
        });
      }
    });

    // Search users with complete data
    users.forEach(user => {
      if (user.name.toLowerCase().includes(lowerQuery) || 
          user.email.toLowerCase().includes(lowerQuery) ||
          user.role.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: user.id,
          title: user.name,
          type: 'user',
          description: `${user.role} - ${user.email}`,
          url: 'team',
          icon: User,
          relevance: user.name.toLowerCase().includes(lowerQuery) ? 2 : 1,
          itemData: user // Données complètes de l'utilisateur
        });
      }
    });

    // Search calendar events with complete data
    calendarEvents.forEach(event => {
      if (event.title.toLowerCase().includes(lowerQuery) || 
          event.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          id: event.id,
          title: event.title,
          type: 'event',
          description: event.description,
          url: 'calendar',
          icon: CalendarIcon,
          relevance: event.title.toLowerCase().includes(lowerQuery) ? 2 : 1,
          itemData: event // Données complètes de l'événement
        });
      }
    });

    // Add blog search results
    if (lowerQuery.includes('blog') || lowerQuery.includes('article') || lowerQuery.includes('guide')) {
      results.push({
        id: 'blog-search',
        title: 'Blog et Articles',
        type: 'blog',
        description: 'Parcourir les articles et guides',
        url: 'blog',
        icon: FileText,
        relevance: 1,
        itemData: null
      });
    }

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    setSearchResults(results.slice(0, 10));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
    performSearch(query);
  };

  const handleSearchSubmit = (query: string) => {
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 9)]);
    }
    setShowSearch(false);
  };

  // Enhanced search result click handler with precise navigation
  const handleSearchResultClick = (result: SearchResult) => {
    // Navigate to the appropriate view with the specific item ID
    navigateToView(result.url, result.id, result.type);
    handleSearchSubmit(searchQuery);
    
    // Show navigation feedback
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Navigation vers l\'élément',
        message: `Ouverture de "${result.title}"`,
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  // Voice recognition
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Reconnaissance vocale non supportée dans ce navigateur');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'fr-FR';

    setIsListening(true);
    setVoiceConfidence(0);

    recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      const confidence = Math.round(event.results[0][0].confidence * 100);
      
      setLastVoiceCommand(command);
      setVoiceConfidence(confidence);
      
      processVoiceCommand(command);
    };

    recognition.onerror = (event: any) => {
      console.error('Erreur de reconnaissance vocale:', event.error);
      setIsListening(false);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Erreur vocale',
          message: 'Impossible de comprendre la commande vocale',
          type: 'error',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processVoiceCommand = (command: string) => {
    const matchedCommand = voiceCommands.find(cmd => 
      command.includes(cmd.command) || 
      cmd.command.split(' ').some(word => command.includes(word))
    );

    if (matchedCommand) {
      matchedCommand.action();
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Commande vocale exécutée',
          message: `"${command}" - ${matchedCommand.description}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    } else {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Commande non reconnue',
          message: `"${command}" - Dites "aide" pour voir les commandes disponibles`,
          type: 'warning',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const getPageTitle = () => {
    switch (activeView) {
      case 'smart-dashboard': return 'Dashboard IA Intelligent';
      case 'ai-insights': return 'Insights IA Avancés';
      case 'dashboard': return 'Dashboard Classic';
      case 'projects': return 'Projets';
      case 'tasks': return 'Tâches';
      case 'team': return 'Équipe';
      case 'calendar': return 'Calendrier';
      case 'blog': return 'Blog';
      case 'settings': return 'Paramètres';
      case 'help-support': return 'Aide et Support';
      case 'ai-premium': return 'IA Premium';
      default: return 'Dashboard IA';
    }
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.isRead) {
      dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
    }
    
    if (notification.actionUrl) {
      // Remove leading slash and navigate
      const view = notification.actionUrl.replace('/', '');
      navigateToView(view);
    }
    
    setShowNotifications(false);
  };

  const markAllNotificationsRead = () => {
    notifications.forEach(notification => {
      if (!notification.isRead) {
        dispatch({ type: 'MARK_NOTIFICATION_READ', payload: notification.id });
      }
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: 'Déconnexion',
        message: 'Vous avez été déconnecté avec succès',
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    // Apply theme logic here
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return FolderOpen;
      case 'task': return CheckSquare;
      case 'user': return User;
      case 'event': return CalendarIcon;
      case 'blog': return FileText;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-blue-600';
      case 'task': return 'text-green-600';
      case 'user': return 'text-purple-600';
      case 'event': return 'text-orange-600';
      case 'blog': return 'text-pink-600';
      default: return 'text-slate-600';
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'project': return 'Projet';
      case 'task': return 'Tâche';
      case 'user': return 'Utilisateur';
      case 'event': return 'Événement';
      case 'blog': return 'Article';
      default: return type;
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-slate-900">{getPageTitle()}</h1>
              {(activeView === 'smart-dashboard' || activeView === 'ai-insights') && (
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-medium">
                    IA ACTIVE
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-slate-500">
                Bienvenue, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Utilisateur'} ! 🚀
              </p>
              {!isOnline && (
                <div className="flex items-center space-x-1 text-red-500">
                  <WifiOff className="w-3 h-3" />
                  <span className="text-xs">Hors ligne</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* AI Voice Commands Toggle */}
          <button
            onClick={() => setShowVoiceCommands(!showVoiceCommands)}
            className={`p-2 rounded-lg transition-colors ${
              showVoiceCommands 
                ? 'bg-purple-100 text-purple-600' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
            title="Commandes vocales IA"
          >
            <Mic className="w-5 h-5" />
          </button>

          {/* Voice Recognition */}
          <button
            onClick={startVoiceRecognition}
            disabled={isListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-100 text-red-600 animate-pulse' 
                : 'hover:bg-slate-100 text-slate-600'
            }`}
            title="Reconnaissance vocale"
          >
            {isListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* AI Status Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium text-purple-700">IA Optimisée</span>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
          </div>

          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Recherche intelligente IA... (Ctrl+K)"
              value={searchQuery || ''}
              onChange={handleSearchChange}
              onFocus={() => setShowSearch(true)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
              className="pl-10 pr-4 py-2 w-80 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Enhanced Search Results Dropdown */}
            {showSearch && (searchResults.length > 0 || searchHistory.length > 0) && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
                {searchResults.length > 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center space-x-2">
                      <Search className="w-3 h-3" />
                      <span>Résultats de recherche</span>
                      <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                        {searchResults.length}
                      </span>
                    </div>
                    {searchResults.map((result) => {
                      const Icon = getTypeIcon(result.type);
                      return (
                        <button
                          key={result.id}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full px-4 py-3 hover:bg-slate-50 text-left flex items-center space-x-3 group transition-colors"
                        >
                          <div className={`p-2 rounded-lg ${
                            result.type === 'project' ? 'bg-blue-100' :
                            result.type === 'task' ? 'bg-green-100' :
                            result.type === 'user' ? 'bg-purple-100' :
                            result.type === 'event' ? 'bg-orange-100' :
                            'bg-pink-100'
                          }`}>
                            <Icon className={`w-4 h-4 ${getTypeColor(result.type)}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className="font-medium text-slate-900 truncate">{result.title}</div>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                result.type === 'project' ? 'bg-blue-100 text-blue-700' :
                                result.type === 'task' ? 'bg-green-100 text-green-700' :
                                result.type === 'user' ? 'bg-purple-100 text-purple-700' :
                                result.type === 'event' ? 'bg-orange-100 text-orange-700' :
                                'bg-pink-100 text-pink-700'
                              }`}>
                                {getTypeBadge(result.type)}
                              </span>
                            </div>
                            <div className="text-sm text-slate-500 truncate">{result.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </button>
                      );
                    })}
                  </>
                )}

                {searchHistory.length > 0 && searchResults.length === 0 && (
                  <>
                    <div className="px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide flex items-center space-x-2">
                      <History className="w-3 h-3" />
                      <span>Recherches récentes</span>
                    </div>
                    {searchHistory.map((query, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
                          performSearch(query);
                        }}
                        className="w-full px-4 py-2 hover:bg-slate-50 text-left flex items-center space-x-3"
                      >
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{query}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Search */}
          <button
            onClick={() => setShowSearch(true)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Search className="w-5 h-5 text-slate-600" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center space-x-1"
              title={t.header.language}
            >
              <Languages className="w-5 h-5 text-slate-600" />
              <span className="text-xs font-medium text-slate-600 hidden lg:block">
                {language.toUpperCase()}
              </span>
            </button>

            {showLanguageSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide border-b border-slate-100">
                  {t.header.language}
                </div>
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageSelector(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                      language === lang.code ? 'bg-purple-50 text-purple-700' : 'text-slate-700'
                    }`}
                  >
                    <span className="mr-3 text-lg">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.name}</span>
                    {language === lang.code && (
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts */}
          <button
            onClick={() => setShowKeyboardShortcuts(true)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 transition-colors"
            title={language === 'fr' ? 'Raccourcis clavier (Ctrl+/)' : 'Keyboard shortcuts (Ctrl+/)'}
          >
            <Keyboard className="w-5 h-5 text-slate-600" />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              {unreadNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications.length}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Notifications IA</h3>
                  <div className="flex items-center space-x-2">
                    {unreadNotifications.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-xs text-purple-600 hover:text-purple-800"
                      >
                        Tout marquer lu
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="p-1 hover:bg-slate-100 rounded"
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>
                
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-slate-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p>Aucune notification</p>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-l-4 transition-colors ${
                          notification.isRead 
                            ? 'border-transparent' 
                            : notification.type === 'error' ? 'border-red-500' :
                              notification.type === 'warning' ? 'border-orange-500' :
                              notification.type === 'success' ? 'border-emerald-500' :
                              'border-purple-500'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${notification.isRead ? 'text-slate-600' : 'text-slate-900'}`}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-1">{getRelativeTime(notification.createdAt)}</p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <img
                src={currentUser?.avatar || '/default-avatar.jpg'}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/20"
              />
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={currentUser?.avatar || '/default-avatar.jpg'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{currentUser?.name || 'Utilisateur'}</p>
                      <p className="text-sm text-slate-500">{currentUser?.email || 'email@example.com'}</p>
                      <p className="text-xs text-slate-400 mt-1">{currentUser?.role || 'Utilisateur'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    <Zap className="w-3 h-3 text-purple-500" />
                    <span className="text-xs text-purple-600 font-medium">Utilisateur IA Premium</span>
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  </div>
                </div>
                
                <div className="py-1">
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      navigateToView('settings');
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Voir le profil
                  </button>
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      navigateToView('settings');
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Paramètres
                  </button>
                  <button 
                    onClick={() => setShowKeyboardShortcuts(true)}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Keyboard className="w-4 h-4 mr-3" />
                    Raccourcis clavier
                  </button>
                  <button 
                    onClick={() => {
                      setShowProfile(false);
                      navigateToView('help-support');
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Aide et support
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="border-t border-slate-100 py-2">
                  <div className="px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Thème
                  </div>
                  <div className="px-4 py-1 flex items-center space-x-2">
                    <button
                      onClick={() => toggleTheme('light')}
                      className={`p-2 rounded-lg transition-colors ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Sun className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleTheme('dark')}
                      className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Moon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleTheme('system')}
                      className={`p-2 rounded-lg transition-colors ${theme === 'system' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 py-1">
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Search Modal */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 w-full max-w-md mx-4">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery || ''}
                  onChange={handleSearchChange}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(searchQuery)}
                  className="w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {(searchResults.length > 0 || searchHistory.length > 0) && (
              <div className="border-t border-slate-200 max-h-64 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => {
                    const Icon = getTypeIcon(result.type);
                    return (
                      <button
                        key={result.id}
                        onClick={() => {
                          handleSearchResultClick(result);
                          setShowSearch(false);
                        }}
                        className="w-full px-4 py-3 hover:bg-slate-50 text-left flex items-center space-x-3"
                      >
                        <div className={`p-2 rounded-lg ${
                          result.type === 'project' ? 'bg-blue-100' :
                          result.type === 'task' ? 'bg-green-100' :
                          result.type === 'user' ? 'bg-purple-100' :
                          result.type === 'event' ? 'bg-orange-100' :
                          'bg-pink-100'
                        }`}>
                          <Icon className={`w-4 h-4 ${getTypeColor(result.type)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="font-medium text-slate-900 truncate">{result.title}</div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              result.type === 'project' ? 'bg-blue-100 text-blue-700' :
                              result.type === 'task' ? 'bg-green-100 text-green-700' :
                              result.type === 'user' ? 'bg-purple-100 text-purple-700' :
                              result.type === 'event' ? 'bg-orange-100 text-orange-700' :
                              'bg-pink-100 text-pink-700'
                            }`}>
                              {getTypeBadge(result.type)}
                            </span>
                          </div>
                          <div className="text-sm text-slate-500 truncate">{result.description}</div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
                        performSearch(query);
                      }}
                      className="w-full px-4 py-3 hover:bg-slate-50 text-left flex items-center space-x-3"
                    >
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-700">{query}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
                <Keyboard className="w-6 h-6 text-purple-500" />
                <span>Raccourcis clavier</span>
              </h3>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Navigation</h4>
                  <div className="space-y-2">
                    {keyboardShortcuts.slice(0, 5).map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{shortcut.description}</span>
                        <kbd className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Pages</h4>
                  <div className="space-y-2">
                    {keyboardShortcuts.slice(5).map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{shortcut.description}</span>
                        <kbd className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-mono">
                          {shortcut.key}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-3">Commandes vocales disponibles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {voiceCommands.map((command, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="font-medium text-slate-900 text-sm">"{command.command}"</div>
                      <div className="text-xs text-slate-600 mt-1">{command.description}</div>
                      <div className="text-xs text-purple-600 mt-1">{command.category}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Command Feedback */}
      {(isListening || lastVoiceCommand) && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 p-4 w-80">
            {isListening ? (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-900">Écoute en cours...</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-red-500 rounded animate-pulse"></div>
                  <div className="w-1 h-6 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-5 bg-red-500 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            ) : lastVoiceCommand && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-900">Commande détectée</span>
                  <span className="text-xs text-slate-500">{voiceConfidence}% confiance</span>
                </div>
                <div className="text-sm text-slate-600">"{lastVoiceCommand}"</div>
                <button
                  onClick={() => setLastVoiceCommand('')}
                  className="mt-2 text-xs text-purple-600 hover:text-purple-800"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;