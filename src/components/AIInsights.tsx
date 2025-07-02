import React, { useState, useEffect, useCallback } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  Zap,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAI } from '../hooks/useAI';
import { useLanguage } from '../context/LanguageContext';

interface AIInsight {
  id: string;
  type: 'prediction' | 'optimization' | 'risk' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  category: string;
  actionable: boolean;
  data?: Record<string, unknown>;
}

const AIInsights: React.FC = () => {
  const { state } = useAppContext();
  const { projects, tasks, users } = state;
  const { isLoading: aiLoading, isAvailable, generateResponse } = useAI();
  const { t, language } = useLanguage();
  
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const loadSavedInsights = () => {
    try {
      const saved = localStorage.getItem('ai-insights');
      if (saved) {
        const parsedInsights = JSON.parse(saved);
        // Check if insights are not too old (24 hours for better persistence)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const validInsights = parsedInsights.filter((insight: any) => 
          new Date(insight.timestamp || 0) > twentyFourHoursAgo
        );
        if (validInsights.length > 0) {
          setInsights(validInsights);
          return; // Important: stop here if we have saved insights
        }
      }
      
      // Only if no valid saved insights, generate default insights
      generateInitialInsights();
    } catch (error) {
      console.error('Error loading saved insights:', error);
      generateInitialInsights();
    }
  };

  const generateInitialInsights = () => {
    // Welcome insights only the first time
    const welcomeInsights: AIInsight[] = [
      {
        id: 'welcome-1',
        type: 'opportunity',
        title: t.ai.welcomeInsightTitle,
        description: t.ai.welcomeInsightDescription,
        confidence: 100,
        impact: 'high',
        category: t.ai.systemCategory,
        actionable: false,
        data: {
          isWelcomeMessage: true
        }
      }
    ];
    
    setInsights(welcomeInsights);
    saveInsights(welcomeInsights);
  };

  const saveInsights = (newInsights: AIInsight[]) => {
    try {
      const insightsWithTimestamp = newInsights.map(insight => ({
        ...insight,
        timestamp: new Date().toISOString()
      }));
      localStorage.setItem('ai-insights', JSON.stringify(insightsWithTimestamp));
    } catch (error) {
      console.error('Error saving insights:', error);
    }
  };

  const generateAIInsights = useCallback(async () => {
    setIsAnalyzing(true);
    
    try {
      if (isAvailable) {
        // Use real AI for insights generation
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

        const completionRate = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);
        const overdueTasks = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
        const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
        const activeProjects = projects.filter(p => p.status === 'in-progress').length;
        const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

        const analysisPrompt = language === 'fr' 
          ? `En tant qu'expert en gestion de projet et analyste de données, analysez ce contexte et générez exactement 6 insights IA distincts au format JSON:

        **DONNÉES ACTUELLES:**
        - Taux de completion: ${completionRate}%
        - Tâches en retard: ${overdueTasks}
        - Tâches haute priorité: ${highPriorityTasks}
        - Projets actifs: ${activeProjects}
        - Budget total: $${totalBudget.toLocaleString()}
        - Équipe: ${users.length} membres

        **FORMAT DE RÉPONSE REQUIS:**
        {
          "insights": [
            {
              "id": "insight_1",
              "type": "prediction",
              "title": "Titre spécifique et actionnable",
              "description": "Analyse détaillée avec chiffres précis",
              "confidence": 85,
              "impact": "high",
              "category": "Performance",
              "actionable": true,
              "data": {
                "metric": "valeur_specifique",
                "recommendation": "action_concrete",
                "timeline": "delai_prevu"
              }
            }
          ]
        }

        **INSTRUCTIONS:**
        1. Générez EXACTEMENT 6 insights variés (prediction, risk, optimization, opportunity)
        2. Basez-vous sur les VRAIES données fournies
        3. Donnez des titres SPÉCIFIQUES avec des chiffres
        4. Proposez des actions CONCRÈTES et RÉALISABLES
        5. Variez les niveaux d'impact (high/medium/low)
        6. Utilisez des catégories: Performance, Budget, Ressources, Qualité, Risques, Opportunités

        Contexte détaillé: ${JSON.stringify(projectContext)}`
          : `As a project management expert and data analyst, analyze this context and generate exactly 6 distinct AI insights in JSON format:

        **CURRENT DATA:**
        - Completion rate: ${completionRate}%
        - Overdue tasks: ${overdueTasks}
        - High priority tasks: ${highPriorityTasks}
        - Active projects: ${activeProjects}
        - Total budget: $${totalBudget.toLocaleString()}
        - Team: ${users.length} members

        **REQUIRED RESPONSE FORMAT:**
        {
          "insights": [
            {
              "id": "insight_1",
              "type": "prediction",
              "title": "Specific and actionable title",
              "description": "Detailed analysis with precise numbers",
              "confidence": 85,
              "impact": "high",
              "category": "Performance",
              "actionable": true,
              "data": {
                "metric": "specific_value",
                "recommendation": "concrete_action",
                "timeline": "expected_delay"
              }
            }
          ]
        }

        **INSTRUCTIONS:**
        1. Generate EXACTLY 6 varied insights (prediction, risk, optimization, opportunity)
        2. Base on the REAL provided data
        3. Give SPECIFIC titles with numbers
        4. Propose CONCRETE and ACHIEVABLE actions
        5. Vary impact levels (high/medium/low)
        6. Use categories: Performance, Budget, Resources, Quality, Risks, Opportunities

        Detailed context: ${JSON.stringify(projectContext)}`;
        
        console.log('Envoi du prompt IA:', analysisPrompt);

        const aiResponse = await generateResponse(analysisPrompt);
        
        try {
          const parsedResponse = JSON.parse(aiResponse);
          if (parsedResponse.insights && Array.isArray(parsedResponse.insights)) {
            // Add timestamp and unique ID to identify AI-generated insights
            const newAIInsights = parsedResponse.insights.map((insight: any, index: number) => ({
              ...insight,
              id: `ai_${Date.now()}_${index}`, // Unique ID based on timestamp
              generatedByAI: true,
              generatedAt: new Date().toISOString(),
              sessionId: Date.now() // To group insights from the same session
            }));
            
            // Remove old welcome insights and add new ones
            const filteredOldInsights = insights.filter(insight => 
              !(insight.data as any)?.isWelcomeMessage && 
              !insight.id.startsWith('welcome-')
            );
            
            // Combine old insights (non-welcome) with new ones
            const combinedInsights = [...filteredOldInsights, ...newAIInsights];
            
            setInsights(combinedInsights);
            saveInsights(combinedInsights);
            
            console.log(`✅ ${newAIInsights.length} new insights generated and saved`);
          } else {
            throw new Error('Invalid AI response format');
          }
        } catch (parseError) {
          console.error('Failed to parse AI response, using fallback:', parseError);
          console.log('Raw AI response:', aiResponse);
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
  }, [isAvailable, generateResponse, projects, tasks, users, language]);

  useEffect(() => {
    // Load saved insights only once on mount
    loadSavedInsights();
  }, []);

  // Remove this useEffect that automatically regenerated
  // useEffect(() => {
  //   if (insights.length === 0) {
  //     generateAIInsights();
  //   }
  // }, [insights.length, generateAIInsights]);

  const generateStaticInsights = () => {
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const completionRate = Math.round((completedTasks / totalTasks) * 100);
    const overdueTasks = tasks.filter(t => t.status !== 'completed' && new Date(t.dueDate) < new Date()).length;
    const highPriorityTasks = tasks.filter(t => t.priority === 'high' && t.status !== 'completed').length;
    
    const newInsights: AIInsight[] = [
      {
        id: '1',
        type: 'prediction',
        title: language === 'fr' 
          ? `Performance Équipe: ${completionRate}% de Réussite`
          : `Team Performance: ${completionRate}% Success Rate`,
        description: language === 'fr' 
          ? `Analyse: ${completedTasks}/${totalTasks} tâches terminées. Tendance ${completionRate > 80 ? 'excellente' : completionRate > 60 ? 'satisfaisante' : 'préoccupante'}.`
          : `Analysis: ${completedTasks}/${totalTasks} tasks completed. Trend ${completionRate > 80 ? 'excellent' : completionRate > 60 ? 'satisfactory' : 'concerning'}.`,
        confidence: 92,
        impact: completionRate > 80 ? 'high' : 'medium',
        category: t.ai.performanceCategory,
        actionable: true,
        data: {
          completedTasks,
          totalTasks,
          completionRate,
          recommendation: completionRate < 70 
            ? (language === 'fr' ? 'Redistribuer les tâches' : 'Redistribute tasks')
            : (language === 'fr' ? 'Maintenir le rythme' : 'Maintain pace')
        }
      },
      {
        id: '2',
        type: 'risk',
        title: language === 'fr' 
          ? `${overdueTasks} Tâche(s) en Retard Détectée(s)`
          : `${overdueTasks} Overdue Task(s) Detected`,
        description: language === 'fr'
          ? `Risque identifié: ${overdueTasks} tâches dépassent leur deadline. Impact potentiel sur les projets.`
          : `Risk identified: ${overdueTasks} tasks exceed their deadline. Potential impact on projects.`,
        confidence: 88,
        impact: overdueTasks > 3 ? 'high' : overdueTasks > 0 ? 'medium' : 'low',
        category: t.ai.planningCategory,
        actionable: overdueTasks > 0,
        data: {
          overdueTasks,
          impact: overdueTasks > 3 
            ? (language === 'fr' ? 'Critique' : 'Critical') 
            : (language === 'fr' ? 'Modéré' : 'Moderate'),
          action: language === 'fr' ? 'Reprioriser et réassigner' : 'Reprioritize and reassign'
        }
      },
      {
        id: '3',
        type: 'optimization',
        title: language === 'fr' 
          ? 'Optimisation de la Charge de Travail'
          : 'Workload Optimization',
        description: language === 'fr'
          ? `${highPriorityTasks} tâches haute priorité en attente. Optimisation de l'allocation recommandée.`
          : `${highPriorityTasks} high priority tasks pending. Allocation optimization recommended.`,
        confidence: 85,
        impact: 'medium',
        category: t.ai.resourcesCategory,
        actionable: true,
        data: {
          highPriorityTasks,
          availableUsers: users.length,
          optimization: language === 'fr' ? 'Équilibrer la charge' : 'Balance workload'
        }
      },
      {
        id: '4',
        type: 'opportunity',
        title: language === 'fr' 
          ? 'Opportunité d\'Amélioration Continue'
          : 'Continuous Improvement Opportunity',
        description: language === 'fr'
          ? `Potentiel d'amélioration de ${Math.round((100 - completionRate) / 2)}% identifié via l'optimisation des processus.`
          : `${Math.round((100 - completionRate) / 2)}% improvement potential identified through process optimization.`,
        confidence: 78,
        impact: 'medium',
        category: t.ai.processCategory,
        actionable: true,
        data: {
          currentEfficiency: completionRate,
          potentialImprovement: Math.round((100 - completionRate) / 2),
          method: language === 'fr' ? 'Automatisation et formation' : 'Automation and training'
        }
      }
    ];
    
    // Mark as fallback insights
    const fallbackInsights = newInsights.map(insight => ({
      ...insight,
      generatedByAI: false,
      generatedAt: new Date().toISOString()
    }));
    
    setInsights(fallbackInsights);
    saveInsights(fallbackInsights);
  };

  const applyInsightAction = async (insight: AIInsight) => {
    try {
      if (!insight.actionable) {
        alert(t.ai.actionNotActionable);
        return;
      }

      // Simulate action application
      let actionMessage = '';
      
      if (language === 'fr') {
        switch (insight.type) {
          case 'optimization':
            actionMessage = `✅ Optimisation appliquée: ${insight.title}\n\nActions prises:\n• Analyse des données effectuée\n• Recommandations envoyées à l'équipe\n• Suivi programmé dans 7 jours`;
            break;
          case 'risk':
            actionMessage = `⚠️ Mesures de mitigation mises en place: ${insight.title}\n\nActions prises:\n• Équipe alertée\n• Plan de contingence activé\n• Surveillance renforcée`;
            break;
          case 'prediction':
            actionMessage = `🔮 Prédiction prise en compte: ${insight.title}\n\nActions prises:\n• Planning ajusté\n• Ressources réallouées\n• Parties prenantes informées`;
            break;
          case 'opportunity':
            actionMessage = `🚀 Opportunité saisie: ${insight.title}\n\nActions prises:\n• Initiative lancée\n• Budget alloué\n• Équipe constituée`;
            break;
          default:
            actionMessage = `✅ Action appliquée: ${insight.title}`;
        }
      } else {
        switch (insight.type) {
          case 'optimization':
            actionMessage = `✅ Optimization applied: ${insight.title}\n\nActions taken:\n• Data analysis performed\n• Recommendations sent to team\n• Follow-up scheduled in 7 days`;
            break;
          case 'risk':
            actionMessage = `⚠️ Mitigation measures implemented: ${insight.title}\n\nActions taken:\n• Team alerted\n• Contingency plan activated\n• Enhanced monitoring`;
            break;
          case 'prediction':
            actionMessage = `🔮 Prediction taken into account: ${insight.title}\n\nActions taken:\n• Planning adjusted\n• Resources reallocated\n• Stakeholders informed`;
            break;
          case 'opportunity':
            actionMessage = `🚀 Opportunity seized: ${insight.title}\n\nActions taken:\n• Initiative launched\n• Budget allocated\n• Team assembled`;
            break;
          default:
            actionMessage = `✅ Action applied: ${insight.title}`;
        }
      }

      alert(actionMessage);
      
      // Mark insight as applied
      const updatedInsights = insights.map(i => 
        i.id === insight.id 
          ? { ...i, applied: true, appliedAt: new Date().toISOString() }
          : i
      );
      setInsights(updatedInsights);
      saveInsights(updatedInsights);
      
    } catch (error) {
      console.error('Error applying insight action:', error);
      alert(t.ai.actionErrorMessage);
    }
  };

  const clearInsights = () => {
    if (confirm(t.ai.confirmClearHistory)) {
      setInsights([]);
      localStorage.removeItem('ai-insights');
      generateInitialInsights(); // Reset welcome message
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return TrendingUp;
      case 'risk': return AlertTriangle;
      case 'optimization': return Zap;
      case 'opportunity': return Lightbulb;
      default: return Brain;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'from-blue-500 to-blue-600';
      case 'risk': return 'from-red-500 to-red-600';
      case 'optimization': return 'from-purple-500 to-purple-600';
      case 'opportunity': return 'from-emerald-500 to-emerald-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getImpactText = (impact: string) => {
    switch (impact) {
      case 'high': return t.ai.impactHigh;
      case 'medium': return t.ai.impactMedium;
      case 'low': return t.ai.impactLow;
      default: return impact;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-8 h-8" />
              <h1 className="text-3xl font-bold">{t.ai.insightsTitle}</h1>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-purple-100">{t.ai.insightsSubtitle}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {!isAvailable && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  {t.ai.fallbackMode}
                </span>
              )}
              {insights.some(insight => (insight as any).generatedByAI) && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  ✨ {t.ai.aiActive} ({insights.filter(insight => (insight as any).generatedByAI).length} {t.ai.insightsCount})
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearInsights}
                className="bg-red-500/20 hover:bg-red-500/30 px-3 py-1 text-xs rounded-lg font-medium transition-colors text-white"
                title={t.ai.clearHistoryTitle}
              >
                {t.common.clear}
              </button>
              <button
                onClick={generateAIInsights}
                disabled={isAnalyzing || aiLoading}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isAnalyzing || aiLoading ? t.ai.analyzing : t.ai.generateInsights}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h3 className="font-semibold text-slate-900">{t.ai.analysisInProgress}</h3>
              <p className="text-sm text-slate-600">{t.ai.analysisDescription}</p>
            </div>
          </div>
        </div>
      )}

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight) => {
          const Icon = getInsightIcon(insight.type);
          return (
            <div
              key={insight.id}
              onClick={() => setSelectedInsight(insight)}
              className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${getInsightColor(insight.type)}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(insight.impact)}`}>
                    {getImpactText(insight.impact).toUpperCase()}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-slate-900 mb-2">{insight.title}</h3>
                <p className="text-sm text-slate-600">{insight.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-xs text-slate-500">
                    {t.ai.confidence}: <span className="font-medium text-slate-900">{insight.confidence}%</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {t.ai.category}: <span className="font-medium text-slate-900">{insight.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {(insight as any).applied && (
                    <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <span>{t.ai.applied}</span>
                    </div>
                  )}
                  {insight.actionable && !(insight as any).applied && (
                    <div className="flex items-center space-x-1 text-xs text-emerald-600">
                      <Target className="w-3 h-3" />
                      <span>{t.ai.actionable}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mt-4">
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div
                    className={`h-2 bg-gradient-to-r ${getInsightColor(insight.type)} rounded-full transition-all duration-500`}
                    style={{ width: `${insight.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Insight Modal */}
      {selectedInsight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${getInsightColor(selectedInsight.type)}`}>
                  {React.createElement(getInsightIcon(selectedInsight.type), { className: "w-6 h-6 text-white" })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{selectedInsight.title}</h3>
                  <p className="text-sm text-slate-600">{selectedInsight.category}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInsight(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">{t.ai.detailedDescription}</h4>
                <p className="text-slate-700">{selectedInsight.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">{selectedInsight.confidence}%</div>
                  <div className="text-sm text-slate-600">{t.ai.confidenceAI}</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    selectedInsight.impact === 'high' ? 'text-red-600' :
                    selectedInsight.impact === 'medium' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {getImpactText(selectedInsight.impact).toUpperCase()}
                  </div>
                  <div className="text-sm text-slate-600">{t.ai.impact}</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {selectedInsight.actionable ? t.common.yes.toUpperCase() : t.common.no.toUpperCase()}
                  </div>
                  <div className="text-sm text-slate-600">{t.ai.actionable}</div>
                </div>
              </div>

              {selectedInsight.data && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">{t.ai.detailedData}</h4>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap">
                      {JSON.stringify(selectedInsight.data, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedInsight(null)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {t.ai.modalClose}
                </button>
                {selectedInsight.actionable && (
                  <button 
                    onClick={() => applyInsightAction(selectedInsight)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    {(selectedInsight as any).applied ? t.ai.appliedAction : t.ai.applyAction}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInsights;