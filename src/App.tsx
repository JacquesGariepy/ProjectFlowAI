import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SmartDashboard from './components/SmartDashboard';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Team from './components/Team';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import AIInsights from './components/AIInsights';
import AIAssistant from './components/AIAssistant';
import VoiceCommands from './components/VoiceCommands';
import Blog from './components/Blog';
import HelpSupport from './components/HelpSupport';
import AIPremium from './components/AIPremium';

function AppContent() {
  const [activeView, setActiveView] = useState('smart-dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showVoiceCommands, setShowVoiceCommands] = useState(false);
  const [navigationParams, setNavigationParams] = useState<{
    itemId?: string;
    itemType?: string;
    action?: string;
  }>({});

  // Enhanced navigation event listener with item targeting
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      const { view, itemId, itemType, action } = event.detail;
      
      // Set the active view
      setActiveView(view);
      
      // Store navigation parameters for components to use
      setNavigationParams({ itemId, itemType, action });
      
      // Clear parameters after a short delay to allow components to process
      setTimeout(() => {
        setNavigationParams({});
      }, 100);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  const renderContent = () => {
    const commonProps = {
      navigationParams,
      onNavigationComplete: () => setNavigationParams({})
    };

    switch (activeView) {
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'smart-dashboard':
        return <SmartDashboard {...commonProps} />;
      case 'ai-insights':
        return <AIInsights {...commonProps} />;
      case 'projects':
        return <Projects {...commonProps} />;
      case 'tasks':
        return <Tasks {...commonProps} />;
      case 'team':
        return <Team {...commonProps} />;
      case 'calendar':
        return <Calendar {...commonProps} />;
      case 'blog':
        return <Blog {...commonProps} />;
      case 'settings':
        return <Settings {...commonProps} />;
      case 'help-support':
        return <HelpSupport />;
      case 'ai-premium':
        return <AIPremium />;
      default:
        return <SmartDashboard {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 font-inter">
      <div className="flex">
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <Header 
            activeView={activeView}
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            showVoiceCommands={showVoiceCommands}
            setShowVoiceCommands={setShowVoiceCommands}
          />
          
          <main className="p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* AI Assistant */}
      <AIAssistant />

      {/* Voice Commands */}
      {showVoiceCommands && <VoiceCommands />}

      {/* Floating AI Indicators */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-pulse">
          🤖 IA Active • Analyse en temps réel
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;