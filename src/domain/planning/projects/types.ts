export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  objective: string;
  status: 'planning' | 'active' | 'paused' | 'completed' | 'archived';
  repoUrl?: string;
  deploymentUrl?: string;
  techStack: string[];
  architectureNotes: string;
  lessons: string;
  startedAt: string;
  completedAt?: string;
  milestones: Milestone[];
}
