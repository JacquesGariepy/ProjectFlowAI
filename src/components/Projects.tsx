import React, { useState, useEffect } from 'react';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  Edit,
  Copy,
  Download,
  Trash2,
  X,
  Save,
  Brain,
  Zap,
  Eye,
  Settings,
  User,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Project, User as UserType } from '../types';
import { formatDate, getDaysUntilDeadline, isOverdue } from '../utils/dateUtils';
import { calculateBudgetUtilization, calculateProjectProgress } from '../utils/calculations';

interface ProjectsProps {
  navigationParams?: {
    itemId?: string;
    itemType?: string;
    action?: string;
  };
  onNavigationComplete?: () => void;
}

interface AIRecommendation {
  id: string;
  type: 'reallocation' | 'optimization' | 'risk' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  projectId: string;
  actionable: boolean;
  data?: any;
}

const Projects: React.FC<ProjectsProps> = ({ navigationParams, onNavigationComplete }) => {
  const { state, dispatch } = useAppContext();
  const { t } = useLanguage();
  const { projects, tasks, users, searchQuery } = state;
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showReallocationModal, setShowReallocationModal] = useState(false);
  const [reallocationProject, setReallocationProject] = useState<Project | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([]);
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState<AIRecommendation | null>(null);
  const [newRecommendation, setNewRecommendation] = useState<Partial<AIRecommendation>>({});

  // Handle navigation to specific project
  useEffect(() => {
    if (navigationParams?.itemId && navigationParams?.itemType === 'project') {
      const project = projects.find(p => p.id === navigationParams.itemId);
      if (project) {
        if (navigationParams.action === 'edit') {
          handleEditProject(project);
        } else {
          // Default action is to view/edit the project
          handleEditProject(project);
        }
        
        // Scroll to project if it exists in the list
        setTimeout(() => {
          const projectElement = document.getElementById(`project-${project.id}`);
          if (projectElement) {
            projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            projectElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
            setTimeout(() => {
              projectElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
            }, 2000);
          }
        }, 100);
      }
      
      // Notify that navigation is complete
      onNavigationComplete?.();
    } else if (navigationParams?.action === 'create') {
      // Handle create action
      handleCreateProject();
      onNavigationComplete?.();
    }
  }, [navigationParams, projects, onNavigationComplete]);

  // Generate AI recommendations
  useEffect(() => {
    generateAIRecommendations();
  }, [projects, tasks, users]);

  const generateAIRecommendations = () => {
    const recommendations: AIRecommendation[] = [
      {
        id: '1',
        type: 'reallocation',
        title: t.projects.teamReallocationSuggested,
        description: 'Transférer 2 développeurs du projet E-commerce vers Mobile App pour accélérer la livraison',
        confidence: 87,
        impact: 'high',
        projectId: '1',
        actionable: true,
        data: {
          from: 'E-commerce Platform',
          to: 'Mobile App Development',
          members: ['Michael Chen', 'Alex Rodriguez'],
          estimatedImprovement: '15% faster delivery'
        }
      },
      {
        id: '2',
        type: 'optimization',
        title: t.projects.budgetOptimizationDetected,
        description: 'Réduire les coûts de 12% en optimisant l\'infrastructure cloud',
        confidence: 92,
        impact: 'medium',
        projectId: '4',
        actionable: true,
        data: {
          currentCost: 150000,
          optimizedCost: 132000,
          savings: 18000,
          method: 'Cloud optimization'
        }
      },
      {
        id: '3',
        type: 'risk',
        title: t.projects.delayRiskIdentified,
        description: 'Projet Analytics Dashboard: 73% de probabilité de retard de 5 jours',
        confidence: 85,
        impact: 'high',
        projectId: '3',
        actionable: true,
        data: {
          delayProbability: 73,
          estimatedDelay: 5,
          causes: ['Resource shortage', 'Technical complexity'],
          mitigation: 'Add 1 senior developer'
        }
      },
      {
        id: '4',
        type: 'opportunity',
        title: t.projects.accelerationOpportunity,
        description: 'Possibilité de livrer le projet Brand Identity 2 semaines en avance',
        confidence: 78,
        impact: 'medium',
        projectId: '5',
        actionable: true,
        data: {
          accelerationDays: 14,
          requirements: 'Assign Emily Davis full-time',
          benefits: 'Early market entry'
        }
      }
    ];
    setAiRecommendations(recommendations);
  };

  // Calculate real metrics
  const calculateRealMetrics = () => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'in-progress').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const overdueProjects = projects.filter(p =>
      p.status !== 'completed' && isOverdue(p.deadline)
    ).length;
    
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
    const budgetUtilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
    
    // Calculate average progress based on actual task completion
    const avgProgress = totalProjects > 0 ? Math.round(
      projects.reduce((sum, project) => {
        const projectProgress = calculateProjectProgress(project, tasks);
        return sum + projectProgress;
      }, 0) / totalProjects
    ) : 0;
    
    const completionRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      overdueProjects,
      totalBudget,
      totalSpent,
      budgetUtilization,
      avgProgress,
      completionRate
    };
  };

  const metrics = calculateRealMetrics();

  // Filter projects
  const filteredProjects = projects.filter(project => {
    // Debug logging to identify the undefined property
    console.log('Debug - searchQuery:', searchQuery, 'type:', typeof searchQuery);
    console.log('Debug - project.name:', project.name, 'project.description:', project.description);
    
    const safeSearchQuery = searchQuery?.toLowerCase() || '';
    const matchesSearch = (project.name?.toLowerCase() || '').includes(safeSearchQuery) ||
                         (project.description?.toLowerCase() || '').includes(safeSearchQuery);
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Project actions
  const handleCreateProject = () => {
    setSelectedProject({
      id: '',
      name: '',
      description: '',
      status: 'planning',
      priority: 'medium',
      progress: 0,
      deadline: '',
      startDate: '',
      budget: 0,
      spent: 0,
      category: '',
      teamMembers: [],
      tasks: [],
      createdBy: '',
      createdAt: '',
      updatedAt: ''
    });
    setShowProjectModal(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    setActiveDropdown(null);
  };

  const handleDuplicateProject = (project: Project) => {
    const duplicatedProject: Project = {
      ...project,
      id: Date.now().toString(),
      name: `${project.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'planning',
      progress: 0,
      spent: 0
    };
    
    dispatch({ type: 'ADD_PROJECT', payload: duplicatedProject });
    setActiveDropdown(null);
    
    // Show success notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: t.projects.projectDuplicated,
        message: `${t.common.view} "${project.name}" ${t.projects.projectDuplicatedMessage}`,
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const handleExportProject = (project: Project) => {
    const projectTasks = tasks.filter(t => t.projectId === project.id);
    const projectData = {
      project,
      tasks: projectTasks,
      teamMembers: project.teamMembers.map(id => users.find(u => u.id === id)),
      exportDate: new Date().toISOString(),
      metrics: {
        totalTasks: projectTasks.length,
        completedTasks: projectTasks.filter(t => t.status === 'completed').length,
        budgetUtilization: calculateBudgetUtilization(project),
        daysUntilDeadline: getDaysUntilDeadline(project.deadline)
      }
    };

    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `project-${project.name.replace(/\s+/g, '-').toLowerCase()}-export.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setActiveDropdown(null);
    
    // Show success notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: t.projects.projectExported,
        message: `${t.common.view} "${project.name}" ${t.projects.projectExportedMessage}`,
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const handleDeleteProject = (projectId: string) => {
    setProjectToDelete(projectId);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      const project = projects.find(p => p.id === projectToDelete);
      dispatch({ type: 'DELETE_PROJECT', payload: projectToDelete });
      setShowDeleteModal(false);
      setProjectToDelete(null);
      
      // Show success notification
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: t.projects.projectDeleted,
          message: `${t.common.view} "${project?.name}" ${t.projects.projectDeletedMessage}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const handleReallocation = (project: Project) => {
    setReallocationProject(project);
    setShowReallocationModal(true);
  };

  const executeReallocation = () => {
    if (reallocationProject) {
      // Simulate reallocation logic
      const updatedProject = {
        ...reallocationProject,
        progress: Math.min(100, reallocationProject.progress + 15),
        updatedAt: new Date().toISOString()
      };
      
      dispatch({ type: 'UPDATE_PROJECT', payload: updatedProject });
      setShowReallocationModal(false);
      setReallocationProject(null);
      
      // Show success notification
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: t.projects.reallocationCompleted,
          message: `${t.common.view} "${reallocationProject.name}" ${t.projects.reallocationCompletedMessage}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  // AI Recommendations CRUD
  const handleCreateRecommendation = () => {
    setEditingRecommendation(null);
    setNewRecommendation({
      type: 'optimization',
      impact: 'medium',
      confidence: 80,
      actionable: true
    });
    setShowRecommendationModal(true);
  };

  const handleEditRecommendation = (recommendation: AIRecommendation) => {
    setEditingRecommendation(recommendation);
    setNewRecommendation(recommendation);
    setShowRecommendationModal(true);
  };

  const handleSaveRecommendation = () => {
    if (editingRecommendation) {
      // Update existing recommendation
      setAiRecommendations(prev => 
        prev.map(r => r.id === editingRecommendation.id ? { ...newRecommendation as AIRecommendation } : r)
      );
    } else {
      // Create new recommendation
      const recommendation: AIRecommendation = {
        ...newRecommendation as AIRecommendation,
        id: Date.now().toString()
      };
      setAiRecommendations(prev => [...prev, recommendation]);
    }
    
    setShowRecommendationModal(false);
    setEditingRecommendation(null);
    setNewRecommendation({});
  };

  const handleDeleteRecommendation = (id: string) => {
    setAiRecommendations(prev => prev.filter(r => r.id !== id));
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: t.projects.recommendationDeleted,
        message: 'La recommandation IA a été supprimée avec succès',
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const saveProject = () => {
    if (selectedProject) {
      if (selectedProject.id) {
        dispatch({ type: 'UPDATE_PROJECT', payload: selectedProject });
      } else {
        const newProject = {
          ...selectedProject,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tasks: [],
          createdBy: state.currentUser?.id || ''
        };
        dispatch({ type: 'ADD_PROJECT', payload: newProject });
      }
      setShowProjectModal(false);
      setSelectedProject(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-orange-100 text-orange-700';
      case 'on-hold': return 'bg-red-100 text-red-700';
      case 'planning': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'reallocation': return Users;
      case 'optimization': return Zap;
      case 'risk': return AlertTriangle;
      case 'opportunity': return Target;
      default: return Brain;
    }
  };

  const getRecommendationColor = (type: string) => {
    switch (type) {
      case 'reallocation': return 'from-blue-500 to-blue-600';
      case 'optimization': return 'from-purple-500 to-purple-600';
      case 'risk': return 'from-red-500 to-red-600';
      case 'opportunity': return 'from-emerald-500 to-emerald-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
            <FolderOpen className="w-8 h-8 text-blue-600" />
            <span>{t.projects.title}</span>
          </h1>
          <p className="text-slate-600 mt-1">{t.projects.subtitle}</p>
        </div>
        <button
          onClick={handleCreateProject}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t.projects.newProject}</span>
        </button>
      </div>

      {/* Real Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.projects.totalProjects}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.totalProjects}</p>
              <p className="text-sm text-slate-500">{metrics.activeProjects} {t.projects.activeProjectsCount}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.projects.completionRate}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.completionRate}%</p>
              <p className="text-sm text-slate-500">{metrics.completedProjects} {t.projects.completedProjectsCount}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.projects.totalBudget}</p>
              <p className="text-3xl font-bold text-slate-900">${metrics.totalBudget.toLocaleString()}</p>
              <p className="text-sm text-slate-500">{metrics.budgetUtilization}% {t.projects.budgetUsed}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.projects.averageProgress}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.avgProgress}%</p>
              <p className="text-sm text-slate-500">{metrics.overdueProjects} {t.projects.late}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-500" />
            <span>{t.projects.aiRecommendations}</span>
            <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
          </h3>
          <button
            onClick={handleCreateRecommendation}
            className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>{t.projects.addRecommendation}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {aiRecommendations.map((recommendation) => {
            const Icon = getRecommendationIcon(recommendation.type);
            return (
              <div key={recommendation.id} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${getRecommendationColor(recommendation.type)}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditRecommendation(recommendation)}
                      className="p-1 text-slate-400 hover:text-slate-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteRecommendation(recommendation.id)}
                      className="p-1 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h4 className="font-medium text-slate-900 mb-2">{recommendation.title}</h4>
                <p className="text-sm text-slate-600 mb-3">{recommendation.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-500">
                      {t.projects.confidence}: <span className="font-medium">{recommendation.confidence}%</span>
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      recommendation.impact === 'high' ? 'bg-red-100 text-red-700' :
                      recommendation.impact === 'medium' ? 'bg-orange-100 text-orange-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {recommendation.impact.toUpperCase()}
                    </span>
                  </div>
                  {recommendation.actionable && recommendation.type === 'reallocation' && (
                    <button
                      onClick={() => {
                        const project = projects.find(p => p.id === recommendation.projectId);
                        if (project) handleReallocation(project);
                      }}
                      className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      {t.projects.reallocateNow}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t.projects.searchProjects}
            value={searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">{t.projects.allStatuses}</option>
          <option value="planning">{t.projects.statusPlanning}</option>
          <option value="in-progress">{t.projects.statusInProgress}</option>
          <option value="review">{t.projects.statusReview}</option>
          <option value="completed">{t.projects.statusCompleted}</option>
          <option value="on-hold">{t.projects.statusOnPause}</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">{t.projects.allPriorities}</option>
          <option value="high">{t.projects.priorityHighDisplay}</option>
          <option value="medium">{t.projects.priorityMediumDisplay}</option>
          <option value="low">{t.projects.priorityLowDisplay}</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const projectTasks = tasks.filter(t => t.projectId === project.id);
          const progress = calculateProjectProgress(project, tasks);
          const daysLeft = getDaysUntilDeadline(project.deadline);
          const budgetUtilization = calculateBudgetUtilization(project);

          return (
            <div 
              key={project.id} 
              id={`project-${project.id}`}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-slate-600 line-clamp-2">{project.description}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === project.id ? null : project.id)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4 text-slate-500" />
                  </button>
                  
                  {activeDropdown === project.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-10">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Edit className="w-4 h-4 mr-3" />
                        {t.projects.edit}
                      </button>
                      <button
                        onClick={() => handleDuplicateProject(project)}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Copy className="w-4 h-4 mr-3" />
                        {t.projects.duplicate}
                      </button>
                      <button
                        onClick={() => handleExportProject(project)}
                        className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Download className="w-4 h-4 mr-3" />
                        {t.projects.export}
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-3" />
                        {t.projects.delete}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Priority */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{t.projects.progress}</span>
                  <span className="text-sm font-medium text-slate-900">{progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-slate-900">{projectTasks.length}</div>
                  <div className="text-xs text-slate-600">{t.projects.tasks}</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-slate-900">{project.teamMembers.length}</div>
                  <div className="text-xs text-slate-600">{t.projects.members}</div>
                </div>
              </div>

              {/* Budget */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">{t.projects.budget}</span>
                  <span className="text-sm font-medium text-slate-900">
                    ${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-200 rounded-full">
                  <div
                    className={`h-1 rounded-full ${
                      budgetUtilization > 90 ? 'bg-red-500' :
                      budgetUtilization > 75 ? 'bg-orange-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600">{formatDate(project.deadline)}</span>
                </div>
                <span className={`font-medium ${
                  daysLeft < 0 ? 'text-red-600' :
                  daysLeft <= 7 ? 'text-orange-600' : 'text-slate-600'
                }`}>
                  {daysLeft < 0 ? `${Math.abs(daysLeft)} ${t.projects.daysLate}` :
                   daysLeft === 0 ? t.projects.todayText :
                   `${daysLeft} ${t.projects.daysRemaining}`}
                </span>
              </div>

              {/* Team Members */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex -space-x-2">
                  {project.teamMembers.slice(0, 3).map((memberId) => {
                    const member = users.find(u => u.id === memberId);
                    return member ? (
                      <img
                        key={member.id}
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                        title={member.name}
                      />
                    ) : null;
                  })}
                  {project.teamMembers.length > 3 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                      <span className="text-xs font-medium text-slate-600">
                        +{project.teamMembers.length - 3}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleEditProject(project)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1"
                >
                  <span>{t.projects.viewDetails}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Modal */}
      {showProjectModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                {selectedProject.id ? t.projects.editProject : t.projects.createProject}
              </h3>
              <button
                onClick={() => setShowProjectModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.projectName}</label>
                <input
                  type="text"
                  value={selectedProject.name}
                  onChange={(e) => setSelectedProject({ ...selectedProject, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.description}</label>
                <textarea
                  value={selectedProject.description}
                  onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.status}</label>
                  <select
                    value={selectedProject.status}
                    onChange={(e) => setSelectedProject({ ...selectedProject, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="planning">{t.projects.statusPlanningDisplay}</option>
                    <option value="in-progress">{t.projects.statusInProgressDisplay}</option>
                    <option value="review">{t.projects.statusReviewDisplay}</option>
                    <option value="completed">{t.projects.statusCompletedDisplay}</option>
                    <option value="on-hold">{t.projects.statusOnPauseDisplay}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.priority}</label>
                  <select
                    value={selectedProject.priority}
                    onChange={(e) => setSelectedProject({ ...selectedProject, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">{t.projects.priorityLowDisplay}</option>
                    <option value="medium">{t.projects.priorityMediumDisplay}</option>
                    <option value="high">{t.projects.priorityHighDisplay}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.startDate}</label>
                  <input
                    type="date"
                    value={selectedProject.startDate}
                    onChange={(e) => setSelectedProject({ ...selectedProject, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.deadline}</label>
                  <input
                    type="date"
                    value={selectedProject.deadline}
                    onChange={(e) => setSelectedProject({ ...selectedProject, deadline: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.budget}</label>
                  <input
                    type="number"
                    value={selectedProject.budget}
                    onChange={(e) => setSelectedProject({ ...selectedProject, budget: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.category}</label>
                  <input
                    type="text"
                    value={selectedProject.category}
                    onChange={(e) => setSelectedProject({ ...selectedProject, category: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowProjectModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.projects.cancel}
              </button>
              <button
                onClick={saveProject}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.projects.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t.projects.deleteProject}</h3>
                <p className="text-sm text-slate-600">{t.projects.deleteConfirmation}</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              {t.projects.deleteWarning}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.projects.cancel}
              </button>
              <button
                onClick={confirmDeleteProject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t.projects.delete}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reallocation Modal */}
      {showReallocationModal && reallocationProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{t.projects.teamReallocation}</h3>
                <p className="text-sm text-slate-600">Projet: {reallocationProject.name}</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">{t.projects.aiRecommendations}</h4>
                <p className="text-sm text-blue-700">
                  {t.projects.aiRecommendationText}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-slate-900">{t.projects.suggestedMembers}</h4>
                <div className="space-y-2">
                  {users.slice(0, 2).map(user => (
                    <div key={user.id} className="flex items-center space-x-3 p-2 border border-slate-200 rounded-lg">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-sm text-slate-600">{user.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowReallocationModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.projects.cancel}
              </button>
              <button
                onClick={executeReallocation}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>{t.projects.execute}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Recommendation Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                {editingRecommendation ? t.projects.editRecommendation : t.projects.newAiRecommendation}
              </h3>
              <button
                onClick={() => setShowRecommendationModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.recommendationTitle}</label>
                <input
                  type="text"
                  value={newRecommendation.title || ''}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.description}</label>
                <textarea
                  value={newRecommendation.description || ''}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.recommendationType}</label>
                  <select
                    value={newRecommendation.type || 'optimization'}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, type: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="reallocation">{t.projects.typeReallocation}</option>
                    <option value="optimization">{t.projects.typeOptimization}</option>
                    <option value="risk">{t.projects.typeRisk}</option>
                    <option value="opportunity">{t.projects.typeOpportunity}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.recommendationImpact}</label>
                  <select
                    value={newRecommendation.impact || 'medium'}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, impact: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="low">{t.projects.impactLow}</option>
                    <option value="medium">{t.projects.impactMedium}</option>
                    <option value="high">{t.projects.impactHigh}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.recommendationConfidence}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newRecommendation.confidence || 80}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, confidence: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.projects.recommendationProject}</label>
                  <select
                    value={newRecommendation.projectId || ''}
                    onChange={(e) => setNewRecommendation({ ...newRecommendation, projectId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">{t.projects.selectProject}</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="actionable"
                  checked={newRecommendation.actionable || false}
                  onChange={(e) => setNewRecommendation({ ...newRecommendation, actionable: e.target.checked })}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="actionable" className="text-sm text-slate-700">{t.projects.actionableRecommendation}</label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowRecommendationModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.projects.cancel}
              </button>
              <button
                onClick={handleSaveRecommendation}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.projects.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;