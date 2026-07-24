import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { eventBus } from '@/core/events/eventBus';
import { Decision } from './types';

const STORAGE_KEY = 'decisions';

const INITIAL_DECISIONS: Decision[] = [
  {
    id: 'dec-1',
    title: 'Switch to Domain-Driven Architecture for Project HIM OS',
    context: 'Evaluating codebase structure as the application grows across 15+ modules.',
    decision: 'Decoupled domain services into src/domain/ with ZERO framework imports.',
    reasoning: 'Allows seamless code sharing between Next.js frontend, future FastAPI microservices, and CLI scripts.',
    assumptions: [
      'Clean domain layer prevents framework coupling.',
      'Refactoring cost in V2 will be reduced by 80%.',
    ],
    expectedOutcome: 'Domain logic runs identically in browser local storage and Supabase PostgreSQL.',
    actualOutcome: 'Clean compilation verified across 100% of App Router pages.',
    lessons: 'Domain boundaries eliminate hidden dependencies early.',
    decidedAt: '2026-07-22',
    reviewedAt: '2026-07-22',
  },
];

export class DecisionService {
  static getDecisions(): Decision[] {
    const decisions = StorageAdapter.getItem<Decision[]>(STORAGE_KEY, []);
    if (decisions.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_DECISIONS);
      return INITIAL_DECISIONS;
    }
    return decisions;
  }

  static getUnreviewedCount(): number {
    return this.getDecisions().filter((d) => !d.reviewedAt).length;
  }

  static recordDecision(decision: Omit<Decision, 'id' | 'decidedAt'>): Decision {
    const decisions = this.getDecisions();
    const newDecision: Decision = {
      ...decision,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      decidedAt: new Date().toISOString().split('T')[0],
    };

    decisions.unshift(newDecision);
    StorageAdapter.setItem(STORAGE_KEY, decisions);

    eventBus.emit('decision.recorded', { decisionId: newDecision.id });

    return newDecision;
  }

  static reviewDecision(id: string, actualOutcome: string, lessons: string): Decision {
    const decisions = this.getDecisions();
    const decision = decisions.find((d) => d.id === id);
    if (!decision) throw new Error('Decision not found');

    decision.actualOutcome = actualOutcome;
    decision.lessons = lessons;
    decision.reviewedAt = new Date().toISOString().split('T')[0];

    StorageAdapter.setItem(STORAGE_KEY, decisions);

    eventBus.emit('decision.reviewed', { decisionId: decision.id });

    return decision;
  }
}
