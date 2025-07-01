import { Project, Task, User } from '../types';

export function calculateProjectProgress(project: Project, tasks: Task[]): number {
  const projectTasks = tasks.filter(task => task.projectId === project.id);
  if (projectTasks.length === 0) return 0;
  
  const completedTasks = projectTasks.filter(task => task.status === 'completed');
  return Math.round((completedTasks.length / projectTasks.length) * 100);
}

export function calculateTeamWorkload(users: User[], tasks: Task[]): { [userId: string]: number } {
  const workload: { [userId: string]: number } = {};
  
  users.forEach(user => {
    const userTasks = tasks.filter(task => 
      task.assigneeId === user.id && 
      task.status !== 'completed'
    );
    workload[user.id] = userTasks.length;
  });
  
  return workload;
}

export function calculateBudgetUtilization(project: Project): number {
  if (project.budget === 0) return 0;
  return Math.round((project.spent / project.budget) * 100);
}

export function getProjectStats(projects: Project[]) {
  const total = projects.length;
  const completed = projects.filter(p => p.status === 'completed').length;
  const inProgress = projects.filter(p => p.status === 'in-progress').length;
  const planning = projects.filter(p => p.status === 'planning').length;
  const onHold = projects.filter(p => p.status === 'on-hold').length;
  const review = projects.filter(p => p.status === 'review').length;

  return { total, completed, inProgress, planning, onHold, review };
}

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const todo = tasks.filter(t => t.status === 'todo').length;
  const review = tasks.filter(t => t.status === 'review').length;

  return { total, completed, inProgress, todo, review };
}

export function calculateCompletionRate(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'completed').length;
  return Math.round((completed / tasks.length) * 100);
}