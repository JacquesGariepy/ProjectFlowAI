export type Language = 'fr' | 'en';

export interface Translations {
  // Common
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    loading: string;
    error: string;
    success: string;
    close: string;
    yes: string;
    no: string;
    confirm: string;
    back: string;
    next: string;
    previous: string;
    view: string;
    details: string;
    refresh: string;
    clear: string;
    apply: string;
    optimize: string;
    generate: string;
    analyze: string;
  };

  // Navigation
  nav: {
    dashboard: string;
    projects: string;
    tasks: string;
    team: string;
    analytics: string;
    aiInsights: string;
    smartDashboard: string;
    aiAssistant: string;
    reports: string;
    settings: string;
    calendar: string;
    blog: string;
    helpSupport: string;
    aiPremium: string;
    classicDashboard: string;
  };

  // Sidebar
  sidebar: {
    poweredByAI: string;
    aiPremiumUpgrade: string;
    unlockAdvancedFeatures: string;
    upgradeNow: string;
    aiAssistantTooltip: string;
    discoverPremium: string;
  };

  // Header
  header: {
    title: string;
    subtitle: string;
    language: string;
    notifications: string;
    profile: string;
    logout: string;
    welcome: string;
    offline: string;
    online: string;
  };

  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    totalProjects: string;
    activeTasks: string;
    teamMembers: string;
    completionRate: string;
    overdueTasks: string;
    highPriorityTasks: string;
    recentActivity: string;
    projectHealth: string;
    teamPerformance: string;
    budgetOverview: string;
    upcomingDeadlines: string;
    activeProjects: string;
    pendingTasks: string;
    vsLastMonth: string;
    attentionRequired: string;
    tasksOverdue: string;
    taskOverdue: string;
    budgetUtilizationHigh: string;
    reviewSpending: string;
    performanceOverview: string;
    taskDistribution: string;
    totalTasks: string;
    completedTasks: string;
  };

  // Projects
  projects: {
    title: string;
    subtitle: string;
    newProject: string;
    projectName: string;
    description: string;
    status: string;
    priority: string;
    deadline: string;
    budget: string;
    progress: string;
    team: string;
    client: string;
    tags: string;
    statusActive: string;
    statusCompleted: string;
    statusOnHold: string;
    statusCancelled: string;
    statusPlanning: string;
    statusInProgress: string;
    statusReview: string;
    statusOnPause: string;
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;
    priorityCritical: string;
    allProjects: string;
    myProjects: string;
    recentProjects: string;
    noProjects: string;
    createFirstProject: string;
    editProject: string;
    createProject: string;
    startDate: string;
    category: string;
    deleteProject: string;
    deleteConfirmation: string;
    deleteWarning: string;
    teamReallocation: string;
    aiRecommendationText: string;
    suggestedMembers: string;
    execute: string;
    projectDuplicated: string;
    projectExported: string;
    projectDeleted: string;
    reallocationCompleted: string;
    recommendationDeleted: string;
    projectDuplicatedMessage: string;
    projectExportedMessage: string;
    projectDeletedMessage: string;
    reallocationCompletedMessage: string;
  };

  // Tasks
  tasks: {
    title: string;
    subtitle: string;
    newTask: string;
    taskTitle: string;
    description: string;
    assignee: string;
    dueDate: string;
    status: string;
    priority: string;
    project: string;
    tags: string;
    statusTodo: string;
    statusInProgress: string;
    statusCompleted: string;
    statusBlocked: string;
    allTasks: string;
    myTasks: string;
    overdue: string;
    today: string;
    thisWeek: string;
    upcoming: string;
    noTasks: string;
    createFirstTask: string;
    resetFilters: string;
    createTask: string;
    startDate: string;
    tagsPlaceholder: string;
    tagsSeparator: string;
    daysLate: string;
    todayDeadline: string;
    daysRemaining: string;
    hoursLabel: string;
    noTasksFound: string;
    noTasksFiltered: string;
  };

  // Team
  team: {
    title: string;
    subtitle: string;
    addMember: string;
    newTeam: string;
    name: string;
    email: string;
    role: string;
    department: string;
    performance: string;
    activeProjects: string;
    completedTasks: string;
    workload: string;
    availability: string;
    skills: string;
    roleAdmin: string;
    roleManager: string;
    roleDeveloper: string;
    roleDesigner: string;
    roleAnalyst: string;
    statusActive: string;
    statusVacation: string;
    statusBusy: string;
    statusOffline: string;
    viewProfile: string;
    teams: string;
    allUsers: string;
    members: string;
    noTeamMembers: string;
    addFirstMember: string;
  };

  // Calendar
  calendar: {
    title: string;
    subtitle: string;
    today: string;
    month: string;
    week: string;
    day: string;
    agenda: string;
    newEvent: string;
    eventTitle: string;
    eventDescription: string;
    startTime: string;
    endTime: string;
    location: string;
    attendees: string;
    reminder: string;
    allDay: string;
    repeat: string;
    noEvents: string;
    createFirstEvent: string;
  };

  // Blog
  blog: {
    title: string;
    subtitle: string;
    newPost: string;
    postTitle: string;
    content: string;
    author: string;
    publishDate: string;
    category: string;
    tags: string;
    status: string;
    statusDraft: string;
    statusPublished: string;
    statusArchived: string;
    allPosts: string;
    myPosts: string;
    recentPosts: string;
    noPosts: string;
    createFirstPost: string;
    readMore: string;
    comments: string;
    likes: string;
    shares: string;
    // Additional keys
    edit: string;
    share: string;
    delete: string;
    read: string;
    comment: string;
    like: string;
    save: string;
    create: string;
    featured: string;
    draft: string;
    archived: string;
    totalArticles: string;
    totalViews: string;
    totalLikes: string;
    totalComments: string;
    searchPlaceholder: string;
    noPostsFound: string;
    noPostsFiltered: string;
    newArticle: string;
    editArticle: string;
    articleSummary: string;
    articleContent: string;
    shareArticle: string;
    shareOnSocial: string;
    postCreated: string;
    postUpdated: string;
    postDeleted: string;
    postMessage: string;
    hasBeenCreated: string;
    hasBeenUpdated: string;
    hasBeenDeleted: string;
    preview: string;
  };

  // Settings
  settings: {
    title: string;
    subtitle: string;
    general: string;
    account: string;
    notifications: string;
    security: string;
    integrations: string;
    advanced: string;
    language: string;
    theme: string;
    timezone: string;
    currency: string;
    dateFormat: string;
    emailNotifications: string;
    pushNotifications: string;
    weeklyReports: string;
    changePassword: string;
    twoFactorAuth: string;
    apiKeys: string;
    backupData: string;
    deleteAccount: string;
    personalInfo: string;
    preferences: string;
    privacy: string;
    billing: string;
    subscription: string;
    usage: string;
    support: string;
    darkMode: string;
    lightMode: string;
    systemMode: string;
  };

  // Help & Support
  helpSupport: {
    title: string;
    subtitle: string;
    searchHelp: string;
    documentation: string;
    tutorials: string;
    faq: string;
    contactSupport: string;
    reportBug: string;
    featureRequest: string;
    communityForum: string;
    videoTutorials: string;
    gettingStarted: string;
    userGuide: string;
    apiDocs: string;
    troubleshooting: string;
    status: string;
    updates: string;
    releaseNotes: string;
  };

  // AI Premium
  aiPremium: {
    title: string;
    subtitle: string;
    features: string;
    pricing: string;
    comparison: string;
    testimonials: string;
    faq: string;
    contactSales: string;
    startTrial: string;
    upgrade: string;
    currentPlan: string;
    billingCycle: string;
    nextBilling: string;
    usage: string;
    limits: string;
    addons: string;
    discount: string;
    promo: string;
    enterprise: string;
    custom: string;
    mostPopular: string;
    freeTrial: string;
    advancedAnalytics: string;
    predictiveInsights: string;
    automatedOptimization: string;
    prioritySupport: string;
    unlimitedProjects: string;
    teamCollaboration: string;
    dataExport: string;
  };

  // AI Features
  ai: {
    insights: string;
    smartDashboard: string;
    assistant: string;
    analyzing: string;
    generating: string;
    confidence: string;
    impact: string;
    category: string;
    actionable: string;
    applied: string;
    recommendation: string;
    prediction: string;
    optimization: string;
    risk: string;
    opportunity: string;
    impactHigh: string;
    impactMedium: string;
    impactLow: string;
    generateInsights: string;
    refreshAI: string;
    aiScore: string;
    fallbackMode: string;
    aiActive: string;
    clearHistory: string;
    applyAction: string;
    viewDetails: string;
    seeAll: string;
    smartAlerts: string;
    predictiveAnalysis: string;
    teamEfficiency: string;
    projectHealth: string;
    performanceMatrix: string;
    budgetAnalysis: string;
    riskAssessment: string;
    globalScore: string;
    onTimeDelivery: string;
    averageBudget: string;
    
    // AI Insights specific
    insightsTitle: string;
    insightsSubtitle: string;
    analysisInProgress: string;
    analysisDescription: string;
    welcomeInsightTitle: string;
    welcomeInsightDescription: string;
    actionApplied: string;
    actionNotActionable: string;
    actionErrorMessage: string;
    confirmClearHistory: string;
    confidenceAI: string;
    detailedDescription: string;
    detailedData: string;
    modalClose: string;
    appliedAction: string;
    clearHistoryTitle: string;
    systemCategory: string;
    performanceCategory: string;
    planningCategory: string;
    resourcesCategory: string;
    qualityCategory: string;
    riskCategory: string;
    opportunityCategory: string;
    optimizationCategory: string;
    predictionCategory: string;
    recommendationCategory: string;
  };

  // Analytics
  analytics: {
    title: string;
    overview: string;
    performance: string;
    trends: string;
    reports: string;
    timeframe: string;
    thisWeek: string;
    thisMonth: string;
    thisQuarter: string;
    thisYear: string;
    custom: string;
    exportData: string;
    shareReport: string;
    schedule: string;
  };

  // Status and States
  status: {
    active: string;
    inactive: string;
    pending: string;
    completed: string;
    inProgress: string;
    blocked: string;
    cancelled: string;
    onHold: string;
    draft: string;
    published: string;
    archived: string;
  };

  // Time and Dates
  time: {
    today: string;
    yesterday: string;
    tomorrow: string;
    thisWeek: string;
    nextWeek: string;
    thisMonth: string;
    nextMonth: string;
    thisYear: string;
    ago: string;
    remaining: string;
    overdue: string;
    dueToday: string;
    dueTomorrow: string;
    dueThisWeek: string;
    dueNextWeek: string;
  };

  // Messages and Notifications
  messages: {
    welcome: string;
    projectCreated: string;
    projectUpdated: string;
    projectDeleted: string;
    taskCreated: string;
    taskUpdated: string;
    taskCompleted: string;
    taskDeleted: string;
    memberAdded: string;
    memberRemoved: string;
    memberUpdated: string;
    settingsSaved: string;
    errorOccurred: string;
    noDataAvailable: string;
    loadingData: string;
    actionSuccessful: string;
    actionFailed: string;
    confirmDelete: string;
    unsavedChanges: string;
  };

  // Forms and Validation
  forms: {
    required: string;
    invalidEmail: string;
    passwordTooShort: string;
    passwordMismatch: string;
    invalidDate: string;
    invalidNumber: string;
    maxLength: string;
    minLength: string;
    selectOption: string;
    uploadFile: string;
    dragDropFile: string;
    fileTooBig: string;
    invalidFileType: string;
  };

  // AI Prompts and Responses
  aiPrompts: {
    analyzeProject: string;
    generateTasks: string;
    predictOutcome: string;
    optimizeWorkflow: string;
    assessRisk: string;
    recommendActions: string;
    summarizeProgress: string;
    identifyBottlenecks: string;
    suggestImprovements: string;
    forecastTimeline: string;
  };
}

export const translations: Record<Language, Translations> = {
  fr: {
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      filter: 'Filtrer',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      close: 'Fermer',
      yes: 'Oui',
      no: 'Non',
      confirm: 'Confirmer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      view: 'Voir',
      details: 'Détails',
      refresh: 'Actualiser',
      clear: 'Vider',
      apply: 'Appliquer',
      optimize: 'Optimiser',
      generate: 'Générer',
      analyze: 'Analyser',
    },
    nav: {
      dashboard: 'Tableau de Bord',
      projects: 'Projets',
      tasks: 'Tâches',
      team: 'Équipe',
      analytics: 'Analyses',
      aiInsights: 'Insights IA Avancés',
      smartDashboard: 'Dashboard IA Intelligent',
      aiAssistant: 'Assistant IA',
      reports: 'Rapports',
      settings: 'Paramètres',
      calendar: 'Calendrier',
      blog: 'Blog',
      helpSupport: 'Aide et Support',
      aiPremium: 'IA Premium',
      classicDashboard: 'Dashboard Classic',
    },
    sidebar: {
      poweredByAI: 'Propulsé par IA Avancée',
      aiPremiumUpgrade: 'Upgrade IA Premium',
      unlockAdvancedFeatures: 'Débloquez les fonctionnalités avancées',
      upgradeNow: 'Mettre à niveau maintenant',
      aiAssistantTooltip: 'Assistant IA - Disponible 24/7',
      discoverPremium: 'Découvrir Premium',
    },
    header: {
      title: 'ProjectFlow AI',
      subtitle: 'Gestion de Projets Intelligente',
      language: 'Langue',
      notifications: 'Notifications',
      profile: 'Profil',
      logout: 'Déconnexion',
      welcome: 'Bienvenue',
      offline: 'Hors ligne',
      online: 'En ligne',
    },
    dashboard: {
      title: 'Tableau de Bord',
      subtitle: 'Vue d\'ensemble de vos projets et performances',
      totalProjects: 'Projets Totaux',
      activeTasks: 'Tâches Actives',
      teamMembers: 'Membres Équipe',
      completionRate: 'Taux de Réussite',
      overdueTasks: 'Tâches en Retard',
      highPriorityTasks: 'Tâches Haute Priorité',
      recentActivity: 'Activité Récente',
      projectHealth: 'Santé des Projets',
      teamPerformance: 'Performance Équipe',
      budgetOverview: 'Aperçu Budget',
      upcomingDeadlines: 'Échéances Prochaines',
      activeProjects: 'Projets Actifs',
      pendingTasks: 'Tâches en Attente',
      vsLastMonth: 'vs mois dernier',
      attentionRequired: 'Attention requise',
      tasksOverdue: 'tâches en retard',
      taskOverdue: 'tâche en retard',
      budgetUtilizationHigh: 'Utilisation budget élevée',
      reviewSpending: 'Réviser les dépenses',
      performanceOverview: 'Aperçu Performance',
      taskDistribution: 'Répartition des Tâches',
      totalTasks: 'Total Tâches',
      completedTasks: 'Tâches Terminées',
    },
    projects: {
      title: 'Projets',
      subtitle: 'Gérez vos projets et collaborez efficacement',
      newProject: 'Nouveau Projet',
      projectName: 'Nom du Projet',
      description: 'Description',
      status: 'Statut',
      priority: 'Priorité',
      deadline: 'Échéance',
      budget: 'Budget',
      progress: 'Progression',
      team: 'Équipe',
      client: 'Client',
      tags: 'Tags',
      statusActive: 'Actif',
      statusCompleted: 'Terminé',
      statusOnHold: 'En Attente',
      statusCancelled: 'Annulé',
      statusPlanning: 'Planification',
      statusInProgress: 'En Cours',
      statusReview: 'En Révision',
      statusOnPause: 'En Pause',
      priorityLow: 'Faible',
      priorityMedium: 'Moyenne',
      priorityHigh: 'Haute',
      priorityCritical: 'Critique',
      allProjects: 'Tous les Projets',
      myProjects: 'Mes Projets',
      recentProjects: 'Projets Récents',
      noProjects: 'Aucun projet trouvé',
      createFirstProject: 'Créez votre premier projet',
      editProject: 'Modifier le Projet',
      createProject: 'Créer un Projet',
      startDate: 'Date de Début',
      category: 'Catégorie',
      deleteProject: 'Supprimer le Projet',
      deleteConfirmation: 'Êtes-vous sûr de vouloir supprimer ce projet ?',
      deleteWarning: 'Cette action est irréversible',
      teamReallocation: 'Réallocation d\'Équipe',
      aiRecommendationText: 'Recommandation IA basée sur l\'analyse des compétences et de la charge de travail',
      suggestedMembers: 'Membres Suggérés',
      execute: 'Exécuter',
      projectDuplicated: 'Projet dupliqué',
      projectExported: 'Projet exporté',
      projectDeleted: 'Projet supprimé',
      reallocationCompleted: 'Réallocation terminée',
      recommendationDeleted: 'Recommandation supprimée',
      projectDuplicatedMessage: 'Le projet a été dupliqué avec succès',
      projectExportedMessage: 'Le projet a été exporté',
      projectDeletedMessage: 'Le projet a été supprimé',
      reallocationCompletedMessage: 'La réallocation de l\'équipe a été effectuée',
    },
    tasks: {
      title: 'Tâches',
      subtitle: 'Organisez et suivez vos tâches quotidiennes',
      newTask: 'Nouvelle Tâche',
      taskTitle: 'Titre de la Tâche',
      description: 'Description',
      assignee: 'Assigné à',
      dueDate: 'Date d\'échéance',
      status: 'Statut',
      priority: 'Priorité',
      project: 'Projet',
      tags: 'Tags',
      statusTodo: 'À Faire',
      statusInProgress: 'En Cours',
      statusCompleted: 'Terminé',
      statusBlocked: 'Bloqué',
      allTasks: 'Toutes les Tâches',
      myTasks: 'Mes Tâches',
      overdue: 'En Retard',
      today: 'Aujourd\'hui',
      thisWeek: 'Cette Semaine',
      upcoming: 'À Venir',
      noTasks: 'Aucune tâche trouvée',
      createFirstTask: 'Créez votre première tâche',
      resetFilters: 'Réinitialiser les filtres',
      createTask: 'Créer une tâche',
      startDate: 'Date de début',
      tagsPlaceholder: 'frontend, urgent, bug',
      tagsSeparator: 'Tags (séparés par des virgules)',
      daysLate: 'jours de retard',
      todayDeadline: 'Aujourd\'hui',
      daysRemaining: 'jours restants',
      hoursLabel: 'Heures',
      noTasksFound: 'Aucune tâche trouvée',
      noTasksFiltered: 'Aucune tâche ne correspond à vos critères de recherche.',
    },
    team: {
      title: 'Équipe',
      subtitle: 'Gérez votre équipe et collaborateurs',
      addMember: 'Ajouter Membre',
      newTeam: 'Nouvelle Équipe',
      name: 'Nom',
      email: 'Email',
      role: 'Rôle',
      department: 'Département',
      performance: 'Performance',
      activeProjects: 'Projets Actifs',
      completedTasks: 'Tâches Terminées',
      workload: 'Charge de Travail',
      availability: 'Disponibilité',
      skills: 'Compétences',
      roleAdmin: 'Administrateur',
      roleManager: 'Manager',
      roleDeveloper: 'Développeur',
      roleDesigner: 'Designer',
      roleAnalyst: 'Analyste',
      statusActive: 'Actif',
      statusVacation: 'En Vacances',
      statusBusy: 'Occupé',
      statusOffline: 'Hors ligne',
      viewProfile: 'Voir le profil',
      teams: 'Équipes',
      allUsers: 'Tous les utilisateurs',
      members: 'Membres',
      noTeamMembers: 'Aucun membre d\'équipe',
      addFirstMember: 'Ajoutez votre premier membre',
    },
    calendar: {
      title: 'Calendrier',
      subtitle: 'Planifiez et suivez vos événements',
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      agenda: 'Agenda',
      newEvent: 'Nouvel Événement',
      eventTitle: 'Titre de l\'Événement',
      eventDescription: 'Description',
      startTime: 'Heure de Début',
      endTime: 'Heure de Fin',
      location: 'Lieu',
      attendees: 'Participants',
      reminder: 'Rappel',
      allDay: 'Toute la journée',
      repeat: 'Répéter',
      noEvents: 'Aucun événement',
      createFirstEvent: 'Créez votre premier événement',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Partagez vos idées et actualités',
      newPost: 'Nouvel Article',
      postTitle: 'Titre de l\'Article',
      content: 'Contenu',
      author: 'Auteur',
      publishDate: 'Date de Publication',
      category: 'Catégorie',
      tags: 'Tags',
      status: 'Statut',
      statusDraft: 'Brouillon',
      statusPublished: 'Publié',
      statusArchived: 'Archivé',
      allPosts: 'Tous les Articles',
      myPosts: 'Mes Articles',
      recentPosts: 'Articles Récents',
      noPosts: 'Aucun article',
      createFirstPost: 'Créez votre premier article',
      readMore: 'Lire plus',
      comments: 'Commentaires',
      likes: 'J\'aime',
      shares: 'Partages',
      // Additional keys
      edit: 'Modifier',
      share: 'Partager',
      delete: 'Supprimer',
      read: 'Lire',
      comment: 'Commenter',
      like: 'Aimer',
      save: 'Sauvegarder',
      create: 'Créer',
      featured: '⭐ Article en vedette',
      draft: 'Brouillon',
      archived: 'Archivé',
      totalArticles: 'Total Articles',
      totalViews: 'Total Vues',
      totalLikes: 'Total J\'aime',
      totalComments: 'Total Commentaires',
      searchPlaceholder: 'Rechercher des articles...',
      noPostsFound: 'Aucun article trouvé',
      noPostsFiltered: 'Aucun article ne correspond à vos critères de recherche.',
      newArticle: 'Nouvel article',
      editArticle: 'Modifier l\'article',
      articleSummary: 'Résumé de l\'article...',
      articleContent: '# Titre de l\'article\n\nÉcrivez votre contenu ici...',
      shareArticle: 'Partager l\'article',
      shareOnSocial: 'Partager sur les réseaux sociaux',
      postCreated: 'Article créé',
      postUpdated: 'Article mis à jour',
      postDeleted: 'Article supprimé',
      postMessage: 'L\'article',
      hasBeenCreated: 'a été créé avec succès',
      hasBeenUpdated: 'a été mis à jour avec succès',
      hasBeenDeleted: 'a été supprimé avec succès',
      preview: 'Aperçu',
    },
    settings: {
      title: 'Paramètres',
      subtitle: 'Configurez votre application',
      general: 'Général',
      account: 'Compte',
      notifications: 'Notifications',
      security: 'Sécurité',
      integrations: 'Intégrations',
      advanced: 'Avancé',
      language: 'Langue',
      theme: 'Thème',
      timezone: 'Fuseau Horaire',
      currency: 'Devise',
      dateFormat: 'Format de Date',
      emailNotifications: 'Notifications Email',
      pushNotifications: 'Notifications Push',
      weeklyReports: 'Rapports Hebdomadaires',
      changePassword: 'Changer Mot de Passe',
      twoFactorAuth: 'Authentification 2FA',
      apiKeys: 'Clés API',
      backupData: 'Sauvegarder Données',
      deleteAccount: 'Supprimer Compte',
      personalInfo: 'Informations Personnelles',
      preferences: 'Préférences',
      privacy: 'Confidentialité',
      billing: 'Facturation',
      subscription: 'Abonnement',
      usage: 'Utilisation',
      support: 'Support',
      darkMode: 'Mode Sombre',
      lightMode: 'Mode Clair',
      systemMode: 'Mode Système',
    },
    helpSupport: {
      title: 'Aide et Support',
      subtitle: 'Trouvez l\'aide dont vous avez besoin',
      searchHelp: 'Rechercher de l\'aide',
      documentation: 'Documentation',
      tutorials: 'Tutoriels',
      faq: 'FAQ',
      contactSupport: 'Contacter le Support',
      reportBug: 'Signaler un Bug',
      featureRequest: 'Demande de Fonctionnalité',
      communityForum: 'Forum Communautaire',
      videoTutorials: 'Tutoriels Vidéo',
      gettingStarted: 'Prise en Main',
      userGuide: 'Guide Utilisateur',
      apiDocs: 'Documentation API',
      troubleshooting: 'Dépannage',
      status: 'Statut',
      updates: 'Mises à Jour',
      releaseNotes: 'Notes de Version',
    },
    aiPremium: {
      title: 'IA Premium',
      subtitle: 'Débloquez le potentiel complet de l\'IA',
      features: 'Fonctionnalités',
      pricing: 'Tarification',
      comparison: 'Comparaison',
      testimonials: 'Témoignages',
      faq: 'FAQ',
      contactSales: 'Contacter les Ventes',
      startTrial: 'Commencer l\'Essai',
      upgrade: 'Mettre à Niveau',
      currentPlan: 'Plan Actuel',
      billingCycle: 'Cycle de Facturation',
      nextBilling: 'Prochaine Facturation',
      usage: 'Utilisation',
      limits: 'Limites',
      addons: 'Extensions',
      discount: 'Remise',
      promo: 'Promotion',
      enterprise: 'Entreprise',
      custom: 'Personnalisé',
      mostPopular: 'Le plus populaire',
      freeTrial: 'Essai gratuit',
      advancedAnalytics: 'Analyses Avancées',
      predictiveInsights: 'Insights Prédictifs',
      automatedOptimization: 'Optimisation Automatisée',
      prioritySupport: 'Support Prioritaire',
      unlimitedProjects: 'Projets Illimités',
      teamCollaboration: 'Collaboration d\'Équipe',
      dataExport: 'Export de Données',
    },
    ai: {
      insights: 'Insights IA Avancés',
      smartDashboard: 'Dashboard IA Intelligent',
      assistant: 'Assistant IA',
      analyzing: 'Analyse en cours...',
      generating: 'Génération...',
      confidence: 'Confiance',
      impact: 'Impact',
      category: 'Catégorie',
      actionable: 'Actionnable',
      applied: 'Appliquée',
      recommendation: 'Recommandation',
      prediction: 'Prédiction',
      optimization: 'Optimisation',
      risk: 'Risque',
      opportunity: 'Opportunité',
      impactHigh: 'Élevé',
      impactMedium: 'Moyen',
      impactLow: 'Faible',
      generateInsights: 'Générer Insights IA',
      refreshAI: 'Actualiser IA',
      aiScore: 'Score IA Global',
      fallbackMode: 'Mode Dégradé',
      aiActive: 'IA Activée',
      clearHistory: 'Vider l\'historique',
      applyAction: 'Appliquer l\'action',
      viewDetails: 'Voir détails',
      seeAll: 'Voir toutes',
      smartAlerts: 'Alertes Intelligentes',
      predictiveAnalysis: 'Analyse Prédictive',
      teamEfficiency: 'Efficacité Équipe',
      projectHealth: 'Santé des Projets',
      performanceMatrix: 'Matrice de Performance',
      budgetAnalysis: 'Analyse Budgétaire',
      riskAssessment: 'Évaluation des Risques',
      globalScore: 'Score Performance Global',
      onTimeDelivery: 'Respect des Délais',
      averageBudget: 'Budget Moyen/Projet',
      insightsTitle: 'Insights IA Avancés',
      insightsSubtitle: 'Analyses prédictives et recommandations intelligentes',
      analysisInProgress: 'Analyse en cours',
      analysisDescription: 'L\'IA analyse vos données pour générer des insights personnalisés...',
      welcomeInsightTitle: 'Bienvenue dans les Insights IA',
      welcomeInsightDescription: 'Découvrez comment l\'IA peut améliorer la performance de vos projets',
      actionApplied: 'Action appliquée avec succès',
      actionNotActionable: 'Cette action n\'est pas applicable actuellement',
      actionErrorMessage: 'Erreur lors de l\'application de l\'action',
      confirmClearHistory: 'Êtes-vous sûr de vouloir effacer l\'historique des insights ?',
      confidenceAI: 'Confiance IA',
      detailedDescription: 'Description détaillée',
      detailedData: 'Données détaillées',
      modalClose: 'Fermer',
      appliedAction: 'Action appliquée',
      clearHistoryTitle: 'Effacer l\'historique des insights',
      systemCategory: 'Système',
      performanceCategory: 'Performance',
      planningCategory: 'Planification',
      resourcesCategory: 'Ressources',
      qualityCategory: 'Qualité',
      riskCategory: 'Risque',
      opportunityCategory: 'Opportunité',
      optimizationCategory: 'Optimisation',
      predictionCategory: 'Prédiction',
      recommendationCategory: 'Recommandation',
    },
    analytics: {
      title: 'Analyses',
      overview: 'Vue d\'ensemble',
      performance: 'Performance',
      trends: 'Tendances',
      reports: 'Rapports',
      timeframe: 'Période',
      thisWeek: 'Cette Semaine',
      thisMonth: 'Ce Mois',
      thisQuarter: 'Ce Trimestre',
      thisYear: 'Cette Année',
      custom: 'Personnalisé',
      exportData: 'Exporter Données',
      shareReport: 'Partager Rapport',
      schedule: 'Programmer',
    },
    status: {
      active: 'Actif',
      inactive: 'Inactif',
      pending: 'En Attente',
      completed: 'Terminé',
      inProgress: 'En Cours',
      blocked: 'Bloqué',
      cancelled: 'Annulé',
      onHold: 'En Pause',
      draft: 'Brouillon',
      published: 'Publié',
      archived: 'Archivé',
    },
    time: {
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      tomorrow: 'Demain',
      thisWeek: 'Cette Semaine',
      nextWeek: 'Semaine Prochaine',
      thisMonth: 'Ce Mois',
      nextMonth: 'Mois Prochain',
      thisYear: 'Cette Année',
      ago: 'il y a',
      remaining: 'restant',
      overdue: 'en retard',
      dueToday: 'Échue aujourd\'hui',
      dueTomorrow: 'Échue demain',
      dueThisWeek: 'Échue cette semaine',
      dueNextWeek: 'Échue semaine prochaine',
    },
    messages: {
      welcome: 'Bienvenue dans ProjectFlow AI !',
      projectCreated: 'Projet créé avec succès',
      projectUpdated: 'Projet mis à jour',
      projectDeleted: 'Projet supprimé',
      taskCreated: 'Tâche créée avec succès',
      taskUpdated: 'Tâche mise à jour',
      taskCompleted: 'Tâche terminée',
      taskDeleted: 'Tâche supprimée',
      memberAdded: 'Membre ajouté à l\'équipe',
      memberRemoved: 'Membre retiré de l\'équipe',
      memberUpdated: 'Informations du membre mises à jour',
      settingsSaved: 'Paramètres sauvegardés',
      errorOccurred: 'Une erreur s\'est produite',
      noDataAvailable: 'Aucune donnée disponible',
      loadingData: 'Chargement des données...',
      actionSuccessful: 'Action réalisée avec succès',
      actionFailed: 'Échec de l\'action',
      confirmDelete: 'Êtes-vous sûr de vouloir supprimer ?',
      unsavedChanges: 'Modifications non sauvegardées',
    },
    forms: {
      required: 'Ce champ est requis',
      invalidEmail: 'Email invalide',
      passwordTooShort: 'Mot de passe trop court',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      invalidDate: 'Date invalide',
      invalidNumber: 'Nombre invalide',
      maxLength: 'Longueur maximale dépassée',
      minLength: 'Longueur minimale non atteinte',
      selectOption: 'Sélectionnez une option',
      uploadFile: 'Télécharger un fichier',
      dragDropFile: 'Glissez-déposez un fichier ici',
      fileTooBig: 'Fichier trop volumineux',
      invalidFileType: 'Type de fichier invalide',
    },
    aiPrompts: {
      analyzeProject: 'Analyser ce projet et fournir des insights',
      generateTasks: 'Générer des suggestions de tâches',
      predictOutcome: 'Prédire le résultat du projet',
      optimizeWorkflow: 'Optimiser le flux de travail',
      assessRisk: 'Évaluer les risques du projet',
      recommendActions: 'Recommander des actions',
      summarizeProgress: 'Résumer la progression',
      identifyBottlenecks: 'Identifier les goulots d\'étranglement',
      suggestImprovements: 'Suggérer des améliorations',
      forecastTimeline: 'Prévoir le calendrier',
    },
  },
  en: {
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      yes: 'Yes',
      no: 'No',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      view: 'View',
      details: 'Details',
      refresh: 'Refresh',
      clear: 'Clear',
      apply: 'Apply',
      optimize: 'Optimize',
      generate: 'Generate',
      analyze: 'Analyze',
    },
    nav: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      tasks: 'Tasks',
      team: 'Team',
      analytics: 'Analytics',
      aiInsights: 'Advanced AI Insights',
      smartDashboard: 'Smart AI Dashboard',
      aiAssistant: 'AI Assistant',
      reports: 'Reports',
      settings: 'Settings',
      calendar: 'Calendar',
      blog: 'Blog',
      helpSupport: 'Help & Support',
      aiPremium: 'AI Premium',
      classicDashboard: 'Classic Dashboard',
    },
    sidebar: {
      poweredByAI: 'Powered by Advanced AI',
      aiPremiumUpgrade: 'AI Premium Upgrade',
      unlockAdvancedFeatures: 'Unlock advanced features',
      upgradeNow: 'Upgrade Now',
      aiAssistantTooltip: 'AI Assistant - Available 24/7',
      discoverPremium: 'Discover Premium',
    },
    header: {
      title: 'ProjectFlow AI',
      subtitle: 'Intelligent Project Management',
      language: 'Language',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
      welcome: 'Welcome',
      offline: 'Offline',
      online: 'Online',
    },
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your projects and performance',
      totalProjects: 'Total Projects',
      activeTasks: 'Active Tasks',
      teamMembers: 'Team Members',
      completionRate: 'Completion Rate',
      overdueTasks: 'Overdue Tasks',
      highPriorityTasks: 'High Priority Tasks',
      recentActivity: 'Recent Activity',
      projectHealth: 'Project Health',
      teamPerformance: 'Team Performance',
      budgetOverview: 'Budget Overview',
      upcomingDeadlines: 'Upcoming Deadlines',
      activeProjects: 'Active Projects',
      pendingTasks: 'Pending Tasks',
      vsLastMonth: 'vs last month',
      attentionRequired: 'Attention required',
      tasksOverdue: 'tasks overdue',
      taskOverdue: 'task overdue',
      budgetUtilizationHigh: 'High budget utilization',
      reviewSpending: 'Review spending',
      performanceOverview: 'Performance Overview',
      taskDistribution: 'Task Distribution',
      totalTasks: 'Total Tasks',
      completedTasks: 'Completed Tasks',
    },
    projects: {
      title: 'Projects',
      subtitle: 'Manage your projects and collaborate effectively',
      newProject: 'New Project',
      projectName: 'Project Name',
      description: 'Description',
      status: 'Status',
      priority: 'Priority',
      deadline: 'Deadline',
      budget: 'Budget',
      progress: 'Progress',
      team: 'Team',
      client: 'Client',
      tags: 'Tags',
      statusActive: 'Active',
      statusCompleted: 'Completed',
      statusOnHold: 'On Hold',
      statusCancelled: 'Cancelled',
      statusPlanning: 'Planning',
      statusInProgress: 'In Progress',
      statusReview: 'Review',
      statusOnPause: 'On Pause',
      priorityLow: 'Low',
      priorityMedium: 'Medium',
      priorityHigh: 'High',
      priorityCritical: 'Critical',
      allProjects: 'All Projects',
      myProjects: 'My Projects',
      recentProjects: 'Recent Projects',
      noProjects: 'No projects found',
      createFirstProject: 'Create your first project',
      editProject: 'Edit Project',
      createProject: 'Create Project',
      startDate: 'Start Date',
      category: 'Category',
      deleteProject: 'Delete Project',
      deleteConfirmation: 'Are you sure you want to delete this project?',
      deleteWarning: 'This action is irreversible',
      teamReallocation: 'Team Reallocation',
      aiRecommendationText: 'AI recommendation based on skills and workload analysis',
      suggestedMembers: 'Suggested Members',
      execute: 'Execute',
      projectDuplicated: 'Project duplicated',
      projectExported: 'Project exported',
      projectDeleted: 'Project deleted',
      reallocationCompleted: 'Reallocation completed',
      recommendationDeleted: 'Recommendation deleted',
      projectDuplicatedMessage: 'Project has been duplicated successfully',
      projectExportedMessage: 'Project has been exported',
      projectDeletedMessage: 'Project has been deleted',
      reallocationCompletedMessage: 'Team reallocation has been completed',
    },
    tasks: {
      title: 'Tasks',
      subtitle: 'Organize and track your daily tasks',
      newTask: 'New Task',
      taskTitle: 'Task Title',
      description: 'Description',
      assignee: 'Assignee',
      dueDate: 'Due Date',
      status: 'Status',
      priority: 'Priority',
      project: 'Project',
      tags: 'Tags',
      statusTodo: 'To Do',
      statusInProgress: 'In Progress',
      statusCompleted: 'Completed',
      statusBlocked: 'Blocked',
      allTasks: 'All Tasks',
      myTasks: 'My Tasks',
      overdue: 'Overdue',
      today: 'Today',
      thisWeek: 'This Week',
      upcoming: 'Upcoming',
      noTasks: 'No tasks found',
      createFirstTask: 'Create your first task',
      resetFilters: 'Reset filters',
      createTask: 'Create task',
      startDate: 'Start date',
      tagsPlaceholder: 'frontend, urgent, bug',
      tagsSeparator: 'Tags (comma separated)',
      daysLate: 'days late',
      todayDeadline: 'Today',
      daysRemaining: 'days remaining',
      hoursLabel: 'Hours',
      noTasksFound: 'No tasks found',
      noTasksFiltered: 'No tasks match your search criteria.',
    },
    team: {
      title: 'Team',
      subtitle: 'Manage your team and collaborators',
      addMember: 'Add Member',
      newTeam: 'New Team',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      department: 'Department',
      performance: 'Performance',
      activeProjects: 'Active Projects',
      completedTasks: 'Completed Tasks',
      workload: 'Workload',
      availability: 'Availability',
      skills: 'Skills',
      roleAdmin: 'Administrator',
      roleManager: 'Manager',
      roleDeveloper: 'Developer',
      roleDesigner: 'Designer',
      roleAnalyst: 'Analyst',
      statusActive: 'Active',
      statusVacation: 'On Vacation',
      statusBusy: 'Busy',
      statusOffline: 'Offline',
      viewProfile: 'View profile',
      teams: 'Teams',
      allUsers: 'All users',
      members: 'Members',
      noTeamMembers: 'No team members',
      addFirstMember: 'Add your first member',
    },
    calendar: {
      title: 'Calendar',
      subtitle: 'Plan and track your events',
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      agenda: 'Agenda',
      newEvent: 'New Event',
      eventTitle: 'Event Title',
      eventDescription: 'Description',
      startTime: 'Start Time',
      endTime: 'End Time',
      location: 'Location',
      attendees: 'Attendees',
      reminder: 'Reminder',
      allDay: 'All day',
      repeat: 'Repeat',
      noEvents: 'No events',
      createFirstEvent: 'Create your first event',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Share your ideas and updates',
      newPost: 'New Post',
      postTitle: 'Post Title',
      content: 'Content',
      author: 'Author',
      publishDate: 'Publish Date',
      category: 'Category',
      tags: 'Tags',
      status: 'Status',
      statusDraft: 'Draft',
      statusPublished: 'Published',
      statusArchived: 'Archived',
      allPosts: 'All Posts',
      myPosts: 'My Posts',
      recentPosts: 'Recent Posts',
      noPosts: 'No posts',
      createFirstPost: 'Create your first post',
      readMore: 'Read more',
      comments: 'Comments',
      likes: 'Likes',
      shares: 'Shares',
      // Additional keys
      edit: 'Edit',
      share: 'Share',
      delete: 'Delete',
      read: 'Read',
      comment: 'Comment',
      like: 'Like',
      save: 'Save',
      create: 'Create',
      featured: '⭐ Featured Article',
      draft: 'Draft',
      archived: 'Archived',
      totalArticles: 'Total Articles',
      totalViews: 'Total Views',
      totalLikes: 'Total Likes',
      totalComments: 'Total Comments',
      searchPlaceholder: 'Search articles...',
      noPostsFound: 'No articles found',
      noPostsFiltered: 'No articles match your search criteria.',
      newArticle: 'New article',
      editArticle: 'Edit article',
      articleSummary: 'Article summary...',
      articleContent: '# Article Title\n\nWrite your content here...',
      shareArticle: 'Share article',
      shareOnSocial: 'Share on social media',
      postCreated: 'Article created',
      postUpdated: 'Article updated',
      postDeleted: 'Article deleted',
      postMessage: 'The article',
      hasBeenCreated: 'has been created successfully',
      hasBeenUpdated: 'has been updated successfully',
      hasBeenDeleted: 'has been deleted successfully',
      preview: 'Preview',
    },
    settings: {
      title: 'Settings',
      subtitle: 'Configure your application',
      general: 'General',
      account: 'Account',
      notifications: 'Notifications',
      security: 'Security',
      integrations: 'Integrations',
      advanced: 'Advanced',
      language: 'Language',
      theme: 'Theme',
      timezone: 'Timezone',
      currency: 'Currency',
      dateFormat: 'Date Format',
      emailNotifications: 'Email Notifications',
      pushNotifications: 'Push Notifications',
      weeklyReports: 'Weekly Reports',
      changePassword: 'Change Password',
      twoFactorAuth: 'Two-Factor Authentication',
      apiKeys: 'API Keys',
      backupData: 'Backup Data',
      deleteAccount: 'Delete Account',
      personalInfo: 'Personal Information',
      preferences: 'Preferences',
      privacy: 'Privacy',
      billing: 'Billing',
      subscription: 'Subscription',
      usage: 'Usage',
      support: 'Support',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      systemMode: 'System Mode',
    },
    helpSupport: {
      title: 'Help & Support',
      subtitle: 'Find the help you need',
      searchHelp: 'Search help',
      documentation: 'Documentation',
      tutorials: 'Tutorials',
      faq: 'FAQ',
      contactSupport: 'Contact Support',
      reportBug: 'Report Bug',
      featureRequest: 'Feature Request',
      communityForum: 'Community Forum',
      videoTutorials: 'Video Tutorials',
      gettingStarted: 'Getting Started',
      userGuide: 'User Guide',
      apiDocs: 'API Documentation',
      troubleshooting: 'Troubleshooting',
      status: 'Status',
      updates: 'Updates',
      releaseNotes: 'Release Notes',
    },
    aiPremium: {
      title: 'AI Premium',
      subtitle: 'Unlock the full potential of AI',
      features: 'Features',
      pricing: 'Pricing',
      comparison: 'Comparison',
      testimonials: 'Testimonials',
      faq: 'FAQ',
      contactSales: 'Contact Sales',
      startTrial: 'Start Trial',
      upgrade: 'Upgrade',
      currentPlan: 'Current Plan',
      billingCycle: 'Billing Cycle',
      nextBilling: 'Next Billing',
      usage: 'Usage',
      limits: 'Limits',
      addons: 'Add-ons',
      discount: 'Discount',
      promo: 'Promo',
      enterprise: 'Enterprise',
      custom: 'Custom',
      mostPopular: 'Most popular',
      freeTrial: 'Free trial',
      advancedAnalytics: 'Advanced Analytics',
      predictiveInsights: 'Predictive Insights',
      automatedOptimization: 'Automated Optimization',
      prioritySupport: 'Priority Support',
      unlimitedProjects: 'Unlimited Projects',
      teamCollaboration: 'Team Collaboration',
      dataExport: 'Data Export',
    },
    ai: {
      insights: 'Advanced AI Insights',
      smartDashboard: 'Smart AI Dashboard',
      assistant: 'AI Assistant',
      analyzing: 'Analyzing...',
      generating: 'Generating...',
      confidence: 'Confidence',
      impact: 'Impact',
      category: 'Category',
      actionable: 'Actionable',
      applied: 'Applied',
      recommendation: 'Recommendation',
      prediction: 'Prediction',
      optimization: 'Optimization',
      risk: 'Risk',
      opportunity: 'Opportunity',
      impactHigh: 'High',
      impactMedium: 'Medium',
      impactLow: 'Low',
      generateInsights: 'Generate AI Insights',
      refreshAI: 'Refresh AI',
      aiScore: 'Global AI Score',
      fallbackMode: 'Fallback Mode',
      aiActive: 'AI Active',
      clearHistory: 'Clear history',
      applyAction: 'Apply action',
      viewDetails: 'View details',
      seeAll: 'See all',
      smartAlerts: 'Smart Alerts',
      predictiveAnalysis: 'Predictive Analysis',
      teamEfficiency: 'Team Efficiency',
      projectHealth: 'Project Health',
      performanceMatrix: 'Performance Matrix',
      budgetAnalysis: 'Budget Analysis',
      riskAssessment: 'Risk Assessment',
      globalScore: 'Global Performance Score',
      onTimeDelivery: 'On-Time Delivery',
      averageBudget: 'Average Budget/Project',
      insightsTitle: 'Advanced AI Insights',
      insightsSubtitle: 'Predictive analytics and intelligent recommendations',
      analysisInProgress: 'Analysis in progress',
      analysisDescription: 'AI is analyzing your data to generate personalized insights...',
      welcomeInsightTitle: 'Welcome to AI Insights',
      welcomeInsightDescription: 'Discover how AI can improve your project performance',
      actionApplied: 'Action applied successfully',
      actionNotActionable: 'This action is not applicable currently',
      actionErrorMessage: 'Error applying action',
      confirmClearHistory: 'Are you sure you want to clear insights history?',
      confidenceAI: 'AI Confidence',
      detailedDescription: 'Detailed description',
      detailedData: 'Detailed data',
      modalClose: 'Close',
      appliedAction: 'Applied action',
      clearHistoryTitle: 'Clear insights history',
      systemCategory: 'System',
      performanceCategory: 'Performance',
      planningCategory: 'Planning',
      resourcesCategory: 'Resources',
      qualityCategory: 'Quality',
      riskCategory: 'Risk',
      opportunityCategory: 'Opportunity',
      optimizationCategory: 'Optimization',
      predictionCategory: 'Prediction',
      recommendationCategory: 'Recommendation',
    },
    analytics: {
      title: 'Analytics',
      overview: 'Overview',
      performance: 'Performance',
      trends: 'Trends',
      reports: 'Reports',
      timeframe: 'Timeframe',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      thisQuarter: 'This Quarter',
      thisYear: 'This Year',
      custom: 'Custom',
      exportData: 'Export Data',
      shareReport: 'Share Report',
      schedule: 'Schedule',
    },
    status: {
      active: 'Active',
      inactive: 'Inactive',
      pending: 'Pending',
      completed: 'Completed',
      inProgress: 'In Progress',
      blocked: 'Blocked',
      cancelled: 'Cancelled',
      onHold: 'On Hold',
      draft: 'Draft',
      published: 'Published',
      archived: 'Archived',
    },
    time: {
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      thisWeek: 'This Week',
      nextWeek: 'Next Week',
      thisMonth: 'This Month',
      nextMonth: 'Next Month',
      thisYear: 'This Year',
      ago: 'ago',
      remaining: 'remaining',
      overdue: 'overdue',
      dueToday: 'Due today',
      dueTomorrow: 'Due tomorrow',
      dueThisWeek: 'Due this week',
      dueNextWeek: 'Due next week',
    },
    messages: {
      welcome: 'Welcome to ProjectFlow AI!',
      projectCreated: 'Project created successfully',
      projectUpdated: 'Project updated',
      projectDeleted: 'Project deleted',
      taskCreated: 'Task created successfully',
      taskUpdated: 'Task updated',
      taskCompleted: 'Task completed',
      taskDeleted: 'Task deleted',
      memberAdded: 'Member added to team',
      memberRemoved: 'Member removed from team',
      memberUpdated: 'Member information updated',
      settingsSaved: 'Settings saved',
      errorOccurred: 'An error occurred',
      noDataAvailable: 'No data available',
      loadingData: 'Loading data...',
      actionSuccessful: 'Action completed successfully',
      actionFailed: 'Action failed',
      confirmDelete: 'Are you sure you want to delete?',
      unsavedChanges: 'Unsaved changes',
    },
    forms: {
      required: 'This field is required',
      invalidEmail: 'Invalid email',
      passwordTooShort: 'Password too short',
      passwordMismatch: 'Passwords do not match',
      invalidDate: 'Invalid date',
      invalidNumber: 'Invalid number',
      maxLength: 'Maximum length exceeded',
      minLength: 'Minimum length not reached',
      selectOption: 'Select an option',
      uploadFile: 'Upload a file',
      dragDropFile: 'Drag and drop a file here',
      fileTooBig: 'File too large',
      invalidFileType: 'Invalid file type',
    },
    aiPrompts: {
      analyzeProject: 'Analyze this project and provide insights',
      generateTasks: 'Generate task suggestions',
      predictOutcome: 'Predict project outcome',
      optimizeWorkflow: 'Optimize workflow',
      assessRisk: 'Assess project risks',
      recommendActions: 'Recommend actions',
      summarizeProgress: 'Summarize progress',
      identifyBottlenecks: 'Identify bottlenecks',
      suggestImprovements: 'Suggest improvements',
      forecastTimeline: 'Forecast timeline',
    },
  },
};