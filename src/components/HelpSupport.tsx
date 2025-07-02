import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  icon: React.ComponentType<any>;
  url: string;
}

const HelpSupport: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);

  const categories = [
    { id: 'all', name: t.helpSupport.allCategories, icon: Book },
    { id: 'getting-started', name: t.helpSupport.gettingStarted, icon: Play },
    { id: 'projects', name: t.helpSupport.projectManagement, icon: Settings },
    { id: 'tasks', name: t.helpSupport.taskManagement, icon: CheckCircle },
    { id: 'team', name: t.helpSupport.teamCollaboration, icon: Users },
    { id: 'calendar', name: t.helpSupport.calendar, icon: Calendar },
    { id: 'ai', name: t.helpSupport.aiFeatures, icon: Zap },
    { id: 'analytics', name: t.helpSupport.analytics, icon: BarChart3 },
    { id: 'account', name: t.helpSupport.accountSettings, icon: Settings }
  ];

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: t.helpSupport.faqCreateProject,
      answer: t.helpSupport.faqCreateProjectAnswer,
      category: 'getting-started',
      helpful: 45
    },
    {
      id: '2',
      question: t.helpSupport.faqUseAI,
      answer: t.helpSupport.faqUseAIAnswer,
      category: 'ai',
      helpful: 38
    },
    {
      id: '3',
      question: t.helpSupport.faqInviteMembers,
      answer: t.helpSupport.faqInviteMembersAnswer,
      category: 'team',
      helpful: 32
    },
    {
      id: '4',
      question: t.helpSupport.faqConfigureNotifications,
      answer: t.helpSupport.faqConfigureNotificationsAnswer,
      category: 'account',
      helpful: 28
    },
    {
      id: '5',
      question: t.helpSupport.faqVoiceCommands,
      answer: t.helpSupport.faqVoiceCommandsAnswer,
      category: 'ai',
      helpful: 25
    },
    {
      id: '6',
      question: t.helpSupport.faqExportData,
      answer: t.helpSupport.faqExportDataAnswer,
      category: 'analytics',
      helpful: 22
    }
  ];

  const guides: GuideItem[] = [
    {
      id: '1',
      title: t.helpSupport.quickStartGuide,
      description: t.helpSupport.quickStartDescription,
      duration: `10 ${t.helpSupport.minutes}`,
      difficulty: 'beginner',
      category: 'getting-started',
      icon: Play,
      url: '#'
    },
    {
      id: '2',
      title: t.helpSupport.masterAIDashboard,
      description: t.helpSupport.masterAIDashboardDescription,
      duration: `15 ${t.helpSupport.minutes}`,
      difficulty: 'intermediate',
      category: 'ai',
      icon: Zap,
      url: '#'
    },
    {
      id: '3',
      title: t.helpSupport.advancedProjectManagement,
      description: t.helpSupport.advancedProjectManagementDescription,
      duration: `20 ${t.helpSupport.minutes}`,
      difficulty: 'advanced',
      category: 'projects',
      icon: Settings,
      url: '#'
    },
    {
      id: '4',
      title: t.helpSupport.teamCollaborationGuide,
      description: t.helpSupport.teamCollaborationDescription,
      duration: `12 ${t.helpSupport.minutes}`,
      difficulty: 'intermediate',
      category: 'team',
      icon: Users,
      url: '#'
    },
    {
      id: '5',
      title: t.helpSupport.analyticsReports,
      description: t.helpSupport.analyticsReportsDescription,
      duration: `18 ${t.helpSupport.minutes}`,
      difficulty: 'advanced',
      category: 'analytics',
      icon: BarChart3,
      url: '#'
    },
    {
      id: '6',
      title: t.helpSupport.calendarOptimization,
      description: t.helpSupport.calendarOptimizationDescription,
      duration: `8 ${t.helpSupport.minutes}`,
      difficulty: 'beginner',
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
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-orange-100 text-orange-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return t.helpSupport.beginner;
      case 'intermediate': return t.helpSupport.intermediate;
      case 'advanced': return t.helpSupport.advanced;
      default: return difficulty;
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
              <h1 className="text-3xl font-bold">{t.helpSupport.title}</h1>
            </div>
            <p className="text-blue-100">{t.helpSupport.subtitle}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>{t.helpSupport.liveChat}</span>
            </button>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{t.helpSupport.contactUs}</span>
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
              placeholder={t.helpSupport.searchPlaceholder}
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
              <h3 className="font-semibold text-slate-900">{t.helpSupport.videoTutorials}</h3>
              <p className="text-sm text-slate-600">{t.helpSupport.visualGuides}</p>
            </div>
          </div>
          <div className="flex items-center text-blue-600 group-hover:text-blue-700">
            <span className="text-sm font-medium">{t.helpSupport.watchVideos}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{t.helpSupport.liveSupport}</h3>
              <p className="text-sm text-slate-600">{t.helpSupport.chatWithTeam}</p>
            </div>
          </div>
          <div className="flex items-center text-emerald-600 group-hover:text-emerald-700">
            <span className="text-sm font-medium">{t.helpSupport.startChat}</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{t.helpSupport.documentation}</h3>
              <p className="text-sm text-slate-600">{t.helpSupport.completeApiGuide}</p>
            </div>
          </div>
          <div className="flex items-center text-purple-600 group-hover:text-purple-700">
            <span className="text-sm font-medium">{t.helpSupport.readDocs}</span>
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
              <span>{t.helpSupport.frequentlyAskedQuestions}</span>
            </h3>
            <span className="text-sm text-slate-500">{filteredFAQs.length} {t.helpSupport.results}</span>
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
                        <span>{faq.helpful} {t.helpSupport.peopleFoundHelpful}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-700">{t.helpSupport.helpful}</button>
                        <button className="text-sm text-slate-500 hover:text-slate-700">{t.helpSupport.notHelpful}</button>
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
              <span>{t.helpSupport.guidesAndTutorials}</span>
            </h3>
            <span className="text-sm text-slate-500">{filteredGuides.length} {t.helpSupport.guides}</span>
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
                          {getDifficultyLabel(guide.difficulty)}
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
        <h3 className="text-lg font-semibold text-slate-900 mb-4">{t.helpSupport.needMoreHelp}</h3>
        <p className="text-slate-600 mb-6">
          {t.helpSupport.supportTeamHelp}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">{t.helpSupport.email}</div>
              <div className="text-sm text-slate-600">support@projectflow.com</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Phone className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">{t.helpSupport.phone}</div>
              <div className="text-sm text-slate-600">+33 1 23 45 67 89</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">{t.helpSupport.liveChat}</div>
              <div className="text-sm text-slate-600">{t.helpSupport.availableAlways}</div>
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
                      {getDifficultyLabel(selectedGuide.difficulty)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4">{t.helpSupport.guideContent}</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">{t.helpSupport.introAndSetup}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">{t.helpSupport.mainFeatures}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">{t.helpSupport.tipsAndBestPractices}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="text-slate-700">{t.helpSupport.practicalExamples}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  {t.helpSupport.closeModal}
                </button>
                <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>{t.helpSupport.startGuide}</span>
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