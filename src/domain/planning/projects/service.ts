import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { Project, Milestone } from './types';

const STORAGE_KEY = 'projects';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p-1',
    name: 'Project HIM OS',
    objective: 'Personal Operating System for Backend & MLOps Engineers',
    status: 'active',
    repoUrl: 'https://github.com/user/him-os',
    deploymentUrl: 'https://him-os.vercel.app',
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind', 'Supabase', 'FastAPI'],
    architectureNotes: 'Domain-driven architecture (domain/, core/, shared/, app/). Zero framework leaks in domain services.',
    lessons: 'Decoupled domain services allow seamless reuse across web and future FastAPI endpoints.',
    startedAt: '2026-07-22',
    milestones: [
      { id: 'm-1', projectId: 'p-1', title: 'v1.0 Architecture & Core Loop', completed: true },
      { id: 'm-2', projectId: 'p-1', title: 'Deep Work & Sprint Reviews', completed: true },
      { id: 'm-3', projectId: 'p-1', title: 'FastAPI Integration (v2.0)', completed: false },
    ],
  },
  {
    id: 'p-2',
    name: 'Quantum Jersey E-Commerce Store',
    objective: 'Sportswear Storefront & Catalog Inventory Management System',
    status: 'completed',
    repoUrl: 'https://github.com/user/quantum-jersey',
    deploymentUrl: 'https://quantum-jersey.vercel.app',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    architectureNotes: 'Modular catalog filtering, responsive design, admin management interface.',
    lessons: 'Clean semantic structure simplifies UI customization.',
    startedAt: '2026-06-01',
    completedAt: '2026-07-15',
    milestones: [
      { id: 'm-4', projectId: 'p-2', title: 'Catalog UI Layout', completed: true },
      { id: 'm-5', projectId: 'p-2', title: 'Admin Management Suite', completed: true },
    ],
  },
  {
    id: 'p-3',
    name: 'Explosive Detection ML Model',
    objective: 'Computer Vision & Security Inspection ML Pipeline',
    status: 'active',
    repoUrl: 'https://github.com/user/explosive-detection',
    techStack: ['Python', 'PyTorch', 'OpenCV', 'Docker'],
    architectureNotes: 'YOLOv8 fine-tuned on custom security dataset with Dockerized inference container.',
    lessons: 'Pre-processing images improves inference precision by 18%.',
    startedAt: '2026-07-01',
    milestones: [
      { id: 'm-6', projectId: 'p-3', title: 'Dataset Preprocessing', completed: true },
      { id: 'm-7', projectId: 'p-3', title: 'Model Fine-tuning', completed: false },
    ],
  },
];

export class ProjectService {
  static getProjects(): Project[] {
    const projects = StorageAdapter.getItem<Project[]>(STORAGE_KEY, []);
    if (projects.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    return projects;
  }

  static toggleMilestone(projectId: string, milestoneId: string): Project {
    const projects = this.getProjects();
    const project = projects.find((p) => p.id === projectId);
    if (!project) throw new Error('Project not found');

    const milestone = project.milestones.find((m) => m.id === milestoneId);
    if (milestone) {
      milestone.completed = !milestone.completed;
      if (milestone.completed) {
        eventBus.emit('milestone.completed', { milestoneId, projectId });
      }
    }

    StorageAdapter.setItem(STORAGE_KEY, projects);
    return project;
  }

  static createProject(project: Omit<Project, 'id' | 'startedAt' | 'milestones'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      startedAt: new Date().toISOString().split('T')[0],
      milestones: [],
    };

    projects.unshift(newProject);
    StorageAdapter.setItem(STORAGE_KEY, projects);
    return newProject;
  }
}
