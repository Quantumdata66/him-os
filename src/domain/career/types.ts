export type ApplicationStatus =
  | 'researching'
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'rejected'
  | 'accepted'
  | 'withdrawn';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  status: ApplicationStatus;
  appliedDate: string; // YYYY-MM-DD
  salaryOffered?: number;
  currency: string; // NGN, GBP, USD
  url?: string;
  notes: string;
  createdAt: string;
}

export interface InterviewRound {
  id: string;
  applicationId: string;
  company: string;
  round: 'phone_screen' | 'technical' | 'system_design' | 'behavioral' | 'final';
  scheduledAt: string;
  notes: string;
  outcome?: 'passed' | 'failed' | 'pending';
  lessons?: string;
}

export interface NetworkingContact {
  id: string;
  name: string;
  company: string;
  role: string;
  platform: 'linkedin' | 'twitter' | 'meetup' | 'email';
  lastContact: string;
  notes: string;
}

export interface SalaryRecord {
  id: string;
  company: string;
  role: string;
  salary: number;
  currency: string;
  startDate: string;
  endDate?: string;
}
