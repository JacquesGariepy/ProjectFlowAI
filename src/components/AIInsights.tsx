import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  Users, 
  Calendar,
  DollarSign,
  Zap,
  Eye,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface AIInsight {
  id: string;
  type: 'prediction' | 'optimization' | 'risk' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  category: string;
  actionable: boolean;
  data?: any;
}

const AIInsights: React.FC = () => {
  const { state } = useAppContext();
  const { projects, tasks, users } = state;
  
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    generateAIInsights();
  }, [projects, tasks, users]);

  const generateAIInsights = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      const newInsights: AIInsight[] = [
        {
          id: '1',
          type: 'prediction',
          title: 'Prédiction de Performance Exceptionnelle',
          description: 'L\'équipe va dépasser les objectifs de 18% ce trimestre selon l\'analyse prédictive IA',
          confidence: 94,
          impact: 'high',
          category: 'Performance',
          actionable: true,
          data: {
            currentPerformance: 87,
            predictedPerformance: 105,
            factors: ['Vélocité équipe +15%', 'Qualité code +12%', 'Satisfaction client +8%']
          }
        },
        {
          id: '2',
          type: 'risk',
          title: 'Risque de Burnout Détecté',
          description: 'Michael Chen montre des signes de surcharge. Risque de burnout dans 2 semaines',
          confidence: 87,
          impact: 'high',
          category: 'Ressources Humaines',
          actionable: true,
          data: {
            member: 'Michael Chen',
            workload: 145,
            averageWorkload: 100,
            stressIndicators: ['Heures supplémentaires +40%', 'Tâches en retard +3', 'Qualité code -5%']
          }
        },
        {
          id: '3',
          type: 'optimization',
          title: 'Opportunité d\'Optimisation Budget',
          description: 'Réallocation de 15% du budget Marketing vers Développement augmenterait le ROI de 23%',
          confidence: 91,
          impact: 'medium',
          category: 'Finance',
          actionable: true,
          data: {
            currentROI: 156,
            optimizedROI: 179,
            reallocation: { from: 'Marketing', to: 'Développement', amount: 15 }
          }
        },
        {
          id: '4',
          type: 'opportunity',
          title: 'Fenêtre d\'Innovation Détectée',
          description: 'Période optimale pour lancer une nouvelle fonctionnalité IA dans 3 semaines',
          confidence: 89,
          impact: 'high',
          category: 'Innovation',
          actionable: true,
          data: {
            optimalLaunchDate: '2024-03-15',
            marketReadiness: 92,
            teamCapacity: 85,
            competitorAnalysis: 'Avantage concurrentiel de 6 mois'
          }
        },
        {
          id: '5',
          type: 'prediction',
          title: 'Prédiction de Retard Projet',
          description: 'Projet E-commerce: 73% de probabilité de retard de 4 jours sans intervention',
          confidence: 85,
          impact: 'medium',
          category: 'Planning',
          actionable: true,
          data: {
            project: 'E-commerce Platform',
            delayProbability: 73,
            estimatedDelay: 4,
            mitigationActions: ['Ajouter 1 développeur', 'Réduire scope de 10%', 'Paralléliser les tâches']
          }
        }
      ];
      
      setInsights(newInsights);
      setIsAnalyzing(false);
    }, 2000);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Insights IA Avancés</h1>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-purple-100">Analyse intelligente • Prédictions précises • Recommandations actionables</p>
          </div>
          <button
            onClick={generateAIInsights}
            disabled={isAnalyzing}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyse...' : 'Actualiser IA'}
          </button>
        </div>
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h3 className="font-semibold text-slate-900">Analyse IA en cours...</h3>
              <p className="text-sm text-slate-600">Traitement des données • Génération d'insights • Calcul de confiance</p>
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
                    {insight.impact.toUpperCase()}
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
                    Confiance: <span className="font-medium text-slate-900">{insight.confidence}%</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Catégorie: <span className="font-medium text-slate-900">{insight.category}</span>
                  </div>
                </div>
                {insight.actionable && (
                  <div className="flex items-center space-x-1 text-xs text-emerald-600">
                    <Target className="w-3 h-3" />
                    <span>Actionnable</span>
                  </div>
                )}
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
                <h4 className="font-semibold text-slate-900 mb-2">Description détaillée</h4>
                <p className="text-slate-700">{selectedInsight.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">{selectedInsight.confidence}%</div>
                  <div className="text-sm text-slate-600">Confiance IA</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className={`text-2xl font-bold ${
                    selectedInsight.impact === 'high' ? 'text-red-600' :
                    selectedInsight.impact === 'medium' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {selectedInsight.impact.toUpperCase()}
                  </div>
                  <div className="text-sm text-slate-600">Impact</div>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">
                    {selectedInsight.actionable ? 'OUI' : 'NON'}
                  </div>
                  <div className="text-sm text-slate-600">Actionnable</div>
                </div>
              </div>

              {selectedInsight.data && (
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Données détaillées</h4>
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
                  Fermer
                </button>
                {selectedInsight.actionable && (
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200">
                    Appliquer l'action
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