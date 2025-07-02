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

  // Header
  header: {
    title: string;
    subtitle: string;
    language: string;
    notifications: string;
    profile: string;
    logout: string;
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
    // Stats
    activeProjects: string;
    pendingTasks: string;
    vsLastMonth: string;
    // Alerts
    attentionRequired: string;
    tasksOverdue: string;
    taskOverdue: string;
    budgetUtilizationHigh: string;
    reviewSpending: string;
    // Charts
    performanceOverview: string;
    taskDistribution: string;
    totalTasks: string;
    completedTasks: string;
    // Project List
    recentProjects: string;
    viewAll: string;
    viewCalendar: string;
    // Deadlines
    noUpcomingDeadlines: string;
    allProjectsOnTrack: string;
    today: string;
    dayLeft: string;
    daysLeft: string;
    // Status labels
    completed: string;
    inProgress: string;
    toDo: string;
    review: string;
    onHold: string;
  };

  // Projects
  projects: {
    title: string;
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
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;
    priorityCritical: string;
    allProjects: string;
    myProjects: string;
    recentProjects: string;
  };

  // Tasks
  tasks: {
    title: string;
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
  };

  // Team
  team: {
    title: string;
    addMember: string;
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
    clearHistoryTitle: string;
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
    insightsCount: string;
    systemCategory: string;
    performanceCategory: string;
    planningCategory: string;
    resourcesCategory: string;
    processCategory: string;
    budgetCategory: string;
    qualityCategory: string;
    risksCategory: string;
    opportunitiesCategory: string;
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

  // Settings
  settings: {
    title: string;
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
  };

  // Sidebar
  sidebar: {
    poweredByAI: string;
    aiPremiumDescription: string;
    discoverPremium: string;
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
      aiInsights: 'Insights IA',
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
    header: {
      title: 'ProjectFlow AI',
      subtitle: 'Gestion de Projets Intelligente',
      language: 'Langue',
      notifications: 'Notifications',
      profile: 'Profil',
      logout: 'Déconnexion',
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
      // Stats
      activeProjects: 'Projets Actifs',
      pendingTasks: 'Tâches en Attente',
      vsLastMonth: 'vs mois dernier',
      // Alerts
      attentionRequired: 'Attention Requise',
      tasksOverdue: 'tâches sont en retard',
      taskOverdue: 'tâche est en retard',
      budgetUtilizationHigh: 'L\'utilisation du budget est à',
      reviewSpending: '- réviser les dépenses',
      // Charts
      performanceOverview: 'Aperçu Performance',
      taskDistribution: 'Répartition des Tâches',
      totalTasks: 'Tâches Totales',
      completedTasks: 'Tâches Terminées',
      // Project List
      recentProjects: 'Projets Récents',
      viewAll: 'Voir Tout',
      viewCalendar: 'Voir Calendrier',
      // Deadlines
      noUpcomingDeadlines: 'Aucune échéance à venir',
      allProjectsOnTrack: 'Tous les projets sont sur la bonne voie ou terminés',
      today: 'Aujourd\'hui',
      dayLeft: 'jour restant',
      daysLeft: 'jours restants',
      // Status labels
      completed: 'Terminé',
      inProgress: 'En Cours',
      toDo: 'À Faire',
      review: 'Révision',
      onHold: 'En Pause',
    },
    projects: {
      title: 'Projets',
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
      priorityLow: 'Faible',
      priorityMedium: 'Moyenne',
      priorityHigh: 'Haute',
      priorityCritical: 'Critique',
      allProjects: 'Tous les Projets',
      myProjects: 'Mes Projets',
      recentProjects: 'Projets Récents',
    },
    tasks: {
      title: 'Tâches',
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
    },
    team: {
      title: 'Équipe',
      addMember: 'Ajouter Membre',
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
      clearHistoryTitle: 'Vider l\'historique des insights',
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
      // AI Insights specific
      insightsTitle: 'Insights IA Avancés',
      insightsSubtitle: 'Analyse intelligente • Prédictions précises • Recommandations actionables',
      analysisInProgress: 'Analyse IA en cours...',
      analysisDescription: 'Traitement des données • Génération d\'insights • Calcul de confiance',
      welcomeInsightTitle: '🎉 Bienvenue dans les Insights IA !',
      welcomeInsightDescription: 'Cliquez sur "Actualiser IA" pour générer des analyses intelligentes basées sur vos données de projet.',
      actionApplied: 'Action appliquée avec succès',
      actionNotActionable: 'Cette insight n\'est pas actionnable.',
      actionErrorMessage: 'Erreur lors de l\'application de l\'action.',
      confirmClearHistory: 'Êtes-vous sûr de vouloir vider tout l\'historique des insights ?',
      confidenceAI: 'Confiance IA',
      detailedDescription: 'Description détaillée',
      detailedData: 'Données détaillées',
      modalClose: 'Fermer',
      appliedAction: '✅ Action appliquée',
      insightsCount: 'insights',
      systemCategory: 'Système',
      performanceCategory: 'Performance',
      planningCategory: 'Planning',
      resourcesCategory: 'Ressources',
      processCategory: 'Processus',
      budgetCategory: 'Budget',
      qualityCategory: 'Qualité',
      risksCategory: 'Risques',
      opportunitiesCategory: 'Opportunités',
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
    settings: {
      title: 'Paramètres',
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
    },
    sidebar: {
      poweredByAI: 'Powered by Advanced AI',
      aiPremiumDescription: 'Débloquez l\'analyse prédictive avancée et l\'optimisation automatique',
      discoverPremium: 'Découvrir Premium',
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
      aiInsights: 'AI Insights',
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
    header: {
      title: 'ProjectFlow AI',
      subtitle: 'Intelligent Project Management',
      language: 'Language',
      notifications: 'Notifications',
      profile: 'Profile',
      logout: 'Logout',
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
      // Stats
      activeProjects: 'Active Projects',
      pendingTasks: 'Pending Tasks',
      vsLastMonth: 'vs last month',
      // Alerts
      attentionRequired: 'Attention Required',
      tasksOverdue: 'tasks are overdue',
      taskOverdue: 'task is overdue',
      budgetUtilizationHigh: 'Budget utilization is at',
      reviewSpending: '- review spending',
      // Charts
      performanceOverview: 'Performance Overview',
      taskDistribution: 'Task Distribution',
      totalTasks: 'Total Tasks',
      completedTasks: 'Completed Tasks',
      // Project List
      recentProjects: 'Recent Projects',
      viewAll: 'View All',
      viewCalendar: 'View Calendar',
      // Deadlines
      noUpcomingDeadlines: 'No upcoming deadlines',
      allProjectsOnTrack: 'All projects are on track or completed',
      today: 'Today',
      dayLeft: 'day left',
      daysLeft: 'days left',
      // Status labels
      completed: 'Completed',
      inProgress: 'In Progress',
      toDo: 'To Do',
      review: 'Review',
      onHold: 'On Hold',
    },
    projects: {
      title: 'Projects',
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
      priorityLow: 'Low',
      priorityMedium: 'Medium',
      priorityHigh: 'High',
      priorityCritical: 'Critical',
      allProjects: 'All Projects',
      myProjects: 'My Projects',
      recentProjects: 'Recent Projects',
    },
    tasks: {
      title: 'Tasks',
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
    },
    team: {
      title: 'Team',
      addMember: 'Add Member',
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
      clearHistoryTitle: 'Clear insights history',
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
      // AI Insights specific
      insightsTitle: 'Advanced AI Insights',
      insightsSubtitle: 'Intelligent analysis • Accurate predictions • Actionable recommendations',
      analysisInProgress: 'AI Analysis in progress...',
      analysisDescription: 'Processing data • Generating insights • Calculating confidence',
      welcomeInsightTitle: '🎉 Welcome to AI Insights!',
      welcomeInsightDescription: 'Click "Refresh AI" to generate intelligent analyses based on your project data.',
      actionApplied: 'Action applied successfully',
      actionNotActionable: 'This insight is not actionable.',
      actionErrorMessage: 'Error applying action.',
      confirmClearHistory: 'Are you sure you want to clear all insights history?',
      confidenceAI: 'AI Confidence',
      detailedDescription: 'Detailed description',
      detailedData: 'Detailed data',
      modalClose: 'Close',
      appliedAction: '✅ Action applied',
      insightsCount: 'insights',
      systemCategory: 'System',
      performanceCategory: 'Performance',
      planningCategory: 'Planning',
      resourcesCategory: 'Resources',
      processCategory: 'Process',
      budgetCategory: 'Budget',
      qualityCategory: 'Quality',
      risksCategory: 'Risks',
      opportunitiesCategory: 'Opportunities',
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
    settings: {
      title: 'Settings',
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
    },
    sidebar: {
      poweredByAI: 'Powered by Advanced AI',
      aiPremiumDescription: 'Unlock advanced predictive analysis and automatic optimization',
      discoverPremium: 'Discover Premium',
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