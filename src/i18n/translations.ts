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
    priorityLow: string;
    priorityMedium: string;
    priorityHigh: string;
    priorityCritical: string;
    allProjects: string;
    myProjects: string;
    recentProjects: string;
    // Additional fields for Projects component
    totalProjects: string;
    completionRate: string;
    totalBudget: string;
    averageProgress: string;
    activeProjectsCount: string;
    completedProjectsCount: string;
    overdueProjects: string;
    budgetUsed: string;
    late: string;
    // AI Recommendations
    aiRecommendations: string;
    addRecommendation: string;
    teamReallocationSuggested: string;
    budgetOptimizationDetected: string;
    delayRiskIdentified: string;
    accelerationOpportunity: string;
    confidence: string;
    reallocateNow: string;
    editRecommendation: string;
    newAiRecommendation: string;
    recommendationTitle: string;
    recommendationType: string;
    recommendationImpact: string;
    recommendationConfidence: string;
    recommendationProject: string;
    actionableRecommendation: string;
    typeReallocation: string;
    typeOptimization: string;
    typeRisk: string;
    typeOpportunity: string;
    impactLow: string;
    impactMedium: string;
    impactHigh: string;
    selectProject: string;
    // Filters and search
    searchProjects: string;
    allStatuses: string;
    allPriorities: string;
    statusPlanning: string;
    statusInProgress: string;
    statusReview: string;
    statusOnPause: string;
    // Project actions
    edit: string;
    duplicate: string;
    export: string;
    delete: string;
    viewDetails: string;
    // Project details
    tasks: string;
    members: string;
    todayText: string;
    daysRemaining: string;
    daysLate: string;
    // Project modal
    editProject: string;
    createProject: string;
    startDate: string;
    category: string;
    save: string;
    cancel: string;
    // Delete confirmation
    deleteProject: string;
    deleteConfirmation: string;
    deleteWarning: string;
    // Team reallocation
    teamReallocation: string;
    aiRecommendationText: string;
    suggestedMembers: string;
    execute: string;
    // Notifications
    projectDuplicated: string;
    projectExported: string;
    projectDeleted: string;
    reallocationCompleted: string;
    recommendationDeleted: string;
    projectDuplicatedMessage: string;
    projectExportedMessage: string;
    projectDeletedMessage: string;
    reallocationCompletedMessage: string;
    // Status display text
    statusPlanningDisplay: string;
    statusInProgressDisplay: string;
    statusReviewDisplay: string;
    statusCompletedDisplay: string;
    statusOnPauseDisplay: string;
    priorityLowDisplay: string;
    priorityMediumDisplay: string;
    priorityHighDisplay: string;
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
    // Role types
    roleAdmin: string;
    roleManager: string;
    roleDeveloper: string;
    roleDesigner: string;
    roleAnalyst: string;
    // Status types
    statusActive: string;
    statusVacation: string;
    statusBusy: string;
    statusOffline: string;
    // Actions
    view: string;
    edit: string;
    delete: string;
    save: string;
    cancel: string;
    close: string;
    viewProfile: string;
    // Team management
    teams: string;
    allUsers: string;
    members: string;
    activeMembers: string;
    projects: string;
    tasks: string;
    averagePerformance: string;
    topPerformer: string;
    bestPerformance: string;
    totalTasksCompleted: string;
    teamTotal: string;
    performantTeam: string;
    since: string;
    // Search and filters
    searchMembers: string;
    allDepartments: string;
    allStatuses: string;
    // Form labels
    fullName: string;
    phone: string;
    location: string;
    status: string;
    team: string;
    noTeam: string;
    selectDepartment: string;
    estimatedTime: string;
    skillsPlaceholder: string;
    skillsSeparator: string;
    completedOn: string;
    activeProjectsCount: string;
    // Modal titles
    addMemberModal: string;
    editProfileModal: string;
    newTeamModal: string;
    editTeamModal: string;
    deleteMemberModal: string;
    // Modal content
    changePhotoText: string;
    teamName: string;
    description: string;
    color: string;
    teamLeader: string;
    create: string;
    addToTeam: string;
    // Delete confirmation
    deleteMember: string;
    deleteConfirmation: string;
    deleteWarning: string;
    // Performance tracking
    tasksCompleted: string;
    performanceMetrics: string;
    // Empty states
    noMembersFound: string;
    noMembersInTeam: string;
    noMembersMatchCriteria: string;
    // Notifications
    userDeleted: string;
    userDeletedMessage: string;
    userAdded: string;
    userUpdated: string;
    userAddedMessage: string;
    userUpdatedMessage: string;
    addedTo: string;
    updatedIn: string;
    // File upload
    selectValidImage: string;
    uploadingImage: string;
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

  // Calendar
  calendar: {
    title: string;
    subtitle: string;
    today: string;
    month: string;
    week: string;
    day: string;
    agenda: string;
    previous: string;
    next: string;
    newEvent: string;
    eventTitle: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    attendees: string;
    allDay: string;
    reminder: string;
    repeat: string;
    category: string;
    meeting: string;
    deadline: string;
    personal: string;
    work: string;
    noEvents: string;
    createFirstEvent: string;
    editEvent: string;
    deleteEvent: string;
    saveEvent: string;
    cancelEvent: string;
  };

  // Blog
  blog: {
    title: string;
    subtitle: string;
    latestPosts: string;
    readMore: string;
    writtenBy: string;
    publishedOn: string;
    categories: string;
    allCategories: string;
    searchPosts: string;
    noPostsFound: string;
    loadingPosts: string;
    featured: string;
    minutes: string;
    readTime: string;
    tags: string;
    share: string;
    relatedPosts: string;
  };

  // Help Support
  help: {
    title: string;
    subtitle: string;
    searchHelp: string;
    popularArticles: string;
    gettingStarted: string;
    troubleshooting: string;
    advanced: string;
    contactSupport: string;
    documentation: string;
    tutorials: string;
    faq: string;
    userGuide: string;
    apiDocs: string;
    community: string;
    helpfulQuestion: string;
    submitFeedback: string;
    reportBug: string;
    featureRequest: string;
  };

  // AI Premium
  premium: {
    title: string;
    subtitle: string;
    currentPlan: string;
    upgradePlan: string;
    features: string;
    pricing: string;
    monthly: string;
    annually: string;
    unlimitedAI: string;
    advancedAnalytics: string;
    prioritySupport: string;
    customIntegrations: string;
    teamCollaboration: string;
    dataExport: string;
    upgradeNow: string;
    contactSales: string;
    freeTrial: string;
    mostPopular: string;
    enterprise: string;
    custom: string;
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

  // Calendar
  calendar: {
    title: string;
    subtitle: string;
    newEvent: string;
    // View options
    monthView: string;
    weekView: string;
    dayView: string;
    agendaView: string;
    // Navigation
    today: string;
    previous: string;
    next: string;
    // Day names (short)
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    // Day names (abbreviated)
    sun: string;
    mon: string;
    tue: string;
    wed: string;
    thu: string;
    fri: string;
    sat: string;
    // Month names
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
    // Event types
    meeting: string;
    deadline: string;
    presentation: string;
    review: string;
    personal: string;
    // Event form
    eventTitle: string;
    eventDescription: string;
    eventDate: string;
    eventType: string;
    startTime: string;
    endTime: string;
    location: string;
    attendees: string;
    reminderMinutes: string;
    recurringEvent: string;
    // Reminder options
    noReminder: string;
    fiveMinutes: string;
    fifteenMinutes: string;
    thirtyMinutes: string;
    oneHour: string;
    oneDay: string;
    // Modal titles
    newEventModal: string;
    editEventModal: string;
    deleteEventModal: string;
    // Actions
    createEvent: string;
    editEvent: string;
    deleteEvent: string;
    saveEvent: string;
    // Placeholders
    eventTitlePlaceholder: string;
    eventDescriptionPlaceholder: string;
    eventLocationPlaceholder: string;
    searchPlaceholder: string;
    // Filters
    allTypes: string;
    meetings: string;
    deadlines: string;
    presentations: string;
    reviews: string;
    personalEvents: string;
    // Status messages
    eventCreated: string;
    eventUpdated: string;
    eventDeleted: string;
    eventCreatedMessage: string;
    eventUpdatedMessage: string;
    eventDeletedMessage: string;
    // Confirmation
    deleteConfirmation: string;
    deleteWarning: string;
    irreversibleAction: string;
    // Time display
    moreEvents: string;
    // Year selector
    selectYear: string;
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
    sidebar: {
      poweredByAI: 'Alimenté par l\'IA',
      aiPremiumUpgrade: 'Mise à niveau IA Premium',
      unlockAdvancedFeatures: 'Débloquez des fonctionnalités avancées d\'IA',
      upgradeNow: 'Mettre à niveau',
      aiAssistantTooltip: 'Assistant IA toujours disponible',
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
      subtitle: 'Gérez vos projets avec l\'intelligence artificielle',
      newProject: 'Nouveau Projet',
      projectName: 'Nom du projet',
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
      // Additional fields for Projects component
      totalProjects: 'Total Projets',
      completionRate: 'Taux de Completion',
      totalBudget: 'Budget Total',
      averageProgress: 'Progression Moyenne',
      activeProjectsCount: 'actifs',
      completedProjectsCount: 'terminés',
      overdueProjects: 'en retard',
      budgetUsed: 'utilisé',
      late: 'en retard',
      // AI Recommendations
      aiRecommendations: 'Recommandations IA',
      addRecommendation: 'Ajouter',
      teamReallocationSuggested: 'Réallocation d\'équipe suggérée',
      budgetOptimizationDetected: 'Optimisation budget détectée',
      delayRiskIdentified: 'Risque de retard identifié',
      accelerationOpportunity: 'Opportunité d\'accélération',
      confidence: 'Confiance',
      reallocateNow: 'Réallouer maintenant',
      editRecommendation: 'Modifier la Recommandation',
      newAiRecommendation: 'Nouvelle Recommandation IA',
      recommendationTitle: 'Titre',
      recommendationType: 'Type',
      recommendationImpact: 'Impact',
      recommendationConfidence: 'Confiance (%)',
      recommendationProject: 'Projet',
      actionableRecommendation: 'Recommandation actionnable',
      typeReallocation: 'Réallocation',
      typeOptimization: 'Optimisation',
      typeRisk: 'Risque',
      typeOpportunity: 'Opportunité',
      impactLow: 'Faible',
      impactMedium: 'Moyen',
      impactHigh: 'Élevé',
      selectProject: 'Sélectionner un projet',
      // Filters and search
      searchProjects: 'Rechercher des projets...',
      allStatuses: 'Tous les statuts',
      allPriorities: 'Toutes les priorités',
      statusPlanning: 'Planification',
      statusInProgress: 'En cours',
      statusReview: 'Révision',
      statusOnPause: 'En pause',
      // Project actions
      edit: 'Modifier',
      duplicate: 'Dupliquer',
      export: 'Exporter',
      delete: 'Supprimer',
      viewDetails: 'Voir détails',
      // Project details
      tasks: 'Tâches',
      members: 'Membres',
      todayText: 'Aujourd\'hui',
      daysRemaining: 'jours restants',
      daysLate: 'jours de retard',
      // Project modal
      editProject: 'Modifier le Projet',
      createProject: 'Nouveau Projet',
      startDate: 'Date de début',
      category: 'Catégorie',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      // Delete confirmation
      deleteProject: 'Supprimer le projet',
      deleteConfirmation: 'Cette action est irréversible',
      deleteWarning: 'Êtes-vous sûr de vouloir supprimer ce projet ? Toutes les tâches associées seront également supprimées.',
      // Team reallocation
      teamReallocation: 'Réallocation d\'équipe',
      aiRecommendationText: 'Transférer 2 développeurs vers ce projet pour accélérer la livraison de 15%.',
      suggestedMembers: 'Membres suggérés:',
      execute: 'Exécuter',
      // Notifications
      projectDuplicated: 'Projet dupliqué',
      projectExported: 'Projet exporté',
      projectDeleted: 'Projet supprimé',
      reallocationCompleted: 'Réallocation effectuée',
      recommendationDeleted: 'Recommandation supprimée',
      projectDuplicatedMessage: 'a été dupliqué avec succès',
      projectExportedMessage: 'ont été exportées',
      projectDeletedMessage: 'a été supprimé avec succès',
      reallocationCompletedMessage: 'a été réallouée avec succès',
      // Status display text
      statusPlanningDisplay: 'Planification',
      statusInProgressDisplay: 'En cours',
      statusReviewDisplay: 'Révision',
      statusCompletedDisplay: 'Terminé',
      statusOnPauseDisplay: 'En pause',
      priorityLowDisplay: 'Basse',
      priorityMediumDisplay: 'Moyenne',
      priorityHighDisplay: 'Haute',
    },
    tasks: {
      title: 'Tâches',
      subtitle: 'Gérez vos tâches avec l\'intelligence artificielle',
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
      statusReview: 'Révision',
      allTasks: 'Toutes les Tâches',
      myTasks: 'Mes Tâches',
      overdue: 'En Retard',
      today: 'Aujourd\'hui',
      thisWeek: 'Cette Semaine',
      upcoming: 'À Venir',
      // Metrics
      totalTasks: 'Total Tâches',
      completedTasks: 'terminées',
      myTasksMetric: 'Mes Tâches',
      completedPercentage: '% complétées',
      timeTracked: 'Temps Suivi',
      efficiency: '% efficacité',
      overdueTasks: 'En Retard',
      attentionRequired: 'Nécessitent attention',
      // AI Insights
      aiInsightsTitle: 'Insights IA sur les Tâches',
      productivity: 'Productivité',
      vsLastMonth: 'vs mois dernier',
      aiAccuracy: 'Précision IA',
      exactPredictions: 'Prédictions exactes',
      collaboration: 'Collaboration',
      teamScore: 'Score d\'équipe',
      // Filters and search
      globalSearch: 'Recherche globale...',
      searchByTitle: 'Rechercher par titre...',
      tasksCount: 'tâches',
      filtered: 'Filtré',
      sorted: 'Trié',
      savedViews: 'Vues sauvegardées',
      viewName: 'Nom de la vue...',
      export: 'Export',
      reset: 'Reset',
      // Priority levels
      priorityLow: 'Basse',
      priorityMedium: 'Moyenne',
      priorityHigh: 'Haute',
      priorityCritical: 'Critique',
      // Table headers
      task: 'Tâche',
      assigned: 'Assigné',
      deadline: 'Échéance',
      time: 'Temps',
      actions: 'Actions',
      // Time tracking
      hours: 'h',
      estimatedTime: 'Temps estimé (heures)',
      timeTracking: 'Suivi du temps',
      addTime: 'Ajouter',
      // Actions
      view: 'Visualiser',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      // Task details
      details: 'Détails',
      comments: 'Commentaires',
      addComment: 'Ajouter un commentaire...',
      send: 'Envoyer',
      createdOn: 'Créée le',
      completedOn: 'Terminée le',
      // Modals
      editTask: 'Modifier la Tâche',
      newTaskModal: 'Nouvelle Tâche',
      deleteTask: 'Supprimer la tâche',
      deleteConfirmation: 'Cette action est irréversible',
      deleteWarning: 'Êtes-vous sûr de vouloir supprimer cette tâche ? Toutes les données associées seront perdues.',
      // Status messages
      taskDeleted: 'Tâche supprimée',
      taskDeletedMessage: 'a été supprimée avec succès',
      statusUpdated: 'Statut mis à jour',
      statusUpdatedMessage: 'Le statut de la tâche a été changé vers',
      taskUpdated: 'Tâche mise à jour',
      taskCreated: 'Tâche créée',
      taskSavedMessage: 'a été',
      taskSavedUpdated: 'mise à jour',
      taskSavedCreated: 'créée',
      successMessage: 'avec succès',
      viewSaved: 'Vue sauvegardée',
      viewSavedMessage: 'a été sauvegardée',
      viewLoaded: 'Vue chargée',
      viewLoadedMessage: 'a été chargée',
      // Empty state
      noTasksFound: 'Aucune tâche trouvée',
      noTasksFiltered: 'Aucune tâche ne correspond à vos critères de recherche.',
      createFirstTask: 'Commencez par créer votre première tâche.',
      resetFilters: 'Réinitialiser les filtres',
      createTask: 'Créer une tâche',
      // Form labels
      title: 'Titre',
      startDate: 'Date de début',
      tagsPlaceholder: 'frontend, urgent, bug',
      tagsSeparator: 'Tags (séparés par des virgules)',
      // Time display
      daysLate: 'jours de retard',
      todayDeadline: 'Aujourd\'hui',
      daysRemaining: 'jours restants',
      hoursLabel: 'Heures',
    },
    team: {
      title: 'Équipe',
      subtitle: 'Gérez vos équipes et collaborateurs',
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
      // Role types
      roleAdmin: 'Administrateur',
      roleManager: 'Manager',
      roleDeveloper: 'Développeur',
      roleDesigner: 'Designer',
      roleAnalyst: 'Analyste',
      // Status types
      statusActive: 'Actif',
      statusVacation: 'En congé',
      statusBusy: 'Occupé',
      statusOffline: 'Hors ligne',
      // Actions
      view: 'Voir',
      edit: 'Modifier',
      delete: 'Supprimer',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      close: 'Fermer',
      viewProfile: 'Voir le profil',
      // Team management
      teams: 'Équipes',
      allUsers: 'Tous les utilisateurs',
      members: 'Membres',
      activeMembers: 'actifs',
      projects: 'Projets',
      tasks: 'Tâches',
      averagePerformance: 'Performance Moy.',
      topPerformer: 'Top Performer',
      bestPerformance: 'Meilleure performance',
      totalTasksCompleted: 'Tâches Terminées',
      teamTotal: 'Total équipe',
      performantTeam: 'Équipe performante',
      since: 'Depuis',
      // Search and filters
      searchMembers: 'Rechercher des membres...',
      allDepartments: 'Tous les départements',
      allStatuses: 'Tous les statuts',
      // Form labels
      fullName: 'Nom complet',
      phone: 'Téléphone',
      location: 'Localisation',
      status: 'Statut',
      team: 'Équipe',
      noTeam: 'Aucune équipe',
      selectDepartment: 'Sélectionner un département',
      estimatedTime: 'Temps estimé (heures)',
      skillsPlaceholder: 'React, TypeScript, Node.js',
      skillsSeparator: 'Compétences (séparées par des virgules)',
      completedOn: 'Terminée le',
      activeProjectsCount: 'Projets actifs',
      // Modal titles
      addMemberModal: 'Ajouter un membre',
      editProfileModal: 'Modifier le profil',
      newTeamModal: 'Nouvelle équipe',
      editTeamModal: 'Modifier l\'équipe',
      deleteMemberModal: 'Supprimer le membre',
      // Modal content
      changePhotoText: 'Cliquez sur l\'icône pour changer la photo',
      teamName: 'Nom de l\'équipe',
      description: 'Description',
      color: 'Couleur',
      teamLeader: 'Chef d\'équipe',
      create: 'Créer',
      addToTeam: 'Ajouter à l\'équipe',
      // Delete confirmation
      deleteMember: 'Supprimer le membre',
      deleteConfirmation: 'Cette action est irréversible',
      deleteWarning: 'Êtes-vous sûr de vouloir supprimer ce membre de l\'équipe ? Toutes ses assignations seront également supprimées.',
      // Performance tracking
      tasksCompleted: 'Tâches terminées',
      performanceMetrics: 'Performance',
      // Empty states
      noMembersFound: 'Aucun membre trouvé',
      noMembersInTeam: 'Aucun membre dans l\'équipe',
      noMembersMatchCriteria: 'ne correspond à vos critères.',
      // Notifications
      userDeleted: 'Utilisateur supprimé',
      userDeletedMessage: 'a été supprimé de l\'équipe',
      userAdded: 'Utilisateur ajouté',
      userUpdated: 'Utilisateur mis à jour',
      userAddedMessage: 'a été ajouté à',
      userUpdatedMessage: 'a été mis à jour dans',
      addedTo: 'ajouté à',
      updatedIn: 'mis à jour dans',
      // File upload
      selectValidImage: 'Veuillez sélectionner un fichier image valide.',
      uploadingImage: 'Téléchargement...',
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
    calendar: {
      title: 'Calendrier',
      subtitle: 'Gérez vos événements et échéances',
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      agenda: 'Agenda',
      previous: 'Précédent',
      next: 'Suivant',
      newEvent: 'Nouvel Événement',
      eventTitle: 'Titre de l\'événement',
      description: 'Description',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      location: 'Lieu',
      attendees: 'Participants',
      allDay: 'Toute la journée',
      reminder: 'Rappel',
      repeat: 'Répéter',
      category: 'Catégorie',
      meeting: 'Réunion',
      deadline: 'Échéance',
      personal: 'Personnel',
      work: 'Travail',
      noEvents: 'Aucun événement',
      createFirstEvent: 'Créer votre premier événement',
      editEvent: 'Modifier l\'événement',
      deleteEvent: 'Supprimer l\'événement',
      saveEvent: 'Sauvegarder',
      cancelEvent: 'Annuler',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Articles et guides pour optimiser vos projets',
      latestPosts: 'Derniers articles',
      readMore: 'Lire la suite',
      writtenBy: 'Écrit par',
      publishedOn: 'Publié le',
      categories: 'Catégories',
      allCategories: 'Toutes les catégories',
      searchPosts: 'Rechercher des articles...',
      noPostsFound: 'Aucun article trouvé',
      loadingPosts: 'Chargement des articles...',
      featured: 'À la une',
      minutes: 'minutes',
      readTime: 'de lecture',
      tags: 'Tags',
      share: 'Partager',
      relatedPosts: 'Articles connexes',
    },
    help: {
      title: 'Aide et Support',
      subtitle: 'Trouvez des réponses et obtenez de l\'aide',
      searchHelp: 'Rechercher dans l\'aide...',
      popularArticles: 'Articles populaires',
      gettingStarted: 'Premiers pas',
      troubleshooting: 'Dépannage',
      advanced: 'Avancé',
      contactSupport: 'Contacter le support',
      documentation: 'Documentation',
      tutorials: 'Tutoriels',
      faq: 'FAQ',
      userGuide: 'Guide utilisateur',
      apiDocs: 'Documentation API',
      community: 'Communauté',
      helpfulQuestion: 'Cette réponse vous a-t-elle aidé ?',
      submitFeedback: 'Envoyer des commentaires',
      reportBug: 'Signaler un bug',
      featureRequest: 'Demander une fonctionnalité',
    },
    premium: {
      title: 'IA Premium',
      subtitle: 'Débloquez tout le potentiel de l\'intelligence artificielle',
      currentPlan: 'Plan actuel',
      upgradePlan: 'Mettre à niveau',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      monthly: 'Mensuel',
      annually: 'Annuel',
      unlimitedAI: 'IA illimitée',
      advancedAnalytics: 'Analyses avancées',
      prioritySupport: 'Support prioritaire',
      customIntegrations: 'Intégrations personnalisées',
      teamCollaboration: 'Collaboration d\'équipe',
      dataExport: 'Export de données',
      upgradeNow: 'Mettre à niveau maintenant',
      contactSales: 'Contacter les ventes',
      freeTrial: 'Essai gratuit',
      mostPopular: 'Le plus populaire',
      enterprise: 'Entreprise',
      custom: 'Personnalisé',
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
    calendar: {
      title: 'Calendrier',
      subtitle: 'Gérez vos événements et rendez-vous',
      newEvent: 'Nouvel Événement',
      // View options
      monthView: 'Mois',
      weekView: 'Semaine',
      dayView: 'Jour',
      agendaView: 'Agenda',
      // Navigation
      today: 'Aujourd\'hui',
      previous: 'Précédent',
      next: 'Suivant',
      // Day names (short)
      sunday: 'Dimanche',
      monday: 'Lundi',
      tuesday: 'Mardi',
      wednesday: 'Mercredi',
      thursday: 'Jeudi',
      friday: 'Vendredi',
      saturday: 'Samedi',
      // Day names (abbreviated)
      sun: 'Dim',
      mon: 'Lun',
      tue: 'Mar',
      wed: 'Mer',
      thu: 'Jeu',
      fri: 'Ven',
      sat: 'Sam',
      // Month names
      january: 'Janvier',
      february: 'Février',
      march: 'Mars',
      april: 'Avril',
      may: 'Mai',
      june: 'Juin',
      july: 'Juillet',
      august: 'Août',
      september: 'Septembre',
      october: 'Octobre',
      november: 'Novembre',
      december: 'Décembre',
      // Event types
      meeting: 'Réunion',
      deadline: 'Échéance',
      presentation: 'Présentation',
      review: 'Révision',
      personal: 'Personnel',
      // Event form
      eventTitle: 'Titre',
      eventDescription: 'Description',
      eventDate: 'Date',
      eventType: 'Type',
      startTime: 'Heure de début',
      endTime: 'Heure de fin',
      location: 'Lieu',
      attendees: 'Participants',
      reminderMinutes: 'Rappel (minutes)',
      recurringEvent: 'Événement récurrent',
      // Reminder options
      noReminder: 'Aucun rappel',
      fiveMinutes: '5 minutes',
      fifteenMinutes: '15 minutes',
      thirtyMinutes: '30 minutes',
      oneHour: '1 heure',
      oneDay: '1 jour',
      // Modal titles
      newEventModal: 'Nouvel Événement',
      editEventModal: 'Modifier l\'Événement',
      deleteEventModal: 'Supprimer l\'événement',
      // Actions
      createEvent: 'Créer',
      editEvent: 'Modifier',
      deleteEvent: 'Supprimer',
      saveEvent: 'Sauvegarder',
      // Placeholders
      eventTitlePlaceholder: 'Titre de l\'événement',
      eventDescriptionPlaceholder: 'Description de l\'événement',
      eventLocationPlaceholder: 'Lieu de l\'événement',
      searchPlaceholder: 'Rechercher...',
      // Filters
      allTypes: 'Tous les types',
      meetings: 'Réunions',
      deadlines: 'Échéances',
      presentations: 'Présentations',
      reviews: 'Révisions',
      personalEvents: 'Personnel',
      // Status messages
      eventCreated: 'Événement créé',
      eventUpdated: 'Événement mis à jour',
      eventDeleted: 'Événement supprimé',
      eventCreatedMessage: 'a été créé avec succès',
      eventUpdatedMessage: 'a été mis à jour avec succès',
      eventDeletedMessage: 'a été supprimé avec succès',
      // Confirmation
      deleteConfirmation: 'Cette action est irréversible',
      deleteWarning: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
      irreversibleAction: 'Cette action est irréversible',
      // Time display
      moreEvents: 'de plus',
      // Year selector
      selectYear: 'Sélectionner une année',
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
    sidebar: {
      poweredByAI: 'Powered by AI',
      aiPremiumUpgrade: 'AI Premium Upgrade',
      unlockAdvancedFeatures: 'Unlock advanced AI features',
      upgradeNow: 'Upgrade Now',
      aiAssistantTooltip: 'AI Assistant always available',
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
      subtitle: 'Manage your projects with artificial intelligence',
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
      // Additional fields for Projects component
      totalProjects: 'Total Projects',
      completionRate: 'Completion Rate',
      totalBudget: 'Total Budget',
      averageProgress: 'Average Progress',
      activeProjectsCount: 'active',
      completedProjectsCount: 'completed',
      overdueProjects: 'overdue',
      budgetUsed: 'used',
      late: 'overdue',
      // AI Recommendations
      aiRecommendations: 'AI Recommendations',
      addRecommendation: 'Add',
      teamReallocationSuggested: 'Team reallocation suggested',
      budgetOptimizationDetected: 'Budget optimization detected',
      delayRiskIdentified: 'Delay risk identified',
      accelerationOpportunity: 'Acceleration opportunity',
      confidence: 'Confidence',
      reallocateNow: 'Reallocate now',
      editRecommendation: 'Edit Recommendation',
      newAiRecommendation: 'New AI Recommendation',
      recommendationTitle: 'Title',
      recommendationType: 'Type',
      recommendationImpact: 'Impact',
      recommendationConfidence: 'Confidence (%)',
      recommendationProject: 'Project',
      actionableRecommendation: 'Actionable recommendation',
      typeReallocation: 'Reallocation',
      typeOptimization: 'Optimization',
      typeRisk: 'Risk',
      typeOpportunity: 'Opportunity',
      impactLow: 'Low',
      impactMedium: 'Medium',
      impactHigh: 'High',
      selectProject: 'Select a project',
      // Filters and search
      searchProjects: 'Search projects...',
      allStatuses: 'All statuses',
      allPriorities: 'All priorities',
      statusPlanning: 'Planning',
      statusInProgress: 'In Progress',
      statusReview: 'Review',
      statusOnPause: 'On Hold',
      // Project actions
      edit: 'Edit',
      duplicate: 'Duplicate',
      export: 'Export',
      delete: 'Delete',
      viewDetails: 'View details',
      // Project details
      tasks: 'Tasks',
      members: 'Members',
      todayText: 'Today',
      daysRemaining: 'days remaining',
      daysLate: 'days overdue',
      // Project modal
      editProject: 'Edit Project',
      createProject: 'New Project',
      startDate: 'Start Date',
      category: 'Category',
      save: 'Save',
      cancel: 'Cancel',
      // Delete confirmation
      deleteProject: 'Delete project',
      deleteConfirmation: 'This action is irreversible',
      deleteWarning: 'Are you sure you want to delete this project? All associated tasks will also be deleted.',
      // Team reallocation
      teamReallocation: 'Team Reallocation',
      aiRecommendationText: 'Transfer 2 developers to this project to accelerate delivery by 15%.',
      suggestedMembers: 'Suggested members:',
      execute: 'Execute',
      // Notifications
      projectDuplicated: 'Project duplicated',
      projectExported: 'Project exported',
      projectDeleted: 'Project deleted',
      reallocationCompleted: 'Reallocation completed',
      recommendationDeleted: 'Recommendation deleted',
      projectDuplicatedMessage: 'has been duplicated successfully',
      projectExportedMessage: 'data has been exported',
      projectDeletedMessage: 'has been deleted successfully',
      reallocationCompletedMessage: 'has been reallocated successfully',
      // Status display text
      statusPlanningDisplay: 'Planning',
      statusInProgressDisplay: 'In Progress',
      statusReviewDisplay: 'Review',
      statusCompletedDisplay: 'Completed',
      statusOnPauseDisplay: 'On Hold',
      priorityLowDisplay: 'Low',
      priorityMediumDisplay: 'Medium',
      priorityHighDisplay: 'High',
    },
    tasks: {
      title: 'Tasks',
      subtitle: 'Manage your tasks with artificial intelligence',
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
      statusReview: 'Review',
      allTasks: 'All Tasks',
      myTasks: 'My Tasks',
      overdue: 'Overdue',
      today: 'Today',
      thisWeek: 'This Week',
      upcoming: 'Upcoming',
      // Metrics
      totalTasks: 'Total Tasks',
      completedTasks: 'completed',
      myTasksMetric: 'My Tasks',
      completedPercentage: '% completed',
      timeTracked: 'Time Tracked',
      efficiency: '% efficiency',
      overdueTasks: 'Overdue',
      attentionRequired: 'Require attention',
      // AI Insights
      aiInsightsTitle: 'AI Insights on Tasks',
      productivity: 'Productivity',
      vsLastMonth: 'vs last month',
      aiAccuracy: 'AI Accuracy',
      exactPredictions: 'Exact predictions',
      collaboration: 'Collaboration',
      teamScore: 'Team score',
      // Filters and search
      globalSearch: 'Global search...',
      searchByTitle: 'Search by title...',
      tasksCount: 'tasks',
      filtered: 'Filtered',
      sorted: 'Sorted',
      savedViews: 'Saved views',
      viewName: 'View name...',
      export: 'Export',
      reset: 'Reset',
      // Priority levels
      priorityLow: 'Low',
      priorityMedium: 'Medium',
      priorityHigh: 'High',
      priorityCritical: 'Critical',
      // Table headers
      task: 'Task',
      assigned: 'Assigned',
      deadline: 'Deadline',
      time: 'Time',
      actions: 'Actions',
      // Time tracking
      hours: 'h',
      estimatedTime: 'Estimated time (hours)',
      timeTracking: 'Time tracking',
      addTime: 'Add',
      // Actions
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      // Task details
      details: 'Details',
      comments: 'Comments',
      addComment: 'Add a comment...',
      send: 'Send',
      createdOn: 'Created on',
      completedOn: 'Completed on',
      // Modals
      editTask: 'Edit Task',
      newTaskModal: 'New Task',
      deleteTask: 'Delete task',
      deleteConfirmation: 'This action is irreversible',
      deleteWarning: 'Are you sure you want to delete this task? All associated data will be lost.',
      // Status messages
      taskDeleted: 'Task deleted',
      taskDeletedMessage: 'has been deleted successfully',
      statusUpdated: 'Status updated',
      statusUpdatedMessage: 'The task status has been changed to',
      taskUpdated: 'Task updated',
      taskCreated: 'Task created',
      taskSavedMessage: 'has been',
      taskSavedUpdated: 'updated',
      taskSavedCreated: 'created',
      successMessage: 'successfully',
      viewSaved: 'View saved',
      viewSavedMessage: 'has been saved',
      viewLoaded: 'View loaded',
      viewLoadedMessage: 'has been loaded',
      // Empty state
      noTasksFound: 'No tasks found',
      noTasksFiltered: 'No tasks match your search criteria.',
      createFirstTask: 'Start by creating your first task.',
      resetFilters: 'Reset filters',
      createTask: 'Create a task',
      // Form labels
      title: 'Title',
      startDate: 'Start Date',
      tagsPlaceholder: 'frontend, urgent, bug',
      tagsSeparator: 'Tags (separated by commas)',
      // Time display
      daysLate: 'days overdue',
      todayDeadline: 'Today',
      daysRemaining: 'days remaining',
      hoursLabel: 'Hours',
    },
    team: {
      title: 'Team',
      subtitle: 'Manage your teams and collaborators',
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
      // Role types
      roleAdmin: 'Administrator',
      roleManager: 'Manager',
      roleDeveloper: 'Developer',
      roleDesigner: 'Designer',
      roleAnalyst: 'Analyst',
      // Status types
      statusActive: 'Active',
      statusVacation: 'On Leave',
      statusBusy: 'Busy',
      statusOffline: 'Offline',
      // Actions
      view: 'View',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      viewProfile: 'View profile',
      // Team management
      teams: 'Teams',
      allUsers: 'All users',
      members: 'Members',
      activeMembers: 'active',
      projects: 'Projects',
      tasks: 'Tasks',
      averagePerformance: 'Avg Performance',
      topPerformer: 'Top Performer',
      bestPerformance: 'Best performance',
      totalTasksCompleted: 'Tasks Completed',
      teamTotal: 'Team total',
      performantTeam: 'High-performing team',
      since: 'Since',
      // Search and filters
      searchMembers: 'Search members...',
      allDepartments: 'All departments',
      allStatuses: 'All statuses',
      // Form labels
      fullName: 'Full name',
      phone: 'Phone',
      location: 'Location',
      status: 'Status',
      team: 'Team',
      noTeam: 'No team',
      selectDepartment: 'Select a department',
      estimatedTime: 'Estimated time (hours)',
      skillsPlaceholder: 'React, TypeScript, Node.js',
      skillsSeparator: 'Skills (separated by commas)',
      completedOn: 'Completed on',
      activeProjectsCount: 'Active projects',
      // Modal titles
      addMemberModal: 'Add member',
      editProfileModal: 'Edit profile',
      newTeamModal: 'New team',
      editTeamModal: 'Edit team',
      deleteMemberModal: 'Delete member',
      // Modal content
      changePhotoText: 'Click the icon to change photo',
      teamName: 'Team name',
      description: 'Description',
      color: 'Color',
      teamLeader: 'Team leader',
      create: 'Create',
      addToTeam: 'Add to team',
      // Delete confirmation
      deleteMember: 'Delete member',
      deleteConfirmation: 'This action is irreversible',
      deleteWarning: 'Are you sure you want to delete this team member? All their assignments will also be removed.',
      // Performance tracking
      tasksCompleted: 'Tasks completed',
      performanceMetrics: 'Performance',
      // Empty states
      noMembersFound: 'No members found',
      noMembersInTeam: 'No members in team',
      noMembersMatchCriteria: 'match your criteria.',
      // Notifications
      userDeleted: 'User deleted',
      userDeletedMessage: 'has been removed from the team',
      userAdded: 'User added',
      userUpdated: 'User updated',
      userAddedMessage: 'has been added to',
      userUpdatedMessage: 'has been updated in',
      addedTo: 'added to',
      updatedIn: 'updated in',
      // File upload
      selectValidImage: 'Please select a valid image file.',
      uploadingImage: 'Uploading...',
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
    calendar: {
      title: 'Calendar',
      subtitle: 'Manage your events and deadlines',
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      agenda: 'Agenda',
      previous: 'Previous',
      next: 'Next',
      newEvent: 'New Event',
      eventTitle: 'Event title',
      description: 'Description',
      startDate: 'Start date',
      endDate: 'End date',
      location: 'Location',
      attendees: 'Attendees',
      allDay: 'All day',
      reminder: 'Reminder',
      repeat: 'Repeat',
      category: 'Category',
      meeting: 'Meeting',
      deadline: 'Deadline',
      personal: 'Personal',
      work: 'Work',
      noEvents: 'No events',
      createFirstEvent: 'Create your first event',
      editEvent: 'Edit event',
      deleteEvent: 'Delete event',
      saveEvent: 'Save',
      cancelEvent: 'Cancel',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Articles and guides to optimize your projects',
      latestPosts: 'Latest posts',
      readMore: 'Read more',
      writtenBy: 'Written by',
      publishedOn: 'Published on',
      categories: 'Categories',
      allCategories: 'All categories',
      searchPosts: 'Search articles...',
      noPostsFound: 'No articles found',
      loadingPosts: 'Loading articles...',
      featured: 'Featured',
      minutes: 'minutes',
      readTime: 'read',
      tags: 'Tags',
      share: 'Share',
      relatedPosts: 'Related posts',
    },
    help: {
      title: 'Help & Support',
      subtitle: 'Find answers and get help',
      searchHelp: 'Search help...',
      popularArticles: 'Popular articles',
      gettingStarted: 'Getting started',
      troubleshooting: 'Troubleshooting',
      advanced: 'Advanced',
      contactSupport: 'Contact support',
      documentation: 'Documentation',
      tutorials: 'Tutorials',
      faq: 'FAQ',
      userGuide: 'User guide',
      apiDocs: 'API Documentation',
      community: 'Community',
      helpfulQuestion: 'Was this answer helpful?',
      submitFeedback: 'Submit feedback',
      reportBug: 'Report a bug',
      featureRequest: 'Request a feature',
    },
    premium: {
      title: 'AI Premium',
      subtitle: 'Unlock the full potential of artificial intelligence',
      currentPlan: 'Current plan',
      upgradePlan: 'Upgrade plan',
      features: 'Features',
      pricing: 'Pricing',
      monthly: 'Monthly',
      annually: 'Annually',
      unlimitedAI: 'Unlimited AI',
      advancedAnalytics: 'Advanced analytics',
      prioritySupport: 'Priority support',
      customIntegrations: 'Custom integrations',
      teamCollaboration: 'Team collaboration',
      dataExport: 'Data export',
      upgradeNow: 'Upgrade now',
      contactSales: 'Contact sales',
      freeTrial: 'Free trial',
      mostPopular: 'Most popular',
      enterprise: 'Enterprise',
      custom: 'Custom',
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
    calendar: {
      title: 'Calendar',
      subtitle: 'Manage your events and appointments',
      newEvent: 'New Event',
      // View options
      monthView: 'Month',
      weekView: 'Week',
      dayView: 'Day',
      agendaView: 'Agenda',
      // Navigation
      today: 'Today',
      previous: 'Previous',
      next: 'Next',
      // Day names (short)
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      // Day names (abbreviated)
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat',
      // Month names
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December',
      // Event types
      meeting: 'Meeting',
      deadline: 'Deadline',
      presentation: 'Presentation',
      review: 'Review',
      personal: 'Personal',
      // Event form
      eventTitle: 'Title',
      eventDescription: 'Description',
      eventDate: 'Date',
      eventType: 'Type',
      startTime: 'Start Time',
      endTime: 'End Time',
      location: 'Location',
      attendees: 'Attendees',
      reminderMinutes: 'Reminder (minutes)',
      recurringEvent: 'Recurring Event',
      // Reminder options
      noReminder: 'No reminder',
      fiveMinutes: '5 minutes',
      fifteenMinutes: '15 minutes',
      thirtyMinutes: '30 minutes',
      oneHour: '1 hour',
      oneDay: '1 day',
      // Modal titles
      newEventModal: 'New Event',
      editEventModal: 'Edit Event',
      deleteEventModal: 'Delete event',
      // Actions
      createEvent: 'Create',
      editEvent: 'Edit',
      deleteEvent: 'Delete',
      saveEvent: 'Save',
      // Placeholders
      eventTitlePlaceholder: 'Event title',
      eventDescriptionPlaceholder: 'Event description',
      eventLocationPlaceholder: 'Event location',
      searchPlaceholder: 'Search...',
      // Filters
      allTypes: 'All types',
      meetings: 'Meetings',
      deadlines: 'Deadlines',
      presentations: 'Presentations',
      reviews: 'Reviews',
      personalEvents: 'Personal',
      // Status messages
      eventCreated: 'Event created',
      eventUpdated: 'Event updated',
      eventDeleted: 'Event deleted',
      eventCreatedMessage: 'has been created successfully',
      eventUpdatedMessage: 'has been updated successfully',
      eventDeletedMessage: 'has been deleted successfully',
      // Confirmation
      deleteConfirmation: 'This action is irreversible',
      deleteWarning: 'Are you sure you want to delete this event?',
      irreversibleAction: 'This action is irreversible',
      // Time display
      moreEvents: 'more',
      // Year selector
      selectYear: 'Select a year',
    },
  },
};