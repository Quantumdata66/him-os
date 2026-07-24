import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { JobApplication, InterviewRound, NetworkingContact, SalaryRecord } from './types';

const APPS_KEY = 'job_applications';
const INTERVIEWS_KEY = 'interviews';
const CONTACTS_KEY = 'networking_contacts';
const SALARY_KEY = 'salary_history';

const INITIAL_APPS: JobApplication[] = [
  {
    id: 'app-1',
    company: 'Global Cloud Systems',
    role: 'Backend Engineer (FastAPI/Python)',
    status: 'screening',
    appliedDate: '2026-07-10',
    salaryOffered: 12000000, // NGN annual
    currency: 'NGN',
    notes: 'Initial phone screen passed. Preparing for technical architecture round.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'app-2',
    company: 'Quantum Tech Labs',
    role: 'MLOps & Infrastructure Engineer',
    status: 'interview',
    appliedDate: '2026-07-15',
    salaryOffered: 15000000,
    currency: 'NGN',
    notes: 'Submitted Dockerized ML pipeline solution.',
    createdAt: new Date().toISOString(),
  },
];

const INITIAL_INTERVIEWS: InterviewRound[] = [
  {
    id: 'int-1',
    applicationId: 'app-1',
    company: 'Global Cloud Systems',
    round: 'technical',
    scheduledAt: '2026-07-25T14:00:00Z',
    notes: 'Focus on async Python performance and SQL indexing.',
    outcome: 'pending',
  },
];

export class CareerService {
  static getApplications(): JobApplication[] {
    const apps = StorageAdapter.getItem<JobApplication[]>(APPS_KEY, []);
    if (apps.length === 0) {
      StorageAdapter.setItem(APPS_KEY, INITIAL_APPS);
      return INITIAL_APPS;
    }
    return apps;
  }

  static getInterviews(): InterviewRound[] {
    const interviews = StorageAdapter.getItem<InterviewRound[]>(INTERVIEWS_KEY, []);
    if (interviews.length === 0) {
      StorageAdapter.setItem(INTERVIEWS_KEY, INITIAL_INTERVIEWS);
      return INITIAL_INTERVIEWS;
    }
    return interviews;
  }

  static addApplication(app: Omit<JobApplication, 'id' | 'createdAt'>): JobApplication {
    const apps = this.getApplications();
    const newApp: JobApplication = {
      ...app,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
    };

    apps.unshift(newApp);
    StorageAdapter.setItem(APPS_KEY, apps);

    eventBus.emit('application.submitted', { applicationId: newApp.id });

    return newApp;
  }

  static updateApplicationStatus(id: string, status: JobApplication['status']): JobApplication {
    const apps = this.getApplications();
    const app = apps.find((a) => a.id === id);
    if (!app) throw new Error('Application not found');

    app.status = status;
    StorageAdapter.setItem(APPS_KEY, apps);
    return app;
  }
}
