export type SkillCategory = 'backend' | 'devops' | 'ml' | 'frontend' | 'language';

export interface SkillEvidence {
  id: string;
  skillId: string;
  evidenceType: 'project' | 'certification' | 'course' | 'interview' | 'deployment';
  referenceId?: string;
  description: string;
  date: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  currentLevel: number; // 1 to 5
  targetLevel: number; // 1 to 5
  createdAt: string;
  evidence: SkillEvidence[];
}
