import React, { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { User, Project, Task, CalendarEvent, Notification, Team, BlogPost, BlogComment } from '../types';
import { calculateProjectProgressById } from '../utils/calculations';

interface AppState {
  currentUser: User;
  users: User[];
  projects: Project[];
  tasks: Task[];
  calendarEvents: CalendarEvent[];
  notifications: Notification[];
  teams: Team[];
  blogPosts: BlogPost[];
  searchQuery: string;
  filters: {
    projectStatus: string;
    taskStatus: string;
    teamDepartment: string;
  };
}

type AppAction =
  | { type: 'UPDATE_TASK_STATUS'; payload: { taskId: string; status: Task['status'] } }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'DELETE_NOTIFICATION'; payload: string }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_PROJECT_FILTER'; payload: string }
  | { type: 'SET_TASK_FILTER'; payload: string }
  | { type: 'SET_TEAM_FILTER'; payload: string }
  | { type: 'ADD_CALENDAR_EVENT'; payload: CalendarEvent }
  | { type: 'UPDATE_CALENDAR_EVENT'; payload: CalendarEvent }
  | { type: 'DELETE_CALENDAR_EVENT'; payload: string }
  | { type: 'UPDATE_USER_PROFILE'; payload: Partial<User> }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'ADD_TEAM'; payload: Team }
  | { type: 'UPDATE_TEAM'; payload: Team }
  | { type: 'DELETE_TEAM'; payload: string }
  | { type: 'ADD_BLOG_POST'; payload: BlogPost }
  | { type: 'UPDATE_BLOG_POST'; payload: BlogPost }
  | { type: 'DELETE_BLOG_POST'; payload: string }
  | { type: 'TOGGLE_BLOG_LIKE'; payload: { postId: string; userId: string } }
  | { type: 'ADD_BLOG_COMMENT'; payload: { postId: string; comment: BlogComment } }
  | { type: 'UPDATE_BLOG_COMMENT'; payload: { postId: string; comment: BlogComment } }
  | { type: 'DELETE_BLOG_COMMENT'; payload: { postId: string; commentId: string } }
  | { type: 'TOGGLE_COMMENT_LIKE'; payload: { postId: string; commentId: string; userId: string } }
  | { type: 'INIT_STATE'; payload: AppState };

const initialState: AppState = {
  // Initial state will be populated from the server
  currentUser: {} as User,
  users: [],
  projects: [],
  tasks: [],
  calendarEvents: [],
  notifications: [],
  teams: [],
  blogPosts: [],
  searchQuery: '',
  filters: {
    projectStatus: 'all',
    taskStatus: 'all',
    teamDepartment: 'all'
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INIT_STATE':
      return { ...action.payload };
    case 'UPDATE_TASK_STATUS':
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.taskId
          ? {
              ...task,
              status: action.payload.status,
              completedDate: action.payload.status === 'completed' ? new Date().toISOString() : undefined
            }
          : task
      );

      // Update the associated project's progress
      const updatedTask = updatedTasks.find(task => task.id === action.payload.taskId);
      let updatedProjects = state.projects;
      
      if (updatedTask) {
        updatedProjects = state.projects.map(project => {
          if (project.id === updatedTask.projectId) {
            const newProgress = calculateProjectProgressById(project.id, updatedTasks);
            
            return {
              ...project,
              progress: newProgress,
              updatedAt: new Date().toISOString()
            };
          }
          return project;
        });
      }

      return {
        ...state,
        tasks: updatedTasks,
        projects: updatedProjects
      };

    case 'ADD_TASK':
      const newTaskState = {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

      // Update the associated project's progress
      const updatedProjectsForAdd = newTaskState.projects.map(project => {
        if (project.id === action.payload.projectId) {
          const newProgress = calculateProjectProgressById(project.id, newTaskState.tasks);
          
          return {
            ...project,
            progress: newProgress,
            updatedAt: new Date().toISOString()
          };
        }
        return project;
      });

      return {
        ...newTaskState,
        projects: updatedProjectsForAdd
      };

    case 'DELETE_TASK':
      const taskToDelete = state.tasks.find(task => task.id === action.payload);
      const deletedTaskState = {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

      // Update the associated project's progress if task was found
      if (taskToDelete) {
        const updatedProjectsForDelete = deletedTaskState.projects.map(project => {
          if (project.id === taskToDelete.projectId) {
            const newProgress = calculateProjectProgressById(project.id, deletedTaskState.tasks);
            
            return {
              ...project,
              progress: newProgress,
              updatedAt: new Date().toISOString()
            };
          }
          return project;
        });

        return {
          ...deletedTaskState,
          projects: updatedProjectsForDelete
        };
      }

      return deletedTaskState;

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.id 
            ? { ...action.payload, updatedAt: new Date().toISOString() }
            : project
        )
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case 'DELETE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        tasks: state.tasks.filter(task => task.projectId !== action.payload)
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, isRead: true }
            : notification
        )
      };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };

    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload)
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SET_PROJECT_FILTER':
      return {
        ...state,
        filters: { ...state.filters, projectStatus: action.payload }
      };

    case 'SET_TASK_FILTER':
      return {
        ...state,
        filters: { ...state.filters, taskStatus: action.payload }
      };

    case 'SET_TEAM_FILTER':
      return {
        ...state,
        filters: { ...state.filters, teamDepartment: action.payload }
      };

    case 'ADD_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: [...state.calendarEvents, action.payload]
      };

    case 'UPDATE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.map(event =>
          event.id === action.payload.id ? action.payload : event
        )
      };

    case 'DELETE_CALENDAR_EVENT':
      return {
        ...state,
        calendarEvents: state.calendarEvents.filter(event => event.id !== action.payload)
      };

    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.payload },
        users: state.users.map(user =>
          user.id === state.currentUser?.id
            ? { ...user, ...action.payload }
            : user
        )
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        currentUser: state.currentUser?.id === action.payload.id ? action.payload : state.currentUser
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        tasks: state.tasks.filter(task => task.assigneeId !== action.payload),
        projects: state.projects.map(project => ({
          ...project,
          teamMembers: project.teamMembers.filter(id => id !== action.payload)
        }))
      };

    case 'ADD_TEAM':
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };

    case 'UPDATE_TEAM':
      return {
        ...state,
        teams: state.teams.map(team =>
          team.id === action.payload.id ? action.payload : team
        )
      };

    case 'DELETE_TEAM':
      return {
        ...state,
        teams: state.teams.filter(team => team.id !== action.payload),
        users: state.users.map(user => 
          user.teamId === action.payload ? { ...user, teamId: undefined } : user
        )
      };

    case 'ADD_BLOG_POST':
      return {
        ...state,
        blogPosts: [...state.blogPosts, action.payload]
      };

    case 'UPDATE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.id ? action.payload : post
        )
      };

    case 'DELETE_BLOG_POST':
      return {
        ...state,
        blogPosts: state.blogPosts.filter(post => post.id !== action.payload)
      };

    case 'TOGGLE_BLOG_LIKE':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                likes: post.likes.includes(action.payload.userId)
                  ? post.likes.filter(id => id !== action.payload.userId)
                  : [...post.likes, action.payload.userId]
              }
            : post
        )
      };

    case 'ADD_BLOG_COMMENT':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        )
      };

    case 'UPDATE_BLOG_COMMENT':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.map(comment =>
                  comment.id === action.payload.comment.id ? action.payload.comment : comment
                )
              }
            : post
        )
      };

    case 'DELETE_BLOG_COMMENT':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.filter(comment => comment.id !== action.payload.commentId)
              }
            : post
        )
      };

    case 'TOGGLE_COMMENT_LIKE':
      return {
        ...state,
        blogPosts: state.blogPosts.map(post =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: post.comments.map(comment =>
                  comment.id === action.payload.commentId
                    ? {
                        ...comment,
                        likes: comment.likes.includes(action.payload.userId)
                          ? comment.likes.filter(id => id !== action.payload.userId)
                          : [...comment.likes, action.payload.userId]
                      }
                    : comment
                )
              }
            : post
        )
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/api/state')
      .then(res => res.json())
      .then(data => {
        dispatch({ type: 'INIT_STATE', payload: data });
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (loaded) {
      fetch('http://localhost:3000/api/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
    }
  }, [state, loaded]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}