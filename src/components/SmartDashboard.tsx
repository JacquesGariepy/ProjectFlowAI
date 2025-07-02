import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Target, 
  Users, 
  Calendar,
  DollarSign,
  Activity,
  Sparkles,
  Eye,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, Tooltip, Legend, LineChart as RechartsLineChart, Line } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { useAI } from '../hooks/useAI';

const SmartDashboard: React.FC = () => {
  const { state } = useAppContext();
  const { projects, tasks, users } = state;
  const { isAvailable, isLoading: aiLoading, generateResponse } = useAI();
  
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [predictiveData, setPredictiveData] = useState<any[]>([]);
  const [smartAlerts, setSmartAlerts] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate AI analysis
    generateAIInsights();
    generatePredictiveData();
    generateSmartAlerts();
  }, [projects, tasks, users]);

  const generateAIInsights = async () => {
    setIsAnalyzing(true);
    
    try {
      if (isAvailable) {
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

        const dashboardPrompt = `Analysez ce contexte de projet et générez des insights pour le dashboard IA au format JSON:
        {
          "insights": [
            {
              "id": number,
              "type": "performance|prediction|optimization|risk",
              "title": "Titre",
              "description": "Description",
              "confidence": number,
              "impact": "high|medium|low",
              "color": "gradient_class"
            }
          ]
        }
        
        Contexte: ${JSON.stringify(projectContext)}
        
        Générez 3 insights pertinents avec des couleurs Tailwind (from-color-500 to-color-600).`;

        const aiResponse = await generateResponse(dashboardPrompt);
        
        try {
          const parsedResponse = JSON.parse(aiResponse);
          if (parsedResponse.insights) {
            const insightsWithIcons = parsedResponse.insights.map((insight: any) => ({
              ...insight,
              icon: getIconForType(insight.type)
            }));
            setAiInsights(insightsWithIcons);
          } else {
            generateStaticInsights();
          }
        } catch (parseError) {
          generateStaticInsights();
        }
      } else {
        generateStaticInsights();
      }
    } catch (error) {
      console.error('AI insights generation failed:', error);
      generateStaticInsights();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'performance': return TrendingUp;
      case 'prediction': return Target;
      case 'optimization': return Zap;
      case 'risk': return AlertTriangle;
      default: return Brain;
    }
  };

  const generateStaticInsights = () => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionRate = Math.round((completedTasks / totalTasks) * 100);
    
    const insights = [
      {
        id: 1,
        type: 'performance',
        title: `Performance Équipe: ${completionRate}%`,
        description: `L'équipe maintient un taux de réussite de ${completionRate}% sur ${totalTasks} tâches`,
        confidence: 94,
        impact: 'high',
        icon: TrendingUp,
        color: 'from-emerald-500 to-teal-600'
      },
      {
        id: 2,
        type: 'prediction',
        title: 'Analyse Prédictive Active',
        description: `${projects.length} projets surveillés, prédictions en temps réel`,
        confidence: 87,
        impact: 'medium',
        icon: AlertTriangle,
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 3,
        type: 'optimization',
        title: 'Optimisation Continue',
        description: `Surveillance de ${users.length} membres, suggestions d'amélioration disponibles`,
        confidence: 91,
        impact: 'high',
        icon: Zap,
        color: 'from-purple-500 to-pink-500'
      }
    ];
    setAiInsights(insights);
  };

  const generatePredictiveData = () => {
    const data = [
      { month: 'Jan', actual: 85, predicted: 88, optimal: 92 },
      { month: 'Fév', actual: 89, predicted: 91, optimal: 94 },
      { month: 'Mar', actual: 92, predicted: 94, optimal: 96 },
      { month: 'Avr', actual: 87, predicted: 95, optimal: 97 },
      { month: 'Mai', actual: 94, predicted: 96, optimal: 98 },
      { month: 'Juin', actual: null, predicted: 97, optimal: 99 }
    ];
    setPredictiveData(data);
  };

  const generateSmartAlerts = () => {
    const alerts = [
      {
        id: 1,
        type: 'critical',
        title: 'Budget Critique',
        message: 'Projet Analytics: 95% du budget utilisé',
        action: 'Réviser le budget',
        urgency: 'high'
      },
      {
        id: 2,
        type: 'opportunity',
        title: 'Opportunité Détectée',
        message: 'Emily Davis disponible pour nouveau projet',
        action: 'Assigner des tâches',
        urgency: 'medium'
      },
      {
        id: 3,
        type: 'prediction',
        title: 'Prédiction IA',
        message: 'Sprint actuel: livraison 2 jours en avance',
        action: 'Planifier le suivant',
        urgency: 'low'
      }
    ];
    setSmartAlerts(alerts);
  };

  const aiMetrics = [
    {
      title: 'Score IA Global',
      value: '94.2',
      unit: '/100',
      change: '+5.2',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      description: 'Performance globale optimisée par IA'
    },
    {
      title: 'Prédiction Précision',
      value: '87.5',
      unit: '%',
      change: '+2.1',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      description: 'Précision des prédictions IA'
    },
    {
      title: 'Efficacité Optimisée',
      value: '+23.4',
      unit: '%',
      change: '+8.2',
      icon: Zap,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Amélioration grâce à l\'IA'
    },
    {
      title: 'ROI Intelligent',
      value: '156',
      unit: '%',
      change: '+12.3',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      description: 'Retour sur investissement IA'
    }
  ];

  const teamPerformanceData = users.map(user => ({
    name: user.name.split(' ')[0],
    performance: user.performance,
    predicted: Math.min(100, user.performance + Math.random() * 10),
    efficiency: Math.random() * 100
  }));

  const projectHealthData = projects.map(project => ({
    name: project.name.substring(0, 15) + '...',
    health: project.progress,
    risk: Math.random() * 100,
    value: project.budget / 1000
  }));

  return (
    <div className="space-y-6">
      {/* AI Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Dashboard IA Intelligent</h1>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-purple-100">Analyse prédictive en temps réel • Optimisation automatique • Insights avancés</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-sm text-purple-200">Score IA Global</div>
            {!isAvailable && (
              <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mt-1">
                Mode Dégradé
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {metric.value}<span className="text-sm text-slate-500">{metric.unit}</span>
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">{metric.change}</div>
                </div>
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">{metric.title}</h3>
              <p className="text-xs text-slate-600">{metric.description}</p>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {aiInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div key={insight.id} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${insight.color} flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{insight.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-slate-500">Confiance IA:</div>
                      <div className="text-sm font-medium text-slate-900">{insight.confidence}%</div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      Voir détails
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Smart Alerts */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <span>Alertes Intelligentes</span>
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Voir toutes
          </button>
        </div>
        
        <div className="space-y-4">
          {smartAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.urgency === 'high' ? 'border-red-500 bg-red-50' :
              alert.urgency === 'medium' ? 'border-orange-500 bg-orange-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">{alert.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
                </div>
                <button className={`px-3 py-1 rounded-lg text-xs font-medium ${
                  alert.urgency === 'high' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                  alert.urgency === 'medium' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                  'bg-blue-100 text-blue-700 hover:bg-blue-200'
                } transition-colors`}>
                  {alert.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictive Performance */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <LineChart className="w-5 h-5 text-purple-500" />
              <span>Analyse Prédictive</span>
            </h3>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Réel</span>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Prédit</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>Optimal</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={predictiveData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: '#8b5cf6' }} />
                <Line type="monotone" dataKey="optimal" stroke="#10b981" strokeWidth={2} strokeDasharray="2 2" dot={{ fill: '#10b981' }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Performance AI */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span>Performance IA Équipe</span>
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Optimiser
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="performance" fill="#3b82f6" name="Actuel" />
                <Bar dataKey="predicted" fill="#8b5cf6" name="Prédit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Project Health Matrix */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            <span>Matrice de Santé des Projets (IA)</span>
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>Excellent</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>À surveiller</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Critique</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectHealthData.map((project, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-900">{project.name}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  project.health > 80 ? 'bg-emerald-500' :
                  project.health > 60 ? 'bg-orange-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Santé:</span>
                  <span className="font-medium">{project.health}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Risque IA:</span>
                  <span className="font-medium">{Math.round(project.risk)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Valeur:</span>
                  <span className="font-medium">${project.value}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartDashboard;