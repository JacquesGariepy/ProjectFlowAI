import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Brain, 
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { AIService, createAIService } from '../config/ai';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIAssistant: React.FC = () => {
  const { state } = useAppContext();
  const { projects, tasks, users } = state;
  
  // Initialize AI service (you can configure this via environment variables)
  const [aiService] = useState<AIService | null>(() => {
    try {
      const provider = (import.meta.env.VITE_AI_PROVIDER as 'openai' | 'anthropic' | 'google' | 'groq') || 'openai';
      const apiKey = import.meta.env.VITE_AI_API_KEY || '';
      
      if (!apiKey || apiKey === 'your-api-key-here') {
        console.warn('AI API key not configured. AI features will use fallback responses.');
        return null;
      }
      
      return createAIService({
        provider,
        apiKey,
        model: import.meta.env.VITE_AI_MODEL || 'gpt-4o-mini'
      });
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      return null;
    }
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: '👋 Bonjour ! Je suis votre assistant IA conversationnel pour la gestion de projet. \n\n🤖 Je peux vous aider avec :\n• Analyses en temps réel de vos projets\n• Prédictions et insights intelligents\n• Conseils stratégiques personnalisés\n• Optimisation de vos processus\n• Et toute question sur la gestion de projet !\n\n💬 Posez-moi n\'importe quelle question ou utilisez les suggestions ci-dessous.',
      timestamp: new Date(),
      suggestions: [
        'Comment va mon équipe ?',
        'Quels sont les risques actuels ?',
        'Donne-moi des conseils pour optimiser',
        'Analyse mes projets en cours'
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

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // If AI service is not available, use static responses
    if (!aiService) {
      return generateStaticResponse(userMessage);
    }

    try {
      // Use the AI service for intelligent responses
      const projectContext = {
        projects: projects.map(p => ({
          name: p.name,
          status: p.status,
          progress: p.progress,
          deadline: p.deadline,
          budget: p.budget
        })),
        tasks: tasks.map(t => ({
          title: t.title,
          status: t.status,
          priority: t.priority,
          assigneeId: t.assigneeId
        })),
        users: users.map(u => ({
          name: u.name,
          role: u.role,
          performance: u.performance
        }))
      };

      // Create a comprehensive prompt for natural conversation
      const conversationalPrompt = `Tu es un assistant IA intelligent spécialisé en gestion de projet. Tu peux converser naturellement et aider avec tous les aspects de la gestion de projet.

**Contexte actuel du projet:**
- Projets: ${projects.length} projets actifs
- Tâches: ${tasks.filter(t => t.status === 'completed').length}/${tasks.length} tâches terminées (${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}% de réussite)
- Équipe: ${users.length} membres
- Projets en cours: ${projects.filter(p => p.status === 'in-progress').length}

**Message de l'utilisateur:** "${userMessage}"

Réponds de manière conversationnelle, utile et engageante. Tu peux:
- Analyser les données de projet
- Donner des conseils stratégiques
- Prédire des tendances
- Suggérer des optimisations
- Répondre à toutes questions sur la gestion de projet
- Avoir une conversation naturelle

Utilise des emojis appropriés et structure ta réponse avec markdown pour la lisibilité.`;
      
      return await aiService.generateResponse(conversationalPrompt);
      
    } catch (error) {
      console.error('AI Response Error:', error);
      // Fallback to static responses if AI service fails
      return generateStaticResponse(userMessage);
    }
  };

  const generateStaticResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Analyse de performance
    if (lowerMessage.includes('performance') || lowerMessage.includes('équipe')) {
      const completedTasks = tasks.filter(t => t.status === 'completed').length;
      const totalTasks = tasks.length;
      const completionRate = Math.round((completedTasks / totalTasks) * 100);
      
      return `📊 **Analyse de Performance**\n\n✅ Taux de completion: ${completionRate}%\n📈 ${completedTasks}/${totalTasks} tâches terminées\n\n🎯 **Recommandations:**\n• L'équipe performe bien avec ${completionRate}% de réussite\n• ${users.find(u => u.performance > 95)?.name || 'Sarah'} est votre top performer\n• Considérez redistribuer les tâches pour optimiser l'efficacité`;
    }
    
    // Réponse par défaut
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

    // Generate AI response
    try {
      const aiResponseContent = await generateAIResponse(inputValue);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date(),
        suggestions: [
          'Comment puis-je améliorer ça ?',
          'Quelles sont les prochaines étapes ?',
          'Y a-t-il des risques à surveiller ?',
          'Peux-tu m\'expliquer plus en détail ?'
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Désolé, je rencontre des difficultés techniques. Veuillez réessayer plus tard.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
      setIsTyping(false);
    }
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