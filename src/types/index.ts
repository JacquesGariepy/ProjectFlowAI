export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  phone?: string;
  location?: string;
  joinDate: string;
  status: 'active' | 'vacation' | 'busy' | 'offline';
  skills: string[];
  projects: string[];
  tasksCompleted: number;
  performance: number;
  settings?: UserSettings;
  teamId?: string; // Nouveau: ID de l'équipe
}

export interface UserSettings {
  notifications: {
    enabled: boolean;
    email: boolean;
    push: boolean;
    desktop: boolean;
    taskUpdates: boolean;
    projectDeadlines: boolean;
    teamMentions: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'team' | 'private';
    showOnlineStatus: boolean;
    allowDirectMessages: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    dateFormat: string;
    timeFormat: '12h' | '24h';
  };
}

// Nouveau: Interface pour les équipes
export interface Team {
  id: string;
  name: string;
  description: string;
  color: string;
  leaderId: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  deadline: string;
  startDate: string;
  budget: number;
  spent: number;
  category: string;
  teamMembers: string[];
  tasks: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assigneeId: string;
  projectId: string;
  dueDate: string;
  createdDate: string;
  completedDate?: string;
  tags: string[];
  comments: Comment[];
  timeTracked: number;
  estimatedTime: number;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  type: 'meeting' | 'deadline' | 'presentation' | 'review' | 'personal';
  attendees: string[];
  location?: string;
  isRecurring: boolean;
  reminderMinutes: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Nouveau: Interfaces pour le blog
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  readTime: number;
  views: number;
  likes: string[]; // Array d'IDs d'utilisateurs qui ont liké
  comments: BlogComment[];
  featured: boolean;
  visibility: 'public' | 'team' | 'private';
}

export interface BlogComment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  likes: string[]; // Array d'IDs d'utilisateurs qui ont liké
  replies: BlogComment[];
}