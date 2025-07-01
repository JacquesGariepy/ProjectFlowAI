import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  Phone, 
  Video, 
  FileText, 
  Lightbulb, 
  Settings, 
  Users, 
  Calendar, 
  BarChart3, 
  Zap, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Download,
  Play,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  X
} from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
}

interface GuideItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  icon: React.ComponentType<any>;
  url: string;
}

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);

  const categories = [
    { id: 'all', name: 'Toutes les catégories', icon: Book },
    { id: 'getting-started', name: 'Premiers pas', icon: Play },
    { id: 'projects', name: 'Gestion de projets', icon: Settings },
    { id: 'tasks', name: 'Gestion des tâches', icon: CheckCircle },
    { id: 'team', name: 'Collaboration équipe', icon: Users },
    { id: 'calendar', name: 'Calendrier', icon: Calendar },
    { id: 'ai', name: 'Fonctionnalités IA', icon: Zap },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'account', name: 'Compte et paramètres', icon: Settings }
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'Comment créer mon premier projet ?',
      answer: 'Pour créer un projet, cliquez sur le bouton "Nouveau Projet" dans la section Projets. Remplissez les informations requises comme le nom, la description, les dates et assignez les membres de l\'équipe. Vous pouvez également définir le budget et les priorités.',
      category: 'getting-started',
      helpful: 45
    },
    {
      id: '2',
      question: 'Comment utiliser les fonctionnalités IA ?',
      answer: 'ProjectFlow intègre l\'IA dans plusieurs domaines : le Dashboard IA pour les insights automatiques, les commandes vocales pour la navigation, l\'analyse prédictive pour anticiper les retards, et les recommandations d\'optimisation pour améliorer les performances.',
      category: 'ai',
      helpful: 38
    },
    {
      id: '3',
      question: 'Comment inviter des membres à mon équipe ?',
      answer: 'Allez dans la section Équipe, cliquez sur "Ajouter Membre", remplissez les informations du nouvel utilisateur et assignez-le à une équipe. Un email d\'invitation sera automatiquement envoyé.',
      category: 'team',
      helpful: 32
    },
    {
      id: '4',
      question: 'Comment configurer les notifications ?',
      answer: 'Dans les Paramètres > Notifications, vous pouvez personnaliser tous les types de notifications : email, push, desktop. Configurez les alertes pour les échéances, les mises à jour de tâches, et les mentions d\'équipe.',
      category: 'account',
      helpful: 28
    },
    {
      id: '5',
      question: 'Comment utiliser les commandes vocales ?',
      answer: 'Activez les commandes vocales en cliquant sur l\'icône micro dans le header. Vous pouvez dire des commandes comme "créer un nouveau projet", "afficher mes tâches", ou "analyser les performances".',
      category: 'ai',
      helpful: 25
    },
    {
      id: '6',
      question: 'Comment exporter mes données ?',
      answer: 'Chaque section (Projets, Tâches, etc.) dispose d\'options d\'export. Cliquez sur le menu "..." d\'un élément et sélectionnez "Exporter". Les données sont exportées au format JSON avec toutes les métadonnées.',
      category: 'analytics',
      helpful: 22
    }
  ];

  const guides: GuideItem[] = [
    {
      id: '1',
      title: 'Guide de démarrage rapide',
      description: 'Apprenez les bases de ProjectFlow en 10 minutes',
      duration: '10 min',
      difficulty: 'Débutant',
      category: 'getting-started',
      icon: Play,
      url: '#'
    },
    {
      id: '2',
      title: 'Maîtriser le Dashboard IA',
      description: 'Exploitez toute la puissance de l\'intelligence artificielle',
      duration: '15 min',
      difficulty: 'Intermédiaire',
      category: 'ai',
      icon: Zap,
      url: '#'
    },
    {
      id: '3',
      title: 'Gestion avancée des projets',
      description: 'Techniques avancées pour optimiser vos projets',
      duration: '20 min',
      difficulty: 'Avancé',
      category: 'projects',
      icon: Settings,
      url: '#'
    },
    {
      id: '4',
      title: 'Collaboration en équipe',
      description: 'Maximisez l\'efficacité de votre équipe',
      duration: '12 min',
      difficulty: 'Intermédiaire',
      category: 'team',
      icon: Users,
      url: '#'
    },
    {
      id: '5',
      title: 'Analytics et rapports',
      description: 'Créez des rapports détaillés et des analyses',
      duration: '18 min',
      difficulty: 'Avancé',
      category: 'analytics',
      icon: BarChart3,
      url: '#'
    },
    {
      id: '6',
      title: 'Optimisation du calendrier',
      description: 'Gérez efficacement votre temps et vos événements',
      duration: '8 min',
      difficulty: 'Débutant',
      category: 'calendar',
      icon: Calendar,
      url: '#'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-green-100 text-green-700';
      case 'Intermédiaire': return 'bg-orange-100 text-orange-700';
      case 'Avancé': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <HelpCircle className="w-8 h-8" />
              <h1 className="text-3xl font-bold">Aide et Support</h1>
            </div>
            <p className="text-blue-100">Trouvez rapidement les réponses à vos questions</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chat en direct</span>
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Nous contacter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher dans l'aide..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Tutoriels vidéo</h3>
              <p className="text-sm text-slate-600">Guides visuels étape par étape</p>
            </div>
          </div>
          <div className="flex items-center text-blue-600 group-hover:text-blue-700">
            <span className="text-sm font-medium">Voir les vidéos</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Support en direct</h3>
              <p className="text-sm text-slate-600">Chat avec notre équipe</p>
            </div>
          </div>
          <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
            <span className="text-sm font-medium">Démarrer le chat</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Documentation</h3>
              <p className="text-sm text-slate-600">Guide complet de l'API</p>
            </div>
          </div>
          <div className="flex items-center text-purple-600 group-hover:text-purple-700">
            <span className="text-sm font-medium">Lire la doc</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* FAQ Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <span>Questions fréquentes</span>
            </h3>
            <span className="text-sm text-slate-500">{filteredFAQs.length} résultats</span>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="border border-slate-200 rounded-lg">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-medium text-slate-900">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${
                    expandedFAQ === faq.id ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-4 pb-4">
                    <p className="text-slate-700 mb-4">{faq.answer}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Star className="w-4 h-4" />
                        <span>{faq.helpful} personnes ont trouvé cela utile</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-700">Utile</button>
                        <button className="text-sm text-slate-500 hover:text-slate-700">Pas utile</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guides Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
              <Book className="w-5 h-5 text-emerald-500" />
              <span>Guides et tutoriels</span>
            </h3>
            <span className="text-sm text-slate-500">{filteredGuides.length} guides</span>
          </div>

          <div className="space-y-4">
            {filteredGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <div
                  key={guide.id}
                  onClick={() => setSelectedGuide(guide)}
                  className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{guide.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="flex items-center space-x-1 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{guide.duration}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(guide.difficulty)}`}>
                          {guide.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Besoin d'aide supplémentaire ?</h3>
        <p className="text-slate-600 mb-6">
          Notre équipe de support est là pour vous aider. Choisissez le moyen de contact qui vous convient le mieux.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">Email</div>
              <div className="text-sm text-slate-600">support@projectflow.com</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">Téléphone</div>
              <div className="text-sm text-slate-600">+33 1 23 45 67 89</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">Chat en direct</div>
              <div className="text-sm text-slate-600">Disponible 24h/7j</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Modal */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">{selectedGuide.title}</h3>
              <button
                onClick={() => setSelectedGuide(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-slate-100 rounded-lg">
                  <selectedGuide.icon className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <p className="text-slate-700">{selectedGuide.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1 text-sm text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span>{selectedGuide.duration}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full font-medium ${getDifficultyColor(selectedGuide.difficulty)}`}>
                      {selectedGuide.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Contenu du guide</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Introduction et configuration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Fonctionnalités principales</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Conseils et bonnes pratiques</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">Exemples pratiques</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Fermer
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Commencer le guide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;