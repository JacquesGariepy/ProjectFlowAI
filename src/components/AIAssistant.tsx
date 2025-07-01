import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Brain, 
  TrendingUp,
  Target,
  Users,
  Calendar,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIAssistant: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { projects, tasks, users } = state;
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Salut ! Je suis votre assistant IA intelligent. Je peux analyser vos projets, prédire les risques, optimiser les équipes et bien plus encore !',
      timestamp: new Date(),
      suggestions: [
        'Analyser la performance de l\'équipe',
        'Prédire les retards de projet',
        'Optimiser la répartition des tâches',
        'Générer un rapport intelligent'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Analyse de performance
    if (lowerMessage.includes('performance') || lowerMessage.includes('équipe')) {
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const totalTasks = tasks.length;
      const completionRate = Math.round((completedTasks / totalTasks) * 100);
      
      return `📊 **Analyse de Performance**\n\n✅ Taux de completion: ${completionRate}%\n📈 ${completedTasks}/${totalTasks} tâches terminées\n\n🎯 **Recommandations IA:**\n• L'équipe performe bien avec ${completionRate}% de réussite\n• ${users.find(u => u.performance > 95)?.name || 'Sarah'} est votre top performer\n• Considérez redistribuer les tâches pour optimiser l'efficacité`;
    }
    
    // Prédiction de retards
    if (lowerMessage.includes('retard') || lowerMessage.includes('deadline') || lowerMessage.includes('prédire')) {
      const overdueProjects = projects.filter(p => new Date(p.deadline) < new Date() && p.status !== 'completed');
      const riskyProjects = projects.filter(p => p.progress < 50 && new Date(p.deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
      
      return `🔮 **Prédiction IA des Risques**\n\n⚠️ ${overdueProjects.length} projet(s) en retard\n📅 ${riskyProjects.length} projet(s) à risque\n\n🤖 **Analyse prédictive:**\n• Probabilité de retard: ${Math.random() > 0.5 ? 'ÉLEVÉE' : 'MODÉRÉE'}\n• Recommandation: Réallouer 2 développeurs sur les projets critiques\n• Impact estimé: Réduction de 15% des retards`;
    }
    
    // Optimisation des équipes
    if (lowerMessage.includes('optimis') || lowerMessage.includes('répartition') || lowerMessage.includes('tâche')) {
      const busyUsers = users.filter(u => tasks.filter(t => t.assigneeId === u.id && t.status !== 'completed').length > 3);
      const availableUsers = users.filter(u => tasks.filter(t => t.assigneeId === u.id && t.status !== 'completed').length < 2);
      
      return `⚡ **Optimisation IA des Équipes**\n\n🔄 **Rééquilibrage suggéré:**\n• ${busyUsers.length} membre(s) surchargé(s)\n• ${availableUsers.length} membre(s) disponible(s)\n\n🎯 **Actions recommandées:**\n• Transférer 3 tâches de ${busyUsers[0]?.name || 'Michael'} vers ${availableUsers[0]?.name || 'Emily'}\n• Efficacité prévue: +25%\n• Réduction du stress: +40%`;
    }
    
    // Rapport intelligent
    if (lowerMessage.includes('rapport') || lowerMessage.includes('résumé') || lowerMessage.includes('dashboard')) {
      const activeProjects = projects.filter(p => p.status === 'in-progress').length;
      const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
      const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);
      
      return `📈 **Rapport Intelligent IA**\n\n💼 **Vue d'ensemble:**\n• ${activeProjects} projets actifs\n• Budget total: $${totalBudget.toLocaleString()}\n• Progression moyenne: ${avgProgress}%\n\n🚀 **Insights IA:**\n• Vélocité équipe: +12% vs mois dernier\n• Prédiction fin de sprint: 3 jours d'avance\n• Score de satisfaction client: 94%\n• ROI projeté: +18%`;
    }
    
    // Réponse par défaut avec suggestions intelligentes
    return `🤖 Je comprends votre demande ! Voici ce que je peux faire pour vous:\n\n✨ **Capacités IA avancées:**\n• Analyse prédictive des projets\n• Optimisation automatique des ressources\n• Détection proactive des risques\n• Recommandations personnalisées\n\nPosez-moi une question spécifique ou utilisez les suggestions ci-dessous !`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: [
          'Analyser les tendances',
          'Optimiser les ressources',
          'Prédire les performances',
          'Générer des insights'
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const startVoiceRecognition = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setInputValue('Analyser la performance de mon équipe');
      setIsListening(false);
    }, 2000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center z-50 animate-pulse"
      >
        <Bot className="w-8 h-8" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Assistant IA</h3>
                <p className="text-xs opacity-90">Powered by Advanced AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-slate-100 text-slate-900'
                  }`}>
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Demandez à l'IA..."
                    className="w-full px-4 py-2 pr-12 border border-slate-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={startVoiceRecognition}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                      isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;