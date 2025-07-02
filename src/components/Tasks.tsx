import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
  Play,
  Pause,
  CheckCircle,
  Circle,
  Target,
  Brain,
  Sparkles,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Timer,
  Download,
  RefreshCw,
  Settings,
  Bookmark,
  SortAsc,
  SortDesc,
  FilterX
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Task, User as UserType, Project } from '../types';
import { formatDate, getRelativeTime, isOverdue, getDaysUntilDeadline } from '../utils/dateUtils';
import { useTableSort } from '../hooks/useTableSort';
import TableHeader from './TableHeader';

interface TasksProps {
  navigationParams?: {
    itemId?: string;
    itemType?: string;
    action?: string;
  };
  onNavigationComplete?: () => void;
}

const Tasks: React.FC<TasksProps> = ({ navigationParams, onNavigationComplete }) => {
  const { state, dispatch } = useAppContext();
  const { t } = useLanguage();
  const { tasks, users, projects, currentUser } = state;
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [timeEntry, setTimeEntry] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [savedViews, setSavedViews] = useState<any[]>([]);
  const [currentViewName, setCurrentViewName] = useState('');

  // Enhanced table sorting and filtering
  const {
    data: filteredTasks,
    sortConfigs,
    filters,
    searchQuery,
    handleSort,
    handleFilter,
    setSearchQuery,
    resetSort,
    resetFilters,
    resetAll,
    getSortConfig,
    getFilterConfig,
    totalItems,
    filteredItems,
    isFiltered,
    isSorted
  } = useTableSort({
    data: tasks,
    initialSort: [{ key: 'dueDate', direction: 'asc', priority: 1 }],
    initialFilters: {}
  });

  // Handle navigation to specific task
  useEffect(() => {
    if (navigationParams?.itemId && navigationParams?.itemType === 'task') {
      const task = tasks.find(t => t.id === navigationParams.itemId);
      if (task) {
        if (navigationParams.action === 'edit') {
          handleEditTask(task);
        } else {
          handleViewTask(task);
        }
        
        setTimeout(() => {
          const taskElement = document.getElementById(`task-${task.id}`);
          if (taskElement) {
            taskElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            taskElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
            setTimeout(() => {
              taskElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
            }, 2000);
          }
        }, 100);
      }
      
      onNavigationComplete?.();
    } else if (navigationParams?.action === 'create') {
      handleCreateTask();
      onNavigationComplete?.();
    }
  }, [navigationParams, tasks, onNavigationComplete]);

  // Calculate real metrics
  const calculateRealMetrics = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const todoTasks = tasks.filter(t => t.status === 'todo').length;
    const reviewTasks = tasks.filter(t => t.status === 'review').length;
    const overdueTasks = tasks.filter(t => t.status !== 'completed' && isOverdue(t.dueDate)).length;
    
    const myTasks = tasks.filter(t => t.assigneeId === (currentUser?.id || '')).length;
    const myCompletedTasks = tasks.filter(t => t.assigneeId === (currentUser?.id || '') && t.status === 'completed').length;
    const myProgress = myTasks > 0 ? Math.round((myCompletedTasks / myTasks) * 100) : 0;
    
    const totalTimeTracked = tasks.reduce((sum, t) => sum + t.timeTracked, 0);
    const totalEstimatedTime = tasks.reduce((sum, t) => sum + t.estimatedTime, 0);
    const timeEfficiency = totalEstimatedTime > 0 ? Math.round((totalTimeTracked / totalEstimatedTime) * 100) : 0;

    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      reviewTasks,
      overdueTasks,
      myTasks,
      myProgress,
      totalTimeTracked,
      timeEfficiency,
      completionRate: Math.round((completedTasks / totalTasks) * 100)
    };
  };

  const metrics = calculateRealMetrics();

  // Task actions
  const handleCreateTask = () => {
    setSelectedTask({
      id: '',
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      assigneeId: currentUser?.id || '',
      projectId: projects[0]?.id || '',
      dueDate: '',
      createdDate: '',
      tags: [],
      comments: [],
      timeTracked: 0,
      estimatedTime: 8
    });
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
    setActiveDropdown(null);
  };

  const handleViewTask = (task: Task) => {
    setViewingTask(task);
    setShowViewModal(true);
    setActiveDropdown(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDeleteTask = () => {
    if (taskToDelete) {
      const task = tasks.find(t => t.id === taskToDelete);
      dispatch({ type: 'DELETE_TASK', payload: taskToDelete });
      setShowDeleteModal(false);
      setTaskToDelete(null);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: t.tasks.taskDeleted,
          message: `${t.tasks.taskTitle} "${task?.title}" ${t.tasks.taskDeletedMessage}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    dispatch({ 
      type: 'UPDATE_TASK_STATUS', 
      payload: { taskId, status: newStatus }
    });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: t.tasks.statusUpdated,
        message: `${t.tasks.statusUpdatedMessage} "${newStatus}"`,
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const saveTask = () => {
    if (selectedTask) {
      if (selectedTask.id) {
        const updatedTask = {
          ...selectedTask,
          updatedAt: new Date().toISOString()
        };
        
        const taskIndex = tasks.findIndex(t => t.id === selectedTask.id);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = updatedTask;
          
          dispatch({ type: 'UPDATE_TASK_STATUS', payload: { taskId: selectedTask.id, status: selectedTask.status } });
          Object.assign(tasks[taskIndex], updatedTask);
        }
      } else {
        const newTask: Task = {
          ...selectedTask,
          id: Date.now().toString(),
          createdDate: new Date().toISOString(),
          comments: [],
          timeTracked: 0,
          estimatedTime: selectedTask.estimatedTime || 8
        };
        dispatch({ type: 'ADD_TASK', payload: newTask });
      }
      
      setShowTaskModal(false);
      setSelectedTask(null);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: selectedTask.id ? t.tasks.taskUpdated : t.tasks.taskCreated,
          message: `${t.tasks.taskTitle} "${selectedTask.title}" ${t.tasks.taskSavedMessage} ${selectedTask.id ? t.tasks.taskSavedUpdated : t.tasks.taskSavedCreated} ${t.tasks.successMessage}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  const addComment = () => {
    if (newComment.trim() && viewingTask) {
      const comment = {
        id: Date.now().toString(),
        content: newComment,
        authorId: currentUser?.id || '',
        createdAt: new Date().toISOString()
      };
      
      const updatedTask = {
        ...viewingTask,
        comments: [...viewingTask.comments, comment]
      };
      
      setViewingTask(updatedTask);
      setNewComment('');
      
      const taskIndex = tasks.findIndex(t => t.id === viewingTask.id);
      if (taskIndex !== -1) {
        Object.assign(tasks[taskIndex], updatedTask);
      }
    }
  };

  const addTimeEntry = () => {
    if (timeEntry && viewingTask) {
      const hours = parseFloat(timeEntry);
      if (!isNaN(hours)) {
        const updatedTask = {
          ...viewingTask,
          timeTracked: viewingTask.timeTracked + hours
        };
        
        setViewingTask(updatedTask);
        setTimeEntry('');
        
        const taskIndex = tasks.findIndex(t => t.id === viewingTask.id);
        if (taskIndex !== -1) {
          Object.assign(tasks[taskIndex], updatedTask);
        }
      }
    }
  };

  // Export filtered data
  const handleExport = () => {
    const exportData = filteredTasks.map(task => {
      const assignee = users.find(u => u.id === task.assigneeId);
      const project = projects.find(p => p.id === task.projectId);
      
      return {
        [t.tasks.title]: task.title,
        [t.tasks.description]: task.description,
        [t.tasks.status]: task.status,
        [t.tasks.priority]: task.priority,
        [t.tasks.assignee]: assignee?.name || '',
        [t.tasks.project]: project?.name || '',
        [t.tasks.deadline]: task.dueDate,
        [t.tasks.timeTracked]: `${task.timeTracked}${t.tasks.hours}`,
        [t.tasks.estimatedTime]: `${task.estimatedTime}${t.tasks.hours}`,
        [t.tasks.tags]: task.tags.join(', ')
      };
    });

    const csv = [
      Object.keys(exportData[0]).join(','),
      ...exportData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Save current view
  const handleSaveView = () => {
    if (currentViewName.trim()) {
      const view = {
        id: Date.now().toString(),
        name: currentViewName,
        sortConfigs,
        filters,
        searchQuery,
        createdAt: new Date().toISOString()
      };
      
      setSavedViews(prev => [...prev, view]);
      setCurrentViewName('');
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: t.tasks.viewSaved,
          message: `${t.tasks.viewName} "${view.name}" ${t.tasks.viewSavedMessage}`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  // Load saved view
  const handleLoadView = (view: any) => {
    // This would require extending the useTableSort hook to accept external state
    // For now, we'll show a notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        id: Date.now().toString(),
        title: t.tasks.viewLoaded,
        message: `${t.tasks.viewName} "${view.name}" ${t.tasks.viewLoadedMessage}`,
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'review': return 'bg-orange-100 text-orange-700';
      case 'todo': return 'bg-slate-100 text-slate-700';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Play;
      case 'review': return Eye;
      case 'todo': return Circle;
      default: return Circle;
    }
  };

  // Column configurations for filtering
  const columnConfigs = {
    title: {
      type: 'text' as const,
      placeholder: t.tasks.searchByTitle
    },
    status: {
      type: 'select' as const,
      options: [
        { value: 'todo', label: t.tasks.statusTodo },
        { value: 'in-progress', label: t.tasks.statusInProgress },
        { value: 'review', label: t.tasks.statusReview },
        { value: 'completed', label: t.tasks.statusCompleted }
      ]
    },
    priority: {
      type: 'select' as const,
      options: [
        { value: 'low', label: t.tasks.priorityLow },
        { value: 'medium', label: t.tasks.priorityMedium },
        { value: 'high', label: t.tasks.priorityHigh }
      ]
    },
    assigneeId: {
      type: 'select' as const,
      options: users.map(user => ({ value: user.id, label: user.name }))
    },
    projectId: {
      type: 'select' as const,
      options: projects.map(project => ({ value: project.id, label: project.name }))
    },
    dueDate: {
      type: 'date' as const
    },
    timeTracked: {
      type: 'number' as const,
      placeholder: t.tasks.hoursLabel + '...'
    },
    estimatedTime: {
      type: 'number' as const,
      placeholder: t.tasks.hoursLabel + '...'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
            <CheckSquare className="w-8 h-8 text-blue-600" />
            <span>{t.tasks.title}</span>
          </h1>
          <p className="text-slate-600 mt-1">{t.tasks.subtitle}</p>
        </div>
        <button
          onClick={handleCreateTask}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{t.tasks.newTask}</span>
        </button>
      </div>

      {/* Real Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.tasks.totalTasks}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.totalTasks}</p>
              <p className="text-sm text-slate-500">{metrics.completedTasks} {t.tasks.completedTasks}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.tasks.myTasksMetric}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.myTasks}</p>
              <p className="text-sm text-slate-500">{metrics.myProgress}{t.tasks.completedPercentage}</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <User className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.tasks.timeTracked}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.totalTimeTracked}{t.tasks.hours}</p>
              <p className="text-sm text-slate-500">{metrics.timeEfficiency}{t.tasks.efficiency}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">{t.tasks.overdueTasks}</p>
              <p className="text-3xl font-bold text-slate-900">{metrics.overdueTasks}</p>
              <p className="text-sm text-slate-500">{t.tasks.attentionRequired}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-6 h-6" />
              <h3 className="text-xl font-bold">{t.tasks.aiInsightsTitle}</h3>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">{t.tasks.productivity}</span>
                </div>
                <p className="text-2xl font-bold">+23%</p>
                <p className="text-sm opacity-90">{t.tasks.vsLastMonth}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">{t.tasks.aiAccuracy}</span>
                </div>
                <p className="text-2xl font-bold">94.2%</p>
                <p className="text-sm opacity-90">{t.tasks.exactPredictions}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">{t.tasks.collaboration}</span>
                </div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm opacity-90">{t.tasks.teamScore}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters and Controls */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={t.tasks.globalSearch}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Status */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">
                {filteredItems} / {totalItems} {t.tasks.tasksCount}
              </span>
              {isFiltered && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {t.tasks.filtered}
                </span>
              )}
              {isSorted && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {t.tasks.sorted}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Saved Views */}
            {savedViews.length > 0 && (
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    const view = savedViews.find(v => v.id === e.target.value);
                    if (view) handleLoadView(view);
                  }
                }}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">{t.tasks.savedViews}</option>
                {savedViews.map(view => (
                  <option key={view.id} value={view.id}>{view.name}</option>
                ))}
              </select>
            )}

            {/* Save View */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={t.tasks.viewName}
                value={currentViewName}
                onChange={(e) => setCurrentViewName(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-32"
              />
              <button
                onClick={handleSaveView}
                disabled={!currentViewName.trim()}
                className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm disabled:opacity-50"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {/* Export */}
            <button
              onClick={handleExport}
              className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center space-x-1"
            >
              <Download className="w-4 h-4" />
              <span>{t.tasks.export}</span>
            </button>

            {/* Reset */}
            <button
              onClick={resetAll}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm flex items-center space-x-1"
            >
              <RefreshCw className="w-4 h-4" />
              <span>{t.tasks.reset}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Tasks Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <TableHeader
                  title={t.tasks.task}
                  sortKey="title"
                  sortConfig={getSortConfig('title')}
                  filterConfig={getFilterConfig('title')}
                  filterOptions={columnConfigs.title}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <TableHeader
                  title={t.tasks.status}
                  sortKey="status"
                  sortConfig={getSortConfig('status')}
                  filterConfig={getFilterConfig('status')}
                  filterOptions={columnConfigs.status}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <TableHeader
                  title={t.tasks.priority}
                  sortKey="priority"
                  sortConfig={getSortConfig('priority')}
                  filterConfig={getFilterConfig('priority')}
                  filterOptions={columnConfigs.priority}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <TableHeader
                  title={t.tasks.assigned}
                  sortKey="assigneeId"
                  sortConfig={getSortConfig('assigneeId')}
                  filterConfig={getFilterConfig('assigneeId')}
                  filterOptions={columnConfigs.assigneeId}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <TableHeader
                  title={t.tasks.project}
                  sortKey="projectId"
                  sortConfig={getSortConfig('projectId')}
                  filterConfig={getFilterConfig('projectId')}
                  filterOptions={columnConfigs.projectId}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <TableHeader
                  title={t.tasks.deadline}
                  sortKey="dueDate"
                  sortConfig={getSortConfig('dueDate')}
                  filterConfig={getFilterConfig('dueDate')}
                  filterOptions={columnConfigs.dueDate}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <TableHeader
                  title={t.tasks.time}
                  sortKey="timeTracked"
                  sortConfig={getSortConfig('timeTracked')}
                  filterConfig={getFilterConfig('timeTracked')}
                  filterOptions={columnConfigs.timeTracked}
                  onSort={handleSort}
                  onFilter={handleFilter}
                />
                <th className="text-center py-4 px-6 font-medium text-slate-900">{t.tasks.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTasks.map((task) => {
                const assignee = users.find(u => u.id === task.assigneeId);
                const project = projects.find(p => p.id === task.projectId);
                const daysLeft = getDaysUntilDeadline(task.dueDate);
                const StatusIcon = getStatusIcon(task.status);

                return (
                  <tr 
                    key={task.id} 
                    id={`task-${task.id}`}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => {
                            const newStatus = task.status === 'completed' ? 'todo' : 
                                           task.status === 'todo' ? 'in-progress' :
                                           task.status === 'in-progress' ? 'review' : 'completed';
                            handleStatusChange(task.id, newStatus);
                          }}
                          className="flex-shrink-0"
                        >
                          <StatusIcon className={`w-5 h-5 ${
                            task.status === 'completed' ? 'text-emerald-600' :
                            task.status === 'in-progress' ? 'text-blue-600' :
                            task.status === 'review' ? 'text-orange-600' :
                            'text-slate-400'
                          }`} />
                        </button>
                        <div>
                          <h4 className="font-medium text-slate-900">{task.title}</h4>
                          <p className="text-sm text-slate-600 line-clamp-1">{task.description}</p>
                          {task.tags.length > 0 && (
                            <div className="flex items-center space-x-1 mt-1">
                              {task.tags.slice(0, 2).map((tag, index) => (
                                <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                              {task.tags.length > 2 && (
                                <span className="text-xs text-slate-500">+{task.tags.length - 2}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                        {task.status === 'todo' ? t.tasks.statusTodo :
                         task.status === 'in-progress' ? t.tasks.statusInProgress :
                         task.status === 'review' ? t.tasks.statusReview :
                         t.tasks.statusCompleted}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? t.tasks.priorityHigh :
                         task.priority === 'medium' ? t.tasks.priorityMedium : t.tasks.priorityLow}
                      </span>
                    </td>
                    
                    <td className="py-4 px-6">
                      {assignee && (
                        <div className="flex items-center space-x-2">
                          <img
                            src={assignee.avatar}
                            alt={assignee.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm text-slate-900">{assignee.name}</span>
                        </div>
                      )}
                    </td>
                    
                    <td className="py-4 px-6">
                      {project && (
                        <span className="text-sm text-slate-600">{project.name}</span>
                      )}
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="text-slate-900">{formatDate(task.dueDate)}</div>
                        <div className={`text-xs ${
                          daysLeft < 0 ? 'text-red-600' :
                          daysLeft <= 3 ? 'text-orange-600' : 'text-slate-500'
                        }`}>
                          {daysLeft < 0 ? `${Math.abs(daysLeft)} ${t.tasks.daysLate}` :
                           daysLeft === 0 ? t.tasks.todayDeadline :
                           `${daysLeft} ${t.tasks.daysRemaining}`}
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="text-slate-900">{task.timeTracked}{t.tasks.hours} / {task.estimatedTime}{t.tasks.hours}</div>
                        <div className="w-16 h-1 bg-slate-200 rounded-full mt-1">
                          <div
                            className={`h-1 rounded-full ${
                              task.timeTracked > task.estimatedTime ? 'bg-red-500' :
                              task.timeTracked / task.estimatedTime > 0.8 ? 'bg-orange-500' :
                              'bg-emerald-500'
                            }`}
                            style={{ width: `${Math.min((task.timeTracked / task.estimatedTime) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    
                    <td className="py-4 px-6">
                      <div className="relative">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === task.id ? null : task.id)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-slate-500" />
                        </button>
                        
                        {activeDropdown === task.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-10">
                            <button
                              onClick={() => handleViewTask(task)}
                              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Eye className="w-4 h-4 mr-3" />
                              {t.tasks.view}
                            </button>
                            <button
                              onClick={() => handleEditTask(task)}
                              className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Edit className="w-4 h-4 mr-3" />
                              {t.tasks.edit}
                            </button>
                            <hr className="my-2" />
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-3" />
                              {t.tasks.delete}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">{t.tasks.noTasksFound}</h3>
            <p className="text-slate-600 mb-4">
              {isFiltered 
                ? t.tasks.noTasksFiltered
                : t.tasks.createFirstTask
              }
            </p>
            <button
              onClick={isFiltered ? resetAll : handleCreateTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isFiltered ? t.tasks.resetFilters : t.tasks.createTask}
            </button>
          </div>
        )}
      </div>

      {/* Task Edit Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                {selectedTask.id ? t.tasks.editTask : t.tasks.newTaskModal}
              </h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.title}</label>
                <input
                  type="text"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.description}</label>
                <textarea
                  value={selectedTask.description}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.status}</label>
                  <select
                    value={selectedTask.status}
                    onChange={(e) => setSelectedTask({ ...selectedTask, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="todo">{t.tasks.statusTodo}</option>
                    <option value="in-progress">{t.tasks.statusInProgress}</option>
                    <option value="review">{t.tasks.statusReview}</option>
                    <option value="completed">{t.tasks.statusCompleted}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.priority}</label>
                  <select
                    value={selectedTask.priority}
                    onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">{t.tasks.priorityLow}</option>
                    <option value="medium">{t.tasks.priorityMedium}</option>
                    <option value="high">{t.tasks.priorityHigh}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.assignee}</label>
                  <select
                    value={selectedTask.assigneeId}
                    onChange={(e) => setSelectedTask({ ...selectedTask, assigneeId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.project}</label>
                  <select
                    value={selectedTask.projectId}
                    onChange={(e) => setSelectedTask({ ...selectedTask, projectId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.dueDate}</label>
                  <input
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => setSelectedTask({ ...selectedTask, dueDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.estimatedTime}</label>
                  <input
                    type="number"
                    value={selectedTask.estimatedTime}
                    onChange={(e) => setSelectedTask({ ...selectedTask, estimatedTime: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.tasks.tagsSeparator}</label>
                <input
                  type="text"
                  value={selectedTask.tags.join(', ')}
                  onChange={(e) => setSelectedTask({ 
                    ...selectedTask, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                  })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={t.tasks.tagsPlaceholder}
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowTaskModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.tasks.cancel}
              </button>
              <button
                onClick={saveTask}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{t.tasks.save}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task View Modal */}
      {showViewModal && viewingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(viewingTask.status)}`}>
                  {React.createElement(getStatusIcon(viewingTask.status), { className: "w-5 h-5" })}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{viewingTask.title}</h3>
                  <p className="text-sm text-slate-600">
                    {t.tasks.createdOn} {formatDate(viewingTask.createdDate)} • 
                    {viewingTask.completedDate && ` ${t.tasks.completedOn} ${formatDate(viewingTask.completedDate)}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>{t.tasks.description}</span>
                  </h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">{viewingTask.description}</p>
                </div>

                {/* Comments */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{t.tasks.comments} ({viewingTask.comments.length})</span>
                  </h4>
                  
                  <div className="space-y-3 mb-4">
                    {viewingTask.comments.map((comment) => {
                      const author = users.find(u => u.id === comment.authorId);
                      return (
                        <div key={comment.id} className="flex space-x-3 p-3 bg-slate-50 rounded-lg">
                          <img
                            src={author?.avatar}
                            alt={author?.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-slate-900">{author?.name}</span>
                              <span className="text-xs text-slate-500">{getRelativeTime(comment.createdAt)}</span>
                            </div>
                            <p className="text-slate-700">{comment.content}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={t.tasks.addComment}
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addComment()}
                    />
                    <button
                      onClick={addComment}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {t.tasks.send}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Details */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3">{t.tasks.details}</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-slate-600">{t.tasks.status}:</span>
                      <div className="mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(viewingTask.status)}`}>
                          {viewingTask.status === 'todo' ? t.tasks.statusTodo :
                           viewingTask.status === 'in-progress' ? t.tasks.statusInProgress :
                           viewingTask.status === 'review' ? t.tasks.statusReview :
                           t.tasks.statusCompleted}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-slate-600">{t.tasks.priority}:</span>
                      <div className="mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(viewingTask.priority)}`}>
                          {viewingTask.priority === 'high' ? t.tasks.priorityHigh :
                           viewingTask.priority === 'medium' ? t.tasks.priorityMedium : t.tasks.priorityLow}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-slate-600">{t.tasks.assignee}:</span>
                      <div className="mt-1 flex items-center space-x-2">
                        {(() => {
                          const assignee = users.find(u => u.id === viewingTask.assigneeId);
                          return assignee ? (
                            <>
                              <img src={assignee.avatar} alt={assignee.name} className="w-6 h-6 rounded-full object-cover" />
                              <span className="text-sm text-slate-900">{assignee.name}</span>
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-slate-600">{t.tasks.project}:</span>
                      <div className="mt-1">
                        <span className="text-sm text-slate-900">
                          {projects.find(p => p.id === viewingTask.projectId)?.name}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-slate-600">{t.tasks.deadline}:</span>
                      <div className="mt-1">
                        <span className="text-sm text-slate-900">{formatDate(viewingTask.dueDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Tracking */}
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                    <Timer className="w-4 h-4" />
                    <span>{t.tasks.timeTracking}</span>
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{t.tasks.timeTracked}:</span>
                        <span className="font-medium text-slate-900">{viewingTask.timeTracked}{t.tasks.hours}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">{t.tasks.estimatedTime}:</span>
                        <span className="font-medium text-slate-900">{viewingTask.estimatedTime}{t.tasks.hours}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            viewingTask.timeTracked > viewingTask.estimatedTime ? 'bg-red-500' :
                            viewingTask.timeTracked / viewingTask.estimatedTime > 0.8 ? 'bg-orange-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min((viewingTask.timeTracked / viewingTask.estimatedTime) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="number"
                        step="0.5"
                        value={timeEntry}
                        onChange={(e) => setTimeEntry(e.target.value)}
                        placeholder={t.tasks.hoursLabel}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <button
                        onClick={addTimeEntry}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        {t.tasks.addTime}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {viewingTask.tags.length > 0 && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>{t.tasks.tags}</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {viewingTask.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleEditTask(viewingTask);
                    }}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>{t.tasks.edit}</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleDeleteTask(viewingTask.id);
                    }}
                    className="w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{t.tasks.delete}</span>
                  </button>
                </div>
              </div>
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
                <h3 className="text-lg font-semibold text-slate-900">{t.tasks.deleteTask}</h3>
                <p className="text-sm text-slate-600">{t.tasks.deleteConfirmation}</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              {t.tasks.deleteWarning}
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {t.tasks.cancel}
              </button>
              <button
                onClick={confirmDeleteTask}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t.tasks.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;