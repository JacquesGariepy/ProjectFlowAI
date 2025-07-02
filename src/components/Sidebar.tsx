import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  CheckSquare, 
  Users, 
  Calendar as CalendarIcon, 
  Settings,
  ChevronLeft,
  Zap,
  Brain,
  Sparkles,
  TrendingUp,
  Bot,
  FileText,
  HelpCircle,
  Crown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, collapsed, setCollapsed }) => {
  const { t } = useLanguage();
  
  const menuItems = [
    { id: 'smart-dashboard', label: t.nav.smartDashboard, icon: Brain, isNew: true },
    { id: 'ai-insights', label: t.nav.aiInsights, icon: Sparkles, isNew: true },
    { id: 'dashboard', label: t.nav.classicDashboard, icon: LayoutDashboard },
    { id: 'projects', label: t.nav.projects, icon: FolderOpen },
    { id: 'tasks', label: t.nav.tasks, icon: CheckSquare },
    { id: 'team', label: t.nav.team, icon: Users },
    { id: 'calendar', label: t.nav.calendar, icon: CalendarIcon },
    { id: 'blog', label: t.nav.blog, icon: FileText },
    { id: 'help-support', label: t.nav.helpSupport, icon: HelpCircle },
    { id: 'settings', label: t.nav.settings, icon: Settings },
  ];

  const navigateToAIPremium = () => {
    setActiveView('ai-premium');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white/90 backdrop-blur-xl border-r border-slate-200/60 transition-all duration-300 z-50 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-200/60">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                ProjectFlow AI
              </h1>
              <div className="text-xs text-purple-600 font-medium">{t.sidebar.poweredByAI}</div>
            </div>
          </div>
        )}
        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 text-slate-600 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-purple-600'}`} />
                  {!collapsed && (
                    <>
                      <span className="font-medium truncate">{item.label}</span>
                      {item.isNew && (
                        <div className="absolute -top-1 -right-1">
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <Crown className="w-4 h-4" />
              <h3 className="font-semibold text-sm">{t.nav.aiPremium}</h3>
            </div>
            <p className="text-xs text-purple-100 mb-3">{t.sidebar.aiPremiumDescription}</p>
            <button 
              onClick={navigateToAIPremium}
              className="w-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-white/30 transition-colors"
            >
              {t.sidebar.discoverPremium}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;