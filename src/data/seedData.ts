import { User, Project, Task, CalendarEvent, Notification, Team, BlogPost, BlogComment } from '../types';

const defaultUserSettings = {
  notifications: {
    enabled: true,
    email: true,
    push: true,
    desktop: false,
    taskUpdates: true,
    projectDeadlines: true,
    teamMentions: true,
  },
  privacy: {
    profileVisibility: 'team' as const,
    showOnlineStatus: true,
    allowDirectMessages: true,
  },
  preferences: {
    theme: 'system' as const,
    language: 'en',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h' as const,
  },
};

// Nouvelles équipes
export const teams: Team[] = [
  {
    id: '1',
    name: 'Équipe Développement',
    description: 'Équipe responsable du développement des produits',
    color: '#3B82F6',
    leaderId: '2',
    members: ['2', '4'],
    createdAt: '2023-01-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Équipe Design',
    description: 'Équipe créative et UX/UI',
    color: '#8B5CF6',
    leaderId: '3',
    members: ['3'],
    createdAt: '2023-01-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'Équipe Marketing',
    description: 'Équipe marketing et communication',
    color: '#10B981',
    leaderId: '5',
    members: ['5'],
    createdAt: '2023-01-01',
    updatedAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'Équipe Analytics',
    description: 'Équipe data et analytics',
    color: '#F59E0B',
    leaderId: '6',
    members: ['6'],
    createdAt: '2023-01-01',
    updatedAt: '2024-01-20'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@projectflow.com',
    avatar: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg',
    role: 'Product Manager',
    department: 'Product',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: '2022-03-15',
    status: 'active',
    skills: ['Product Strategy', 'User Research', 'Analytics', 'Agile'],
    projects: ['1', '2', '5'],
    tasksCompleted: 145,
    performance: 96,
    settings: defaultUserSettings,
    teamId: '1'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@projectflow.com',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    role: 'Senior Developer',
    department: 'Engineering',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    joinDate: '2021-08-22',
    status: 'active',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    projects: ['1', '3', '4'],
    tasksCompleted: 234,
    performance: 94,
    settings: defaultUserSettings,
    teamId: '1'
  },
  {
    id: '3',
    name: 'Emily Davis',
    email: 'emily.davis@projectflow.com',
    avatar: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg',
    role: 'UX Designer',
    department: 'Design',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    joinDate: '2022-01-10',
    status: 'active',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Testing'],
    projects: ['2', '5', '6'],
    tasksCompleted: 89,
    performance: 98,
    settings: defaultUserSettings,
    teamId: '2'
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@projectflow.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    role: 'DevOps Engineer',
    department: 'Engineering',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    joinDate: '2021-11-05',
    status: 'active',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform'],
    projects: ['1', '3', '4'],
    tasksCompleted: 178,
    performance: 92,
    settings: defaultUserSettings,
    teamId: '1'
  },
  {
    id: '5',
    name: 'Jessica Wang',
    email: 'jessica.wang@projectflow.com',
    avatar: 'https://images.pexels.com/photos/3586091/pexels-photo-3586091.jpeg',
    role: 'Marketing Manager',
    department: 'Marketing',
    phone: '+1 (555) 567-8901',
    location: 'Chicago, IL',
    joinDate: '2022-06-18',
    status: 'vacation',
    skills: ['Digital Marketing', 'SEO', 'Analytics', 'Content Strategy'],
    projects: ['5', '6'],
    tasksCompleted: 67,
    performance: 91,
    settings: defaultUserSettings,
    teamId: '3'
  },
  {
    id: '6',
    name: 'David Kim',
    email: 'david.kim@projectflow.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    role: 'Data Analyst',
    department: 'Analytics',
    phone: '+1 (555) 678-9012',
    location: 'Seattle, WA',
    joinDate: '2021-12-03',
    status: 'busy',
    skills: ['Python', 'SQL', 'Tableau', 'Statistics', 'Machine Learning'],
    projects: ['4', '6'],
    tasksCompleted: 123,
    performance: 95,
    settings: defaultUserSettings,
    teamId: '4'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform Redesign',
    description: 'Complete overhaul of our e-commerce platform with modern UI/UX, improved performance, and new features including AI-powered recommendations.',
    status: 'in-progress',
    priority: 'high',
    progress: 78,
    deadline: '2024-03-15',
    startDate: '2023-12-01',
    budget: 125000,
    spent: 97500,
    category: 'Development',
    teamMembers: ['1', '2', '4'],
    tasks: ['1', '2', '3', '4'],
    createdBy: '1',
    createdAt: '2023-11-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile application for iOS and Android with real-time synchronization and offline capabilities.',
    status: 'review',
    priority: 'high',
    progress: 92,
    deadline: '2024-02-28',
    startDate: '2023-10-01',
    budget: 85000,
    spent: 78200,
    category: 'Mobile',
    teamMembers: ['1', '3'],
    tasks: ['5', '6', '7'],
    createdBy: '1',
    createdAt: '2023-09-20',
    updatedAt: '2024-01-18'
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics dashboard with advanced reporting, data visualization, and automated insights generation.',
    status: 'in-progress',
    priority: 'medium',
    progress: 65,
    deadline: '2024-04-10',
    startDate: '2024-01-01',
    budget: 95000,
    spent: 61750,
    category: 'Analytics',
    teamMembers: ['2', '4', '6'],
    tasks: ['8', '9', '10'],
    createdBy: '6',
    createdAt: '2023-12-20',
    updatedAt: '2024-01-19'
  },
  {
    id: '4',
    name: 'Cloud Infrastructure Migration',
    description: 'Migration of legacy systems to cloud infrastructure with improved scalability, security, and cost optimization.',
    status: 'planning',
    priority: 'medium',
    progress: 25,
    deadline: '2024-06-30',
    startDate: '2024-02-01',
    budget: 150000,
    spent: 37500,
    category: 'Infrastructure',
    teamMembers: ['2', '4'],
    tasks: ['11', '12'],
    createdBy: '4',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-20'
  },
  {
    id: '5',
    name: 'Brand Identity Refresh',
    description: 'Complete brand identity overhaul including logo redesign, color palette, typography, and brand guidelines.',
    status: 'completed',
    priority: 'low',
    progress: 100,
    deadline: '2024-01-31',
    startDate: '2023-11-01',
    budget: 35000,
    spent: 34200,
    category: 'Design',
    teamMembers: ['3', '5'],
    tasks: ['13', '14', '15'],
    createdBy: '3',
    createdAt: '2023-10-25',
    updatedAt: '2024-01-31'
  },
  {
    id: '6',
    name: 'Marketing Automation Platform',
    description: 'Implementation of comprehensive marketing automation platform with email campaigns, lead scoring, and customer journey mapping.',
    status: 'on-hold',
    priority: 'low',
    progress: 15,
    deadline: '2024-05-15',
    startDate: '2024-01-15',
    budget: 65000,
    spent: 9750,
    category: 'Marketing',
    teamMembers: ['5', '6'],
    tasks: ['16', '17'],
    createdBy: '5',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-20'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design new homepage layout',
    description: 'Create wireframes and high-fidelity mockups for the new homepage with improved user flow and conversion optimization.',
    status: 'completed',
    priority: 'high',
    assigneeId: '3',
    projectId: '1',
    dueDate: '2024-01-25',
    createdDate: '2024-01-10',
    completedDate: '2024-01-24',
    tags: ['design', 'ui/ux', 'homepage'],
    comments: [],
    timeTracked: 16,
    estimatedTime: 20
  },
  {
    id: '2',
    title: 'Implement user authentication system',
    description: 'Develop secure JWT-based authentication with multi-factor authentication support and session management.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '2',
    projectId: '1',
    dueDate: '2024-02-05',
    createdDate: '2024-01-15',
    tags: ['backend', 'security', 'authentication'],
    comments: [],
    timeTracked: 24,
    estimatedTime: 32
  },
  {
    id: '3',
    title: 'Set up payment gateway integration',
    description: 'Integrate Stripe payment processing with support for multiple payment methods and subscription billing.',
    status: 'todo',
    priority: 'high',
    assigneeId: '2',
    projectId: '1',
    dueDate: '2024-02-10',
    createdDate: '2024-01-20',
    tags: ['backend', 'payments', 'integration'],
    comments: [],
    timeTracked: 0,
    estimatedTime: 28
  },
  {
    id: '4',
    title: 'Optimize database performance',
    description: 'Analyze and optimize database queries, implement caching strategies, and improve overall system performance.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: '4',
    projectId: '1',
    dueDate: '2024-02-15',
    createdDate: '2024-01-18',
    tags: ['database', 'performance', 'optimization'],
    comments: [],
    timeTracked: 12,
    estimatedTime: 24
  },
  {
    id: '5',
    title: 'Develop iOS application',
    description: 'Build native iOS application with SwiftUI, implementing core features and offline synchronization.',
    status: 'review',
    priority: 'high',
    assigneeId: '2',
    projectId: '2',
    dueDate: '2024-02-20',
    createdDate: '2023-12-01',
    tags: ['mobile', 'ios', 'swift'],
    comments: [],
    timeTracked: 120,
    estimatedTime: 140
  },
  {
    id: '6',
    title: 'Create user onboarding flow',
    description: 'Design and implement intuitive user onboarding experience with progressive disclosure and helpful tooltips.',
    status: 'completed',
    priority: 'medium',
    assigneeId: '3',
    projectId: '2',
    dueDate: '2024-01-30',
    createdDate: '2024-01-05',
    completedDate: '2024-01-28',
    tags: ['design', 'ux', 'onboarding'],
    comments: [],
    timeTracked: 18,
    estimatedTime: 20
  },
  {
    id: '7',
    title: 'Implement push notifications',
    description: 'Set up push notification system with personalized messaging and delivery optimization.',
    status: 'in-progress',
    priority: 'medium',
    assigneeId: '2',
    projectId: '2',
    dueDate: '2024-02-25',
    createdDate: '2024-01-12',
    tags: ['mobile', 'notifications', 'backend'],
    comments: [],
    timeTracked: 8,
    estimatedTime: 16
  },
  {
    id: '8',
    title: 'Build real-time data pipeline',
    description: 'Create scalable data pipeline for real-time analytics processing with Apache Kafka and stream processing.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '6',
    projectId: '3',
    dueDate: '2024-02-28',
    createdDate: '2024-01-08',
    tags: ['data', 'pipeline', 'real-time'],
    comments: [],
    timeTracked: 32,
    estimatedTime: 48
  },
  {
    id: '9',
    title: 'Design dashboard interface',
    description: 'Create intuitive dashboard interface with customizable widgets and responsive design.',
    status: 'completed',
    priority: 'medium',
    assigneeId: '3',
    projectId: '3',
    dueDate: '2024-01-20',
    createdDate: '2024-01-02',
    completedDate: '2024-01-19',
    tags: ['design', 'dashboard', 'ui'],
    comments: [],
    timeTracked: 22,
    estimatedTime: 24
  },
  {
    id: '10',
    title: 'Implement data visualization components',
    description: 'Develop interactive charts and graphs using D3.js with real-time data updates and export capabilities.',
    status: 'todo',
    priority: 'medium',
    assigneeId: '2',
    projectId: '3',
    dueDate: '2024-03-05',
    createdDate: '2024-01-15',
    tags: ['frontend', 'visualization', 'd3js'],
    comments: [],
    timeTracked: 0,
    estimatedTime: 36
  }
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily team standup meeting to discuss progress and blockers',
    startTime: '09:00',
    endTime: '09:30',
    date: new Date().toISOString().split('T')[0],
    type: 'meeting',
    attendees: ['1', '2', '3', '4'],
    location: 'Conference Room A',
    isRecurring: true,
    reminderMinutes: 15
  },
  {
    id: '2',
    title: 'Client Presentation',
    description: 'Present Q1 project progress to stakeholders',
    startTime: '14:00',
    endTime: '15:00',
    date: new Date().toISOString().split('T')[0],
    type: 'presentation',
    attendees: ['1', '4'],
    location: 'Zoom Meeting',
    isRecurring: false,
    reminderMinutes: 30
  },
  {
    id: '3',
    title: 'Design Review',
    description: 'Review new homepage designs and provide feedback',
    startTime: '16:00',
    endTime: '16:45',
    date: new Date().toISOString().split('T')[0],
    type: 'review',
    attendees: ['1', '3', '5'],
    location: 'Design Studio',
    isRecurring: false,
    reminderMinutes: 15
  },
  {
    id: '4',
    title: 'Project Deadline - Mobile App',
    description: 'Final deadline for mobile app beta release',
    startTime: '23:59',
    endTime: '23:59',
    date: '2024-02-28',
    type: 'deadline',
    attendees: ['1', '2', '3'],
    isRecurring: false,
    reminderMinutes: 1440
  }
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New task assigned',
    message: 'You have been assigned to "Implement user authentication system"',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    actionUrl: '/tasks'
  },
  {
    id: '2',
    title: 'Project deadline approaching',
    message: 'Mobile App Development deadline is in 3 days',
    type: 'warning',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    actionUrl: '/projects'
  },
  {
    id: '3',
    title: 'Task completed',
    message: 'Emily Davis completed "Design new homepage layout"',
    type: 'success',
    isRead: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    actionUrl: '/tasks'
  },
  {
    id: '4',
    title: 'Team meeting reminder',
    message: 'Team standup starts in 15 minutes',
    type: 'info',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    actionUrl: '/calendar'
  }
];

// Nouveaux posts de blog avec système de likes et commentaires
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guide complet de l\'IA dans ProjectFlow',
    content: `# Guide complet de l'IA dans ProjectFlow

L'intelligence artificielle transforme la façon dont nous gérons nos projets. Dans ce guide, nous explorerons toutes les fonctionnalités IA disponibles dans ProjectFlow.

## Dashboard IA Intelligent

Le nouveau dashboard utilise l'apprentissage automatique pour analyser vos données de projet et fournir des insights personnalisés.

### Fonctionnalités principales:
- Analyse prédictive des performances
- Détection automatique des risques
- Recommandations d'optimisation
- Alertes intelligentes

## Optimisation automatique

L'IA peut automatiquement:
- Réallouer les ressources
- Ajuster les priorités
- Prédire les retards
- Suggérer des améliorations

## Commandes vocales

Contrôlez ProjectFlow avec votre voix:
- "Créer un nouveau projet"
- "Afficher mes tâches"
- "Analyser les performances"
- "Générer un rapport"

## Conclusion

L'IA dans ProjectFlow n'est pas juste un gadget - c'est un véritable assistant qui vous aide à être plus productif et à prendre de meilleures décisions.`,
    excerpt: 'Découvrez comment utiliser efficacement toutes les fonctionnalités d\'intelligence artificielle de ProjectFlow pour optimiser vos projets.',
    status: 'published',
    author: '1',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    tags: ['IA', 'Guide', 'Productivité', 'Tutoriel'],
    readTime: 8,
    views: 1247,
    likes: ['1', '2', '3', '5'], // IDs des utilisateurs qui ont liké
    comments: [
      {
        id: '1',
        postId: '1',
        authorId: '2',
        content: 'Excellent guide ! Les fonctionnalités IA sont vraiment impressionnantes.',
        createdAt: '2024-01-16T09:30:00Z',
        likes: ['1', '3'],
        replies: [
          {
            id: '2',
            postId: '1',
            authorId: '1',
            content: 'Merci Michael ! N\'hésitez pas si vous avez des questions.',
            createdAt: '2024-01-16T10:15:00Z',
            likes: ['2'],
            replies: []
          }
        ]
      },
      {
        id: '3',
        postId: '1',
        authorId: '3',
        content: 'Les commandes vocales sont un vrai game-changer pour la productivité.',
        createdAt: '2024-01-17T14:20:00Z',
        likes: ['1', '2', '5'],
        replies: []
      }
    ],
    featured: true,
    visibility: 'public'
  },
  {
    id: '2',
    title: 'Nouvelles fonctionnalités - Janvier 2024',
    content: `# Nouvelles fonctionnalités - Janvier 2024

Ce mois-ci, nous avons ajouté plusieurs fonctionnalités passionnantes à ProjectFlow.

## Dashboard IA intelligent

Un tout nouveau dashboard qui utilise l'intelligence artificielle pour vous donner des insights sur vos projets.

## Commandes vocales

Vous pouvez maintenant contrôler ProjectFlow avec votre voix.

## Intégrations améliorées

Nouvelles intégrations avec Slack, GitHub, et Figma.

## Améliorations de performance

L'application est maintenant 40% plus rapide.`,
    excerpt: 'Découvrez toutes les nouveautés et améliorations apportées à ProjectFlow ce mois-ci.',
    status: 'published',
    author: '1',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T16:45:00Z',
    tags: ['Nouveautés', 'Fonctionnalités', 'Mise à jour'],
    readTime: 5,
    views: 892,
    likes: ['2', '4', '6'],
    comments: [
      {
        id: '4',
        postId: '2',
        authorId: '4',
        content: 'Les améliorations de performance sont très appréciables !',
        createdAt: '2024-01-21T08:45:00Z',
        likes: ['1', '2'],
        replies: []
      }
    ],
    featured: false,
    visibility: 'public'
  }
];

export const blogComments: BlogComment[] = [
  {
    id: '1',
    postId: '1',
    authorId: '2',
    content: 'Excellent guide ! Les fonctionnalités IA sont vraiment impressionnantes.',
    createdAt: '2024-01-16T09:30:00Z',
    likes: ['1', '3'],
    replies: [
      {
        id: '2',
        postId: '1',
        authorId: '1',
        content: 'Merci Michael ! N\'hésitez pas si vous avez des questions.',
        createdAt: '2024-01-16T10:15:00Z',
        likes: ['2'],
        replies: []
      }
    ]
  },
  {
    id: '3',
    postId: '1',
    authorId: '3',
    content: 'Les commandes vocales sont un vrai game-changer pour la productivité.',
    createdAt: '2024-01-17T14:20:00Z',
    likes: ['1', '2', '5'],
    replies: []
  },
  {
    id: '4',
    postId: '2',
    authorId: '4',
    content: 'Les améliorations de performance sont très appréciables !',
    createdAt: '2024-01-21T08:45:00Z',
    likes: ['1', '2'],
    replies: []
  }
];