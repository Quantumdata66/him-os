import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { Skill, SkillEvidence } from './types';

const STORAGE_KEY = 'skills';

const INITIAL_SKILLS: Skill[] = [
  {
    id: 'sk-1',
    name: 'FastAPI / Python Async',
    category: 'backend',
    currentLevel: 4,
    targetLevel: 5,
    createdAt: new Date().toISOString(),
    evidence: [
      {
        id: 'ev-1',
        skillId: 'sk-1',
        evidenceType: 'project',
        description: 'Built production async endpoints in Project HIM OS.',
        date: '2026-07-22',
      },
    ],
  },
  {
    id: 'sk-2',
    name: 'Docker & Containerization',
    category: 'devops',
    currentLevel: 4,
    targetLevel: 5,
    createdAt: new Date().toISOString(),
    evidence: [
      {
        id: 'ev-2',
        skillId: 'sk-2',
        evidenceType: 'project',
        description: 'Dockerized Explosive Detection ML inference pipeline.',
        date: '2026-07-10',
      },
    ],
  },
  {
    id: 'sk-3',
    name: 'SQL & PostgreSQL Database Design',
    category: 'backend',
    currentLevel: 3,
    targetLevel: 5,
    createdAt: new Date().toISOString(),
    evidence: [
      {
        id: 'ev-3',
        skillId: 'sk-3',
        evidenceType: 'course',
        description: 'Completed PostgreSQL Advanced Indexing & Query Tuning.',
        date: '2026-06-28',
      },
    ],
  },
  {
    id: 'sk-4',
    name: 'Next.js 14 & React TypeScript',
    category: 'frontend',
    currentLevel: 4,
    targetLevel: 5,
    createdAt: new Date().toISOString(),
    evidence: [
      {
        id: 'ev-4',
        skillId: 'sk-4',
        evidenceType: 'deployment',
        description: 'Deployed Project HIM OS App Router on Vercel.',
        date: '2026-07-22',
      },
    ],
  },
  {
    id: 'sk-5',
    name: 'Goethe B1 German Language',
    category: 'language',
    currentLevel: 3,
    targetLevel: 5,
    createdAt: new Date().toISOString(),
    evidence: [
      {
        id: 'ev-5',
        skillId: 'sk-5',
        evidenceType: 'course',
        description: 'Completed B1 Grammar and Anki 2000 Vocabulary Deck.',
        date: '2026-07-15',
      },
    ],
  },
];

export class SkillService {
  static getSkills(): Skill[] {
    const skills = StorageAdapter.getItem<Skill[]>(STORAGE_KEY, []);
    if (skills.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_SKILLS);
      return INITIAL_SKILLS;
    }
    return skills;
  }

  static addEvidence(skillId: string, evidence: Omit<SkillEvidence, 'id' | 'skillId'>): Skill {
    const skills = this.getSkills();
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) throw new Error('Skill not found');

    const newEvidence: SkillEvidence = {
      ...evidence,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      skillId,
    };

    skill.evidence.unshift(newEvidence);
    StorageAdapter.setItem(STORAGE_KEY, skills);
    return skill;
  }

  static updateProficiency(skillId: string, newLevel: number): Skill {
    const skills = this.getSkills();
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) throw new Error('Skill not found');

    skill.currentLevel = Math.min(5, Math.max(1, newLevel));
    StorageAdapter.setItem(STORAGE_KEY, skills);
    return skill;
  }

  static createSkill(skill: Omit<Skill, 'id' | 'createdAt' | 'evidence'>): Skill {
    const skills = this.getSkills();
    const newSkill: Skill = {
      ...skill,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
      evidence: [],
    };

    skills.push(newSkill);
    StorageAdapter.setItem(STORAGE_KEY, skills);
    return newSkill;
  }
}
