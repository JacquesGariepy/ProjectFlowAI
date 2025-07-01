import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  Crown, 
  Rocket, 
  Globe, 
  Headphones, 
  Download, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  X,
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
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [showDemo, setShowDemo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'IA Starter',
      price: '29',
      period: '/mois',
      description: 'Parfait pour les petites équipes qui découvrent l\'IA',
      features: [
        'Dashboard IA basique',
        'Analyse prédictive simple',
        'Commandes vocales limitées',
        '5 projets IA',
        'Support email',
        'Intégrations de base'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'pro',
      name: 'IA Professional',
      price: '79',
      period: '/mois',
      description: 'Solution complète pour les équipes professionnelles',
      features: [
        'Dashboard IA avancé',
        'Analyse prédictive complète',
        'Commandes vocales illimitées',
        'Projets IA illimités',
        'Optimisation automatique',
        'Recommandations personnalisées',
        'Support prioritaire 24/7',
        'Intégrations avancées',
        'API IA complète'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'enterprise',
      name: 'IA Enterprise',
      price: '199',
      period: '/mois',
      description: 'Solution sur mesure pour les grandes entreprises',
      features: [
        'Toutes les fonctionnalités Pro',
        'IA personnalisée',
        'Modèles d\'apprentissage privés',
        'Déploiement on-premise',
        'Sécurité renforcée',
        'Formation équipe dédiée',
        'Support dédié',
        'SLA garanti',
        'Intégrations sur mesure'
      ],
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const aiFeatures: AIFeature[] = [
    {
      id: 'predictive',
      title: 'Analyse Prédictive Avancée',
      description: 'Anticipez les retards, optimisez les ressources et prédisez les performances avec une précision de 94%',
      icon: TrendingUp,
      demo: 'Démonstration de l\'analyse prédictive en temps réel',
      benefits: [
        'Prédiction des retards avec 94% de précision',
        'Optimisation automatique des ressources',
        'Alertes proactives intelligentes',
        'Recommandations d\'amélioration'
      ]
    },
    {
      id: 'optimization',
      title: 'Optimisation Automatique',
      description: 'L\'IA réorganise automatiquement vos projets pour maximiser l\'efficacité et réduire les coûts',
      icon: Zap,
      demo: 'Voir l\'optimisation automatique en action',
      benefits: [
        'Réallocation intelligente des tâches',
        'Optimisation du planning automatique',
        'Réduction des coûts jusqu\'à 25%',
        'Amélioration de la productivité'
      ]
    },
    {
      id: 'insights',
      title: 'Insights Intelligents',
      description: 'Découvrez des patterns cachés dans vos données et obtenez des recommandations personnalisées',
      icon: Brain,
      demo: 'Explorer les insights IA personnalisés',
      benefits: [
        'Détection automatique des tendances',
        'Recommandations personnalisées',
        'Analyse comportementale avancée',
        'Rapports intelligents automatisés'
      ]
    },
    {
      id: 'voice',
      title: 'Assistant Vocal Avancé',
      description: 'Contrôlez ProjectFlow entièrement par la voix avec notre IA conversationnelle',
      icon: Volume2,
      demo: 'Tester l\'assistant vocal IA',
      benefits: [
        'Reconnaissance vocale multilingue',
        'Commandes naturelles complexes',
        'Réponses contextuelles intelligentes',
        'Intégration complète'
      ]
    }
  ];

  const handleUpgrade = (planId: string) => {
    // Simulate upgrade process
    alert(`Mise à niveau vers ${pricingPlans.find(p => p.id === planId)?.name} en cours...`);
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
                <h1 className="text-4xl font-bold">ProjectFlow IA Premium</h1>
                <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
              <p className="text-xl text-purple-100 mb-6">
                Révolutionnez votre gestion de projet avec l'intelligence artificielle la plus avancée du marché
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span className="text-purple-100">94% de précision prédictive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span className="text-purple-100">+40% de productivité</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span className="text-purple-100">-25% de coûts</span>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Fonctionnalités IA Exclusives</h2>
          <p className="text-xl text-slate-600">Découvrez comment l'IA transforme votre façon de travailler</p>
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
                  <span>{isActive ? 'Arrêter la démo' : feature.demo}</span>
                </button>

                {isActive && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-purple-700">Démonstration en cours...</span>
                    </div>
                    <p className="text-sm text-purple-600">
                      Simulation de {feature.title.toLowerCase()} avec vos données de projet en temps réel.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Choisissez votre plan IA</h2>
          <p className="text-xl text-slate-600">Des solutions adaptées à chaque taille d'équipe</p>
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
                    <span>Plus populaire</span>
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
                <span>Choisir ce plan</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi choisir ProjectFlow IA Premium ?</h2>
          <p className="text-xl text-slate-600">Les avantages qui font la différence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Sécurité Enterprise</h3>
            <p className="text-sm text-slate-600">Chiffrement de bout en bout et conformité RGPD</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Support 24/7</h3>
            <p className="text-sm text-slate-600">Équipe d'experts disponible en permanence</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Déploiement Global</h3>
            <p className="text-sm text-slate-600">Serveurs dans le monde entier pour une performance optimale</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Migration Gratuite</h3>
            <p className="text-sm text-slate-600">Nous migrons vos données gratuitement</p>
          </div>
        </div>
      </div>

      {/* ROI Calculator */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Calculateur de ROI IA</h2>
          <p className="text-slate-600">Découvrez les économies potentielles avec ProjectFlow IA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
            <div className="text-3xl font-bold text-emerald-600 mb-2">+40%</div>
            <div className="text-sm text-emerald-700 font-medium">Productivité</div>
            <div className="text-xs text-emerald-600 mt-1">Gain moyen constaté</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">-25%</div>
            <div className="text-sm text-blue-700 font-medium">Coûts de projet</div>
            <div className="text-xs text-blue-600 mt-1">Réduction moyenne</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">6 mois</div>
            <div className="text-sm text-purple-700 font-medium">Retour sur investissement</div>
            <div className="text-xs text-purple-600 mt-1">Délai moyen</div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Prêt à révolutionner votre gestion de projet ?</h2>
        <p className="text-xl text-purple-100 mb-6">
          Rejoignez plus de 10,000 équipes qui utilisent déjà ProjectFlow IA Premium
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2">
            <Rocket className="w-5 h-5" />
            <span>Essai gratuit 14 jours</span>
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Planifier une démo</span>
          </button>
        </div>
        <p className="text-sm text-purple-200 mt-4">
          Aucune carte de crédit requise • Annulation à tout moment • Support inclus
        </p>
      </div>
    </div>
  );
};

export default AIPremium;