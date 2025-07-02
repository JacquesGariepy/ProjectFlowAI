import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  MoreHorizontal,
  Calendar,
  Target,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { getProjectStats, getTaskStats, calculateCompletionRate } from '../utils/calculations';
import { formatDate, getDaysUntilDeadline, isOverdue } from '../utils/dateUtils';

const Dashboard: React.FC = () => {
  const { state } = useAppContext();
  const { t } = useLanguage();
  const { projects, tasks, users } = state;

  const projectStats = getProjectStats(projects);
  const taskStats = getTaskStats(tasks);
  const completionRate = calculateCompletionRate(tasks);

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const budgetUtilization = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  const overdueTasks = tasks.filter(task => 
    task.status !== 'completed' && isOverdue(task.dueDate)
  ).length;

  const stats = [
    {
      title: t.dashboard.activeProjects,
      value: projectStats.inProgress.toString(),
      change: '+12%',
      isUp: true,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      total: projectStats.total
    },
    {
      title: t.dashboard.pendingTasks,
      value: (taskStats.todo + taskStats.inProgress).toString(),
      change: '+8%',
      isUp: true,
      icon: CheckCircle,
      color: 'from-emerald-500 to-emerald-600',
      total: taskStats.total
    },
    {
      title: t.dashboard.teamMembers,
      value: users.filter(u => u.status === 'active').length.toString(),
      change: '+4%',
      isUp: true,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      total: users.length
    },
    {
      title: t.dashboard.completionRate,
      value: `${completionRate}%`,
      change: completionRate > 90 ? '+5%' : '-2%',
      isUp: completionRate > 90,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      total: 100
    }
  ];

  // Chart data based on real project data
  const monthlyData = [
    { name: 'Jan', tasks: 45, projects: 8, completed: 38 },
    { name: 'Feb', tasks: 52, projects: 10, completed: 47 },
    { name: 'Mar', tasks: 48, projects: 9, completed: 44 },
    { name: 'Apr', tasks: 61, projects: 12, completed: 55 },
    { name: 'May', tasks: 55, projects: 11, completed: 51 },
    { name: 'Jun', tasks: taskStats.total, projects: projectStats.total, completed: taskStats.completed }
  ];

  const pieData = [
    { name: t.dashboard.completed, value: taskStats.completed, color: '#10b981' },
    { name: t.dashboard.inProgress, value: taskStats.inProgress, color: '#3b82f6' },
    { name: t.dashboard.toDo, value: taskStats.todo, color: '#f59e0b' },
    { name: t.dashboard.review, value: taskStats.review, color: '#8b5cf6' }
  ];

  const recentProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)
    .map(project => {
      const projectTasks = tasks.filter(t => t.projectId === project.id);
      const completedTasks = projectTasks.filter(t => t.status === 'completed').length;
      const progress = projectTasks.length > 0 ? Math.round((completedTasks / projectTasks.length) * 100) : 0;
      
      return {
        ...project,
        progress,
        team: project.teamMembers.map(id => users.find(u => u.id === id)?.avatar).filter(Boolean).slice(0, 3)
      };
    });

  // Corriger les "Upcoming Deadlines" - filtrer correctement les projets avec échéances à venir
  const upcomingDeadlines = projects
    .filter(p => {
      if (p.status === 'completed') return false;
      const daysLeft = getDaysUntilDeadline(p.deadline);
      return daysLeft >= 0 && daysLeft <= 30; // Projets avec échéance dans les 30 prochains jours
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  // Navigation functions
  const navigateToProjects = () => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { view: 'projects' } 
    }));
  };

  const navigateToProject = (projectId: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { 
        view: 'projects',
        itemId: projectId,
        itemType: 'project',
        action: 'view'
      } 
    }));
  };

  const navigateToCalendar = () => {
    window.dispatchEvent(new CustomEvent('navigate', { 
      detail: { view: 'calendar' } 
    }));
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                  <div className="flex items-center">
                    {stat.isUp ? (
                      <ArrowUp className="w-4 h-4 text-emerald-500 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500 ml-1">{t.dashboard.vsLastMonth}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      {(overdueTasks > 0 || budgetUtilization > 90) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-red-900">{t.dashboard.attentionRequired}</h3>
          </div>
          <div className="mt-2 space-y-1">
            {overdueTasks > 0 && (
              <p className="text-sm text-red-700">
                {overdueTasks} {overdueTasks > 1 ? t.dashboard.tasksOverdue : t.dashboard.taskOverdue}
              </p>
            )}
            {budgetUtilization > 90 && (
              <p className="text-sm text-red-700">
                {t.dashboard.budgetUtilizationHigh} {budgetUtilization}% {t.dashboard.reviewSpending}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.dashboard.performanceOverview}</h3>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="url(#colorTasks)"
                  name={t.dashboard.totalTasks}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="2"
                  stroke="#10b981"
                  fill="url(#colorCompleted)"
                  name={t.dashboard.completedTasks}
                />
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">{t.dashboard.taskDistribution}</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.dashboard.recentProjects}</h3>
            <button 
              onClick={navigateToProjects}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {t.dashboard.viewAll}
            </button>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => navigateToProject(project.id)}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'review' ? 'bg-orange-100 text-orange-700' :
                        project.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        project.status === 'on-hold' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {project.status === 'in-progress' ? t.dashboard.inProgress :
                        project.status === 'review' ? t.dashboard.review :
                        project.status === 'completed' ? t.dashboard.completed :
                        project.status === 'on-hold' ? t.dashboard.onHold :
                        project.status.replace('-', ' ')}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-500">{formatDate(project.deadline)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{project.progress}%</div>
                    <div className="w-20 h-2 bg-slate-200 rounded-full mt-1">
                      <div
                        className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex -space-x-2">
                    {project.team.map((avatar, i) => (
                      <img
                        key={i}
                        src={avatar}
                        alt=""
                        className="w-8 h-8 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">{t.dashboard.upcomingDeadlines}</h3>
            <button 
              onClick={navigateToCalendar}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              {t.dashboard.viewCalendar}
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((project) => {
                const daysLeft = getDaysUntilDeadline(project.deadline);
                return (
                  <div 
                    key={project.id} 
                    onClick={() => navigateToProject(project.id)}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        daysLeft <= 3 ? 'bg-red-100' : daysLeft <= 7 ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <Clock className={`w-6 h-6 ${
                          daysLeft <= 3 ? 'text-red-600' : daysLeft <= 7 ? 'text-orange-600' : 'text-blue-600'
                        }`} />
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">{project.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-slate-500">{formatDate(project.deadline)}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            daysLeft <= 3 ? 'bg-red-100 text-red-700' :
                            daysLeft <= 7 ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {daysLeft === 0 ? t.dashboard.today : daysLeft === 1 ? `1 ${t.dashboard.dayLeft}` : `${daysLeft} ${t.dashboard.daysLeft}`}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">{project.progress}%</div>
                        <div className="w-16 h-2 bg-slate-200 rounded-full mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              project.progress >= 80 ? 'bg-emerald-500' :
                              project.progress >= 50 ? 'bg-blue-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-slate-900 mb-2">{t.dashboard.noUpcomingDeadlines}</h4>
                <p className="text-slate-600 text-sm">{t.dashboard.allProjectsOnTrack}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;