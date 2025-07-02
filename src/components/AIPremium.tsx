import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  TrendingUp, 
  Calendar, 
  Shield, 
  CheckCircle, 
  Star, 
  Crown, 
  Rocket, 
  Globe, 
  Headphones, 
  Download, 
  Play,
  Pause,
  Volume2
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
}

interface AIFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  demo: string;
  benefits: string[];
}

const AIPremium: React.FC = () => {
  const { t } = useLanguage();
  const [selectedPlan] = useState<string>('pro');
  const [showDemo, setShowDemo] = useState<string | null>(null);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: t.aiPremium.starterPlan,
      price: '29',
      period: t.aiPremium.monthlyPrice,
      description: t.aiPremium.starterDesc,
      features: [
        t.aiPremium.basicDashboard,
        t.aiPremium.simplePredictive,
        t.aiPremium.limitedCommands,
        t.aiPremium.aiProjects,
        t.aiPremium.emailSupport,
        t.aiPremium.basicIntegrations
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'pro',
      name: t.aiPremium.professionalPlan,
      price: '79',
      period: t.aiPremium.monthlyPrice,
      description: t.aiPremium.professionalDesc,
      features: [
        t.aiPremium.advancedDashboard,
        t.aiPremium.completePredictive,
        t.aiPremium.unlimitedCommands,
        t.aiPremium.unlimitedProjects,
        t.aiPremium.automaticOptimization,
        t.aiPremium.personalizedRecommendations,
        t.aiPremium.prioritySupport24,
        t.aiPremium.advancedIntegrations,
        t.aiPremium.completeApiAI
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'enterprise',
      name: t.aiPremium.enterprisePlan,
      price: '199',
      period: t.aiPremium.monthlyPrice,
      description: t.aiPremium.enterpriseDesc,
      features: [
        t.aiPremium.allProFeatures,
        t.aiPremium.customAI,
        t.aiPremium.privateLearning,
        t.aiPremium.onPremiseDeployment,
        t.aiPremium.enhancedSecurity,
        t.aiPremium.dedicatedTraining,
        t.aiPremium.dedicatedSupport,
        t.aiPremium.guaranteedSLA,
        t.aiPremium.customIntegrations
      ],
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const aiFeatures: AIFeature[] = [
    {
      id: 'predictive',
      title: t.aiPremium.predictiveAnalysisTitle,
      description: t.aiPremium.predictiveAnalysisDesc,
      icon: TrendingUp,
      demo: t.aiPremium.viewDemo,
      benefits: [
        t.aiPremium.delayPrediction,
        t.aiPremium.resourceOptimization,
        t.aiPremium.proactiveAlerts,
        t.aiPremium.improvementRecommendations
      ]
    },
    {
      id: 'optimization',
      title: t.aiPremium.automaticOptimizationTitle,
      description: t.aiPremium.automaticOptimizationDesc,
      icon: Zap,
      demo: t.aiPremium.viewDemo,
      benefits: [
        t.aiPremium.taskReallocation,
        t.aiPremium.planningOptimization,
        t.aiPremium.costsReduction,
        t.aiPremium.productivityIncrease
      ]
    },
    {
      id: 'insights',
      title: t.aiPremium.intelligentInsightsTitle,
      description: t.aiPremium.intelligentInsightsDesc,
      icon: Brain,
      demo: t.aiPremium.viewDemo,
      benefits: [
        t.aiPremium.trendDetection,
        t.aiPremium.personalizedRecommendations,
        t.aiPremium.behavioralAnalysis,
        t.aiPremium.automatedReports
      ]
    },
    {
      id: 'voice',
      title: t.aiPremium.advancedVoiceTitle,
      description: t.aiPremium.advancedVoiceDesc,
      icon: Volume2,
      demo: t.aiPremium.viewDemo,
      benefits: [
        t.aiPremium.voiceRecognition,
        t.aiPremium.complexCommands,
        t.aiPremium.contextualResponses,
        t.aiPremium.fullIntegration
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    // Simulate upgrade process
    const planName = pricingPlans.find(p => p.id === planId)?.name;
    alert(`${t.aiPremium.upgradingTo} ${planName} ${t.aiPremium.upgradeInProgress}`);
  };

  const toggleDemo = (featureId: string) => {
    if (showDemo === featureId) {
      setShowDemo(null);
      setIsPlaying(false);
    } else {
      setShowDemo(featureId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-3 mb-4">
                <Crown className="w-10 h-10 text-yellow-300" />
                <h1 className="text-4xl font-bold">{t.aiPremium.heroTitle}</h1>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-xl text-purple-100 mb-6">
                {t.aiPremium.heroSubtitle}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span className="text-purple-100">{t.aiPremium.accuracyPredictive}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span className="text-purple-100">{t.aiPremium.productivityIncrease}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span className="text-purple-100">{t.aiPremium.costsReduction}</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Showcase */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.aiPremium.exclusiveFeatures}</h2>
          <p className="text-xl text-slate-600">{t.aiPremium.exclusiveFeaturesDesc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {aiFeatures.map((feature) => {
            const Icon = feature.icon;
            const isActive = showDemo === feature.id;
            
            return (
              <div key={feature.id} className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => toggleDemo(feature.id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isActive ? t.aiPremium.stopDemo : feature.demo}</span>
                </button>

                {isActive && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-purple-700">{t.aiPremium.demoInProgress}</span>
                    </div>
                    <p className="text-sm text-purple-600">
                      {t.aiPremium.demoSimulation} {feature.title.toLowerCase()}.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.aiPremium.choosePlan}</h2>
          <p className="text-xl text-slate-600">{t.aiPremium.adaptedSolutions}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-purple-500 ring-4 ring-purple-500/20' 
                  : selectedPlan === plan.id 
                    ? 'border-blue-500' 
                    : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{t.aiPremium.mostPopular}</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}€</span>
                  <span className="text-slate-500 ml-1">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Rocket className="w-4 h-4" />
                <span>{t.aiPremium.selectPlan}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.aiPremium.whyChoose}</h2>
          <p className="text-xl text-slate-600">{t.aiPremium.whyChooseDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t.aiPremium.enterpriseSecurity}</h3>
            <p className="text-sm text-slate-600">{t.aiPremium.enterpriseSecurityDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t.aiPremium.support247}</h3>
            <p className="text-sm text-slate-600">{t.aiPremium.support247Desc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t.aiPremium.globalDeployment}</h3>
            <p className="text-sm text-slate-600">{t.aiPremium.globalDeploymentDesc}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">{t.aiPremium.freeMigration}</h3>
            <p className="text-sm text-slate-600">{t.aiPremium.freeMigrationDesc}</p>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{t.aiPremium.roiCalculator}</h2>
          <p className="text-slate-600">{t.aiPremium.roiDesc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
            <div className="text-3xl font-bold text-emerald-600 mb-2">+40%</div>
            <div className="text-sm text-emerald-700 font-medium">{t.aiPremium.productivityGain}</div>
            <div className="text-xs text-emerald-600 mt-1">{t.aiPremium.averageGain}</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">-25%</div>
            <div className="text-sm text-blue-700 font-medium">{t.aiPremium.projectCosts}</div>
            <div className="text-xs text-blue-600 mt-1">{t.aiPremium.averageReduction}</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">6 mois</div>
            <div className="text-sm text-purple-700 font-medium">{t.aiPremium.returnInvestment}</div>
            <div className="text-xs text-purple-600 mt-1">{t.aiPremium.averageDelay}</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">{t.aiPremium.readyRevolutionize}</h2>
        <p className="text-xl text-purple-100 mb-6">
          {t.aiPremium.joinTeams}
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2">
            <Rocket className="w-5 h-5" />
            <span>{t.aiPremium.freeTrial14}</span>
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{t.aiPremium.scheduleDemo}</span>
          </button>
        </div>
        <p className="text-sm text-purple-200 mt-4">
          {t.aiPremium.noCreditCard}
        </p>
      </div>
    </div>
  );
};

export default AIPremium;