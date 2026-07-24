export interface Decision {
  id: string;
  title: string;
  context: string;
  decision: string;
  reasoning: string;
  assumptions: string[];
  expectedOutcome: string;
  actualOutcome?: string;
  lessons?: string;
  decidedAt: string;
  reviewedAt?: string;
}
