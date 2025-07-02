import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  Target,
  Star,
  UserPlus,
  Settings,
  Eye,
  Shield,
  Crown,
  Briefcase,
  Upload,
  Camera
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { User, Team as TeamType } from '../types';
import { formatDate } from '../utils/dateUtils';

interface TeamProps {
  navigationParams?: {
    itemId?: string;
    itemType?: string;
    action?: string;
  };
  onNavigationComplete?: () => void;
}

const Team: React.FC<TeamProps> = ({ navigationParams, onNavigationComplete }) => {
  const { state, dispatch } = useAppContext();
  const { users, teams, currentUser, projects, tasks } = state;
  
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(teams[0] || null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle navigation to specific user
  useEffect(() => {
    if (navigationParams?.itemId && navigationParams?.itemType === 'user') {
      const user = users.find(u => u.id === navigationParams.itemId);
      if (user) {
        handleViewUser(user);
        
        // Scroll to user if it exists in the list
        setTimeout(() => {
          const userElement = document.getElementById(`user-${user.id}`);
          if (userElement) {
            userElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            userElement.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
            setTimeout(() => {
              userElement.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
            }, 2000);
          }
        }, 100);
      }
      
      // Notify that navigation is complete
      onNavigationComplete?.();
    } else if (navigationParams?.action === 'create') {
      // Handle create action
      handleCreateUser();
      onNavigationComplete?.();
    }
  }, [navigationParams, users, onNavigationComplete]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Get team members
  const getTeamMembers = (teamId?: string) => {
    if (!teamId) return users;
    return users.filter(user => user.teamId === teamId);
  };

  // Filter users
  const filteredUsers = getTeamMembers(selectedTeam?.id).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || user.department === filterDepartment;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Calculate team stats
  const calculateTeamStats = (teamId?: string) => {
    const teamMembers = getTeamMembers(teamId);
    const totalMembers = teamMembers.length;
    const activeMembers = teamMembers.filter(u => u.status === 'active').length;
    const avgPerformance = teamMembers.length > 0 
      ? Math.round(teamMembers.reduce((sum, u) => sum + u.performance, 0) / teamMembers.length)
      : 0;
    const totalTasksCompleted = teamMembers.reduce((sum, u) => sum + u.tasksCompleted, 0);
    
    return {
      totalMembers,
      activeMembers,
      avgPerformance,
      totalTasksCompleted
    };
  };

  const teamStats = calculateTeamStats(selectedTeam?.id);

  // User actions
  const handleCreateUser = () => {
    const newUser: User = {
      id: '',
      name: '',
      email: '',
      avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
      role: '',
      department: '',
      phone: '',
      location: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      skills: [],
      projects: [],
      tasksCompleted: 0,
      performance: 85,
      teamId: selectedTeam?.id // Assigner automatiquement à l'équipe sélectionnée
    };
    
    setSelectedUser(newUser);
    setSelectedImage(null);
    setIsCreatingUser(true);
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setSelectedImage(null);
    setIsCreatingUser(false);
    setShowUserModal(true);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setSelectedImage(null);
    setIsCreatingUser(false);
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const user = users.find(u => u.id === userToDelete);
      dispatch({ type: 'DELETE_USER', payload: userToDelete });
      setShowDeleteModal(false);
      setUserToDelete(null);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: 'Utilisateur supprimé',
          message: `${user?.name} a été supprimé de l'équipe`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  // Photo upload handlers
  const handlePhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setIsUploadingImage(true);
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setSelectedImage(imageUrl);
          if (selectedUser) {
            setSelectedUser({ ...selectedUser, avatar: imageUrl });
          }
          setIsUploadingImage(false);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Veuillez sélectionner un fichier image valide.');
      }
    }
  };

  const saveUser = () => {
    if (selectedUser) {
      if (isCreatingUser) {
        const newUser: User = {
          ...selectedUser,
          id: Date.now().toString(),
          teamId: selectedTeam?.id // S'assurer que l'utilisateur est dans l'équipe sélectionnée
        };
        dispatch({ type: 'ADD_USER', payload: newUser });
        
        // Mettre à jour l'équipe pour inclure le nouveau membre
        if (selectedTeam) {
          const updatedTeam: TeamType = {
            ...selectedTeam,
            members: [...selectedTeam.members, newUser.id],
            updatedAt: new Date().toISOString()
          };
          dispatch({ type: 'UPDATE_TEAM', payload: updatedTeam });
        }
      } else {
        dispatch({ type: 'UPDATE_USER', payload: selectedUser });
      }
      
      setShowUserModal(false);
      setSelectedUser(null);
      setSelectedImage(null);
      setIsCreatingUser(false);
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: Date.now().toString(),
          title: isCreatingUser ? 'Utilisateur ajouté' : 'Utilisateur mis à jour',
          message: `${selectedUser.name} a été ${isCreatingUser ? 'ajouté à' : 'mis à jour dans'} l'équipe`,
          type: 'success',
          isRead: false,
          createdAt: new Date().toISOString()
        }
      });
    }
  };

  // Team actions
  const handleCreateTeam = () => {
    const newTeam: TeamType = {
      id: '',
      name: '',
      description: '',
      color: '#3B82F6',
      leaderId: currentUser?.id || 'unknown-user',
      members: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setSelectedTeam(newTeam);
    setIsCreatingTeam(true);
    setShowTeamModal(true);
  };

  const handleEditTeam = (team: TeamType) => {
    setSelectedTeam(team);
    setIsCreatingTeam(false);
    setShowTeamModal(true);
  };

  const saveTeam = () => {
    if (selectedTeam) {
      if (isCreatingTeam) {
        const newTeam: TeamType = {
          ...selectedTeam,
          id: Date.now().toString()
        };
        dispatch({ type: 'ADD_TEAM', payload: newTeam });
        setSelectedTeam(newTeam);
      } else {
        dispatch({ type: 'UPDATE_TEAM', payload: selectedTeam });
      }
      
      setShowTeamModal(false);
      setIsCreatingTeam(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'vacation': return 'bg-blue-100 text-blue-700';
      case 'busy': return 'bg-orange-100 text-orange-700';
      case 'offline': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-600';
    if (performance >= 85) return 'text-blue-600';
    if (performance >= 75) return 'text-orange-600';
    return 'text-red-600';
  };

  const renderUserCard = (user: User) => {
    const userProjects = projects.filter(p => p.teamMembers.includes(user.id));
    const userTasks = tasks.filter(t => t.assigneeId === user.id);
    const completedTasks = userTasks.filter(t => t.status === 'completed').length;
    const isTeamLeader = selectedTeam?.leaderId === user.id;

    return (
      <div 
        key={user.id} 
        id={`user-${user.id}`}
        className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-200"
                />
                {isTeamLeader && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  user.status === 'active' ? 'bg-green-500' :
                  user.status === 'vacation' ? 'bg-blue-500' :
                  user.status === 'busy' ? 'bg-orange-500' : 'bg-slate-400'
                }`}></div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900">{user.name}</h3>
                <p className="text-sm text-slate-600">{user.role}</p>
                <p className="text-xs text-slate-500">{user.department}</p>
              </div>
            </div>
            
            <div className="relative dropdown-container">
              <button
                onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-500" />
              </button>
              
              {/* Dropdown Menu */}
              {activeDropdown === user.id && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                  <button
                    onClick={() => {
                      handleViewUser(user);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir le profil</span>
                  </button>
                  <button
                    onClick={() => {
                      handleEditUser(user);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-slate-700"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Modifier</span>
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteUser(user.id);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center space-x-2 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Performance</span>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getPerformanceColor(user.performance)}`}>
                  {user.performance}%
                </span>
                <TrendingUp className={`w-4 h-4 ${getPerformanceColor(user.performance)}`} />
              </div>
            </div>
            
            <div className="w-full h-2 bg-slate-200 rounded-full">
              <div
                className={`h-2 rounded-full ${
                  user.performance >= 95 ? 'bg-green-500' :
                  user.performance >= 85 ? 'bg-blue-500' :
                  user.performance >= 75 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${user.performance}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-900">{userProjects.length}</div>
              <div className="text-xs text-slate-600">Projets</div>
            </div>
            <div className="text-center p-3 bg-slate-50 rounded-lg">
              <div className="text-lg font-bold text-slate-900">{completedTasks}</div>
              <div className="text-xs text-slate-600">Tâches</div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(user.status)}`}>
              {user.status === 'active' ? 'Actif' :
               user.status === 'vacation' ? 'En congé' :
               user.status === 'busy' ? 'Occupé' : 'Hors ligne'}
            </span>
            
            <div className="flex items-center space-x-1 text-xs text-slate-500">
              <Calendar className="w-3 h-3" />
              <span>Depuis {formatDate(user.joinDate)}</span>
            </div>
          </div>

          {user.skills.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {user.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
                {user.skills.length > 3 && (
                  <span className="text-xs text-slate-500">+{user.skills.length - 3}</span>
                )}
              </div>
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => handleViewUser(user)}
              className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
            >
              Voir profil
            </button>
            <button
              onClick={() => handleEditUser(user)}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderUserList = (user: User) => {
    const userProjects = projects.filter(p => p.teamMembers.includes(user.id));
    const userTasks = tasks.filter(t => t.assigneeId === user.id);
    const completedTasks = userTasks.filter(t => t.status === 'completed').length;
    const isTeamLeader = selectedTeam?.leaderId === user.id;

    return (
      <div 
        key={user.id} 
        id={`user-${user.id}`}
        className="bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all duration-300 p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-200"
              />
              {isTeamLeader && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                user.status === 'active' ? 'bg-green-500' :
                user.status === 'vacation' ? 'bg-blue-500' :
                user.status === 'busy' ? 'bg-orange-500' : 'bg-slate-400'
              }`}></div>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-900">{user.name}</h3>
              <p className="text-sm text-slate-600">{user.role} • {user.department}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-sm font-medium text-slate-900">{user.performance}%</div>
              <div className="text-xs text-slate-500">Performance</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium text-slate-900">{userProjects.length}</div>
              <div className="text-xs text-slate-500">Projets</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm font-medium text-slate-900">{completedTasks}</div>
              <div className="text-xs text-slate-500">Tâches</div>
            </div>

            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(user.status)}`}>
              {user.status === 'active' ? 'Actif' :
               user.status === 'vacation' ? 'En congé' :
               user.status === 'busy' ? 'Occupé' : 'Hors ligne'}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleViewUser(user)}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                Voir
              </button>
              <button
                onClick={() => handleEditUser(user)}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <span>Équipe</span>
          </h1>
          <p className="text-slate-600 mt-1">Gérez vos équipes et collaborateurs</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCreateTeam}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle Équipe</span>
          </button>
          
          <button
            onClick={handleCreateUser}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <UserPlus className="w-5 h-5" />
            <span>Ajouter Membre</span>
          </button>
        </div>
      </div>

      {/* Team Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="font-semibold text-slate-900">Équipes</h3>
            <div className="flex space-x-2">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team)}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                    selectedTeam?.id === team.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: team.color }}
                  ></div>
                  <span className="font-medium">{team.name}</span>
                  <span className="text-xs bg-white/50 px-2 py-0.5 rounded-full">
                    {getTeamMembers(team.id).length}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setSelectedTeam(null)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !selectedTeam
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Tous les utilisateurs
              </button>
            </div>
          </div>

          {selectedTeam && (
            <button
              onClick={() => handleEditTeam(selectedTeam)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-500" />
            </button>
          )}
        </div>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Membres</p>
              <p className="text-2xl font-bold text-slate-900">{teamStats.totalMembers}</p>
              <p className="text-xs text-slate-500">{teamStats.activeMembers} actifs</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Performance Moy.</p>
              <p className="text-2xl font-bold text-slate-900">{teamStats.avgPerformance}%</p>
              <p className="text-xs text-slate-500">Équipe performante</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Tâches Terminées</p>
              <p className="text-2xl font-bold text-slate-900">{teamStats.totalTasksCompleted}</p>
              <p className="text-xs text-slate-500">Total équipe</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600">Top Performer</p>
              <p className="text-lg font-bold text-slate-900">
                {getTeamMembers(selectedTeam?.id)
                  .sort((a, b) => b.performance - a.performance)[0]?.name.split(' ')[0] || 'N/A'}
              </p>
              <p className="text-xs text-slate-500">Meilleure performance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher des membres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les départements</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Analytics">Analytics</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="vacation">En congé</option>
              <option value="busy">Occupé</option>
              <option value="offline">Hors ligne</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="w-4 h-4 flex flex-col space-y-1">
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
                <div className="h-0.5 bg-current rounded"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredUsers.map(user => viewMode === 'grid' ? renderUserCard(user) : renderUserList(user))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun membre trouvé</h3>
          <p className="text-slate-600 mb-4">
            {selectedTeam 
              ? `Aucun membre dans l'équipe "${selectedTeam.name}" ne correspond à vos critères.`
              : 'Aucun utilisateur ne correspond à vos critères de recherche.'
            }
          </p>
          <button
            onClick={handleCreateUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ajouter un membre
          </button>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                {isCreatingUser ? 'Ajouter un membre' : 'Modifier le profil'}
              </h3>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                  setSelectedImage(null);
                  setIsCreatingUser(false);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Photo Upload Section */}
              <div className="flex flex-col items-center space-y-4 pb-4 border-b border-slate-200">
                <div className="relative">
                  <img
                    src={selectedImage || selectedUser.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-200"
                  />
                  <button
                    onClick={handlePhotoUpload}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    disabled={isUploadingImage}
                  >
                    {isUploadingImage ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-slate-600">Cliquez sur l'icône pour changer la photo</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rôle</label>
                  <input
                    type="text"
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Département</label>
                  <select
                    value={selectedUser.department}
                    onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner un département</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Analytics">Analytics</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={selectedUser.phone || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Localisation</label>
                  <input
                    type="text"
                    value={selectedUser.location || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, location: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Statut</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Actif</option>
                    <option value="vacation">En congé</option>
                    <option value="busy">Occupé</option>
                    <option value="offline">Hors ligne</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Équipe</label>
                  <select
                    value={selectedUser.teamId || ''}
                    onChange={(e) => setSelectedUser({ ...selectedUser, teamId: e.target.value || undefined })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Aucune équipe</option>
                    {teams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Compétences (séparées par des virgules)</label>
                <input
                  type="text"
                  value={selectedUser.skills.join(', ')}
                  onChange={(e) => {
                    const skillsText = e.target.value;
                    // Only split and filter on blur, not on every change
                    setSelectedUser({
                      ...selectedUser,
                      skills: skillsText.split(',').map(skill => skill.trim())
                    });
                  }}
                  onBlur={(e) => {
                    // Filter out empty skills on blur
                    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
                    setSelectedUser({
                      ...selectedUser,
                      skills
                    });
                  }}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, Node.js"
                />
              </div>

              {!isCreatingUser && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{selectedUser.performance}%</div>
                    <div className="text-sm text-slate-600">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{selectedUser.tasksCompleted}</div>
                    <div className="text-sm text-slate-600">Tâches terminées</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{selectedUser.projects.length}</div>
                    <div className="text-sm text-slate-600">Projets actifs</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                  setSelectedImage(null);
                  setIsCreatingUser(false);
                }}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {isCreatingUser ? 'Annuler' : 'Fermer'}
              </button>
              
              {/* Save button - now shows for both create AND edit modes */}
              <button
                onClick={saveUser}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingUser ? 'Ajouter à l\'équipe' : 'Sauvegarder'}</span>
              </button>
              
              {/* Delete button - only show in edit mode */}
              {!isCreatingUser && (
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Supprimer</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Team Modal */}
      {showTeamModal && selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-slate-900">
                {isCreatingTeam ? 'Nouvelle équipe' : 'Modifier l\'équipe'}
              </h3>
              <button
                onClick={() => setShowTeamModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Nom de l'équipe</label>
                <input
                  type="text"
                  value={selectedTeam.name}
                  onChange={(e) => setSelectedTeam({ ...selectedTeam, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea
                  value={selectedTeam.description}
                  onChange={(e) => setSelectedTeam({ ...selectedTeam, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Couleur</label>
                  <input
                    type="color"
                    value={selectedTeam.color}
                    onChange={(e) => setSelectedTeam({ ...selectedTeam, color: e.target.value })}
                    className="w-full h-10 border border-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Chef d'équipe</label>
                  <select
                    value={selectedTeam.leaderId}
                    onChange={(e) => setSelectedTeam({ ...selectedTeam, leaderId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowTeamModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={saveTeam}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isCreatingTeam ? 'Créer' : 'Sauvegarder'}</span>
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
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Supprimer le membre</h3>
                <p className="text-sm text-slate-600">Cette action est irréversible</p>
              </div>
            </div>

            <p className="text-slate-700 mb-6">
              Êtes-vous sûr de vouloir supprimer ce membre de l'équipe ? Toutes ses assignations seront également supprimées.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={confirmDeleteUser}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;