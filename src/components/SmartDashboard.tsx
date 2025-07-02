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
import { useLanguage } from '../context/LanguageContext';

const SmartDashboard: React.FC = () => {
  const { state } = useAppContext();
  const { projects, tasks, users } = state;
  const { isAvailable, isLoading: aiLoading, generateResponse } = useAI();
  const { t, language } = useLanguage();
  
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

        const dashboardPrompt = language === 'fr' 
          ? `Analysez ce contexte de projet et générez des insights pour le dashboard IA au format JSON:
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
        
        Générez 3 insights pertinents avec des couleurs Tailwind (from-color-500 to-color-600).`
          : `Analyze this project context and generate insights for the AI dashboard in JSON format:
        {
          "insights": [
            {
              "id": number,
              "type": "performance|prediction|optimization|risk",
              "title": "Title",
              "description": "Description",
              "confidence": number,
              "impact": "high|medium|low",
              "color": "gradient_class"
            }
          ]
        }
        
        Context: ${JSON.stringify(projectContext)}
        
        Generate 3 relevant insights with Tailwind colors (from-color-500 to-color-600).`;

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
        title: `${t.team.performance}: ${completionRate}%`,
        description: language === 'fr' 
          ? `L'équipe maintient un taux de réussite de ${completionRate}% sur ${totalTasks} tâches`
          : `Team maintains a ${completionRate}% success rate on ${totalTasks} tasks`,
        confidence: 94,
        impact: 'high',
        icon: TrendingUp,
        color: 'from-emerald-500 to-teal-600'
      },
      {
        id: 2,
        type: 'prediction',
        title: t.ai.predictiveAnalysis,
        description: language === 'fr'
          ? `${projects.length} projets surveillés, prédictions en temps réel`
          : `${projects.length} projects monitored, real-time predictions`,
        confidence: 87,
        impact: 'medium',
        icon: AlertTriangle,
        color: 'from-orange-500 to-red-500'
      },
      {
        id: 3,
        type: 'optimization',
        title: t.ai.optimization,
        description: language === 'fr'
          ? `Surveillance de ${users.length} membres, suggestions d'amélioration disponibles`
          : `Monitoring ${users.length} members, improvement suggestions available`,
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
      { month: language === 'fr' ? 'Jan' : 'Jan', actual: 85, predicted: 88, optimal: 92 },
      { month: language === 'fr' ? 'Fév' : 'Feb', actual: 89, predicted: 91, optimal: 94 },
      { month: language === 'fr' ? 'Mar' : 'Mar', actual: 92, predicted: 94, optimal: 96 },
      { month: language === 'fr' ? 'Avr' : 'Apr', actual: 87, predicted: 95, optimal: 97 },
      { month: language === 'fr' ? 'Mai' : 'May', actual: 94, predicted: 96, optimal: 98 },
      { month: language === 'fr' ? 'Juin' : 'Jun', actual: null, predicted: 97, optimal: 99 }
    ];
    setPredictiveData(data);
  };

  const generateSmartAlerts = async () => {
    setIsAnalyzing(true);
    
    try {
      if (isAvailable) {
        const completionRate = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);
        const overdueTasks = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
        const activeProjects = projects.filter(p => p.status === 'in-progress').length;
        const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
        const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length);

        const alertPrompt = language === 'fr'
          ? `En tant qu'expert en gestion de projet, analysez ces données et générez 4 alertes intelligentes RÉELLES au format JSON:

        **DONNÉES ACTUELLES:**
        - Taux de completion: ${completionRate}%
        - Tâches en retard: ${overdueTasks}
        - Projets actifs: ${activeProjects}
        - Budget total: $${totalBudget.toLocaleString()}
        - Progression moyenne: ${avgProgress}%
        - Équipe: ${users.length} membres

        **FORMAT REQUIS:**
        {
          "alerts": [
            {
              "id": 1,
              "type": "critical|opportunity|prediction|warning",
              "title": "Titre spécifique avec chiffres",
              "message": "Message détaillé basé sur les vraies données",
              "action": "Action concrète et réalisable",
              "urgency": "high|medium|low"
            }
          ]
        }

        **INSTRUCTIONS:**
        1. Générez EXACTEMENT 4 alertes différentes
        2. Basez-vous sur les VRAIES données fournies
        3. Variez les types: critical, opportunity, prediction, warning
        4. Donnez des actions CONCRÈTES et RÉALISABLES
        5. Calculez l'urgence selon l'impact réel`
          : `As a project management expert, analyze this data and generate 4 REAL intelligent alerts in JSON format:

        **CURRENT DATA:**
        - Completion rate: ${completionRate}%
        - Overdue tasks: ${overdueTasks}
        - Active projects: ${activeProjects}
        - Total budget: $${totalBudget.toLocaleString()}
        - Average progress: ${avgProgress}%
        - Team: ${users.length} members

        **REQUIRED FORMAT:**
        {
          "alerts": [
            {
              "id": 1,
              "type": "critical|opportunity|prediction|warning",
              "title": "Specific title with numbers",
              "message": "Detailed message based on real data",
              "action": "Concrete and actionable step",
              "urgency": "high|medium|low"
            }
          ]
        }

        **INSTRUCTIONS:**
        1. Generate EXACTLY 4 different alerts
        2. Base on the REAL data provided
        3. Vary types: critical, opportunity, prediction, warning
        4. Provide CONCRETE and ACTIONABLE steps
        5. Calculate urgency based on real impact`;

        const aiResponse = await generateResponse(alertPrompt);
        console.log('AI Alerts Response:', aiResponse);
        
        try {
          const parsedResponse = JSON.parse(aiResponse);
          if (parsedResponse.alerts && Array.isArray(parsedResponse.alerts)) {
            const enrichedAlerts = parsedResponse.alerts.map((alert: any) => ({
              ...alert,
              generatedByAI: true,
              generatedAt: new Date().toISOString()
            }));
            
            setSmartAlerts(enrichedAlerts);
            console.log(`✅ ${enrichedAlerts.length} ${language === 'fr' ? 'alertes IA générées' : 'AI alerts generated'}`);
            return;
          }
        } catch (parseError) {
          console.error('Failed to parse AI alerts, using fallback:', parseError);
        }
      }
    } catch (error) {
      console.error('AI alerts generation failed:', error);
    }
    
    // Fallback basé sur les vraies données
    generateStaticAlerts();
    
  };

  const generateStaticAlerts = () => {
    const overdueTasks = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
    const completionRate = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);
    const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
    const budgetConcern = projects.some(p => p.budget > 75000);
    
    const alerts = [
      {
        id: 1,
        type: overdueTasks > 2 ? 'critical' : overdueTasks > 0 ? 'warning' : 'opportunity',
        title: overdueTasks > 0 
          ? (language === 'fr' ? `${overdueTasks} Tâche(s) en Retard Critique` : `${overdueTasks} Critical Overdue Tasks`)
          : (language === 'fr' ? `Performance Excellente: ${completionRate}%` : `Excellent Performance: ${completionRate}%`),
        message: overdueTasks > 0 
          ? (language === 'fr' 
              ? `${overdueTasks} tâches dépassent leur deadline et nécessitent une attention immédiate`
              : `${overdueTasks} tasks exceed their deadline and require immediate attention`)
          : (language === 'fr'
              ? `Équipe performante avec ${completionRate}% de taux de réussite`
              : `High-performing team with ${completionRate}% success rate`),
        action: overdueTasks > 0 
          ? (language === 'fr' ? 'Reprioriser immédiatement' : 'Reprioritize immediately')
          : (language === 'fr' ? 'Maintenir le cap' : 'Stay on track'),
        urgency: overdueTasks > 2 ? 'high' : overdueTasks > 0 ? 'medium' : 'low',
        generatedByAI: false
      },
      {
        id: 2,
        type: highPriorityTasks > 3 ? 'warning' : 'opportunity',
        title: language === 'fr'
          ? `Charge Critique: ${highPriorityTasks} Tâches Haute Priorité`
          : `Critical Load: ${highPriorityTasks} High Priority Tasks`,
        message: language === 'fr'
          ? `${highPriorityTasks} tâches haute priorité en attente. ${highPriorityTasks > 3 ? 'Risque de surcharge' : 'Charge maîtrisée'}`
          : `${highPriorityTasks} high priority tasks pending. ${highPriorityTasks > 3 ? 'Overload risk' : 'Manageable load'}`,
        action: highPriorityTasks > 3 
          ? (language === 'fr' ? 'Redistribuer la charge' : 'Redistribute workload')
          : (language === 'fr' ? 'Optimiser l\'efficacité' : 'Optimize efficiency'),
        urgency: highPriorityTasks > 3 ? 'high' : 'medium',
        generatedByAI: false
      },
      {
        id: 3,
        type: budgetConcern ? 'warning' : 'prediction',
        title: budgetConcern 
          ? (language === 'fr' ? 'Surveillance Budget Critique' : 'Critical Budget Monitoring')
          : (language === 'fr' ? 'Prédiction Budgétaire Positive' : 'Positive Budget Forecast'),
        message: budgetConcern 
          ? (language === 'fr'
              ? 'Projets à gros budget détectés, surveillance renforcée recommandée'
              : 'High-budget projects detected, enhanced monitoring recommended')
          : (language === 'fr'
              ? 'Allocation budgétaire équilibrée, projections favorables'
              : 'Balanced budget allocation, favorable projections'),
        action: budgetConcern 
          ? (language === 'fr' ? 'Réviser allocations' : 'Review allocations')
          : (language === 'fr' ? 'Maintenir stratégie' : 'Maintain strategy'),
        urgency: budgetConcern ? 'medium' : 'low',
        generatedByAI: false
      },
      {
        id: 4,
        type: 'prediction',
        title: language === 'fr'
          ? `Prédiction Sprint: Livraison ${completionRate > 80 ? 'En Avance' : 'Surveillée'}`
          : `Sprint Prediction: Delivery ${completionRate > 80 ? 'Ahead' : 'Monitored'}`,
        message: language === 'fr'
          ? `Basé sur le taux actuel de ${completionRate}%, ${completionRate > 80 ? 'livraison anticipée probable' : 'attention requise pour respecter les délais'}`
          : `Based on current rate of ${completionRate}%, ${completionRate > 80 ? 'early delivery likely' : 'attention required to meet deadlines'}`,
        action: completionRate > 80 
          ? (language === 'fr' ? 'Planifier le prochain sprint' : 'Plan next sprint')
          : (language === 'fr' ? 'Intensifier le suivi' : 'Intensify monitoring'),
        urgency: 'low',
        generatedByAI: false
      }
    ];
    
    setSmartAlerts(alerts);
    setIsAnalyzing(false);
  };

  // Calcul des métriques IA réelles basées sur les données
  const calculateAIMetrics = () => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionRate = Math.round((completedTasks / totalTasks) * 100);
    
    const overdueTasks = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
    const onTimeRate = Math.round(((totalTasks - overdueTasks) / totalTasks) * 100);
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const avgBudgetPerProject = Math.round(totalBudget / projects.length);
    
    const highPerformanceUsers = users.filter(u => u.performance > 90).length;
    const teamEfficiency = Math.round((highPerformanceUsers / users.length) * 100);
    
    return [
      {
        title: t.ai.globalScore,
        value: completionRate.toString(),
        unit: '%',
        change: completionRate > 80 ? '+' + (completionRate - 75) : '-' + (80 - completionRate),
        icon: Brain,
        color: completionRate > 80 ? 'from-emerald-500 to-emerald-600' : 'from-orange-500 to-red-500',
        description: language === 'fr' 
          ? `${completedTasks}/${totalTasks} tâches terminées`
          : `${completedTasks}/${totalTasks} tasks completed`
      },
      {
        title: t.ai.onTimeDelivery,
        value: onTimeRate.toString(),
        unit: '%',
        change: overdueTasks === 0 ? '+100' : '-' + (overdueTasks * 5),
        icon: Target,
        color: overdueTasks === 0 ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-500',
        description: language === 'fr'
          ? `${overdueTasks} tâche(s) en retard`
          : `${overdueTasks} overdue task(s)`
      },
      {
        title: t.ai.teamEfficiency,
        value: teamEfficiency.toString(),
        unit: '%',
        change: teamEfficiency > 75 ? '+' + (teamEfficiency - 70) : '-' + (75 - teamEfficiency),
        icon: Zap,
        color: teamEfficiency > 75 ? 'from-blue-500 to-purple-600' : 'from-yellow-500 to-orange-500',
        description: language === 'fr'
          ? `${highPerformanceUsers}/${users.length} top performers`
          : `${highPerformanceUsers}/${users.length} top performers`
      },
      {
        title: t.ai.averageBudget,
        value: (avgBudgetPerProject / 1000).toFixed(0),
        unit: 'k$',
        change: avgBudgetPerProject > 50000 ? '+15' : '-5',
        icon: DollarSign,
        color: 'from-emerald-500 to-teal-600',
        description: language === 'fr'
          ? `${projects.length} projets actifs`
          : `${projects.length} active projects`
      }
    ];
  };

  const aiMetrics = calculateAIMetrics();

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
              <h1 className="text-3xl font-bold">{t.ai.smartDashboard}</h1>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-purple-100">{language === 'fr' ? 'Analyse prédictive en temps réel • Optimisation automatique • Insights avancés' : 'Real-time predictive analysis • Automatic optimization • Advanced insights'}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-sm text-purple-200">{t.ai.aiScore}</div>
            {!isAvailable && (
              <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mt-1">
                {t.ai.fallbackMode}
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
                      <div className="text-xs text-slate-500">{t.ai.confidence} AI:</div>
                      <div className="text-sm font-medium text-slate-900">{insight.confidence}%</div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                      {t.ai.viewDetails}
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
            <span>{t.ai.smartAlerts}</span>
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            {t.ai.seeAll}
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
              <span>{t.ai.predictiveAnalysis}</span>
            </h3>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{language === 'fr' ? 'Réel' : 'Actual'}</span>
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>{language === 'fr' ? 'Prédit' : 'Predicted'}</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>{language === 'fr' ? 'Optimal' : 'Optimal'}</span>
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
              <span>{language === 'fr' ? 'Performance IA Équipe' : 'AI Team Performance'}</span>
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              {t.common.optimize}
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="performance" fill="#3b82f6" name={language === 'fr' ? 'Actuel' : 'Current'} />
                <Bar dataKey="predicted" fill="#8b5cf6" name={language === 'fr' ? 'Prédit' : 'Predicted'} />
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
            <span>{language === 'fr' ? 'Matrice de Santé des Projets (IA)' : 'Project Health Matrix (AI)'}</span>
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span>{language === 'fr' ? 'Excellent' : 'Excellent'}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span>{language === 'fr' ? 'À surveiller' : 'Monitor'}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>{language === 'fr' ? 'Critique' : 'Critical'}</span>
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
                  <span className="text-slate-600">{language === 'fr' ? 'Santé:' : 'Health:'}</span>
                  <span className="font-medium">{project.health}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{language === 'fr' ? 'Risque IA:' : 'AI Risk:'}</span>
                  <span className="font-medium">{Math.round(project.risk)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{language === 'fr' ? 'Valeur:' : 'Value:'}</span>
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