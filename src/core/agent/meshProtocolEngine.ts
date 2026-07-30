import { AgentMeshService, AgentInstance } from './agentMesh';

export interface SwarmMessage {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  timestamp: string;
  status: 'DELIVERED' | 'PROCESSING';
}

export interface SwarmProtocolReport {
  activeAgentsCount: number;
  totalMessagesProcessed: number;
  meshHealthScorePct: number;
  agents: AgentInstance[];
  recentMessages: SwarmMessage[];
}

export class MeshProtocolService {
  static getSwarmReport(): SwarmProtocolReport {
    const agents = AgentMeshService.getAgents();

    const recentMessages: SwarmMessage[] = [
      {
        id: 'msg-1',
        sender: 'Executive Routine Scheduler',
        recipient: 'Financial Runway Agent',
        message: 'Requesting updated net worth snapshot for daily execution review.',
        timestamp: new Date().toISOString(),
        status: 'DELIVERED',
      },
      {
        id: 'msg-[#msg-2]',
        sender: 'Career Copilot Agent',
        recipient: 'Skill Matrix Radar',
        message: 'New project completed: Updated Market Readiness Score to 88%.',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        status: 'DELIVERED',
      },
      {
        id: 'msg-3',
        sender: 'MLOps Telemetry Engine',
        recipient: 'Executive Routine Scheduler',
        message: 'FastAPI microservice response latency is optimal (14ms).',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'DELIVERED',
      },
    ];

    return {
      activeAgentsCount: agents.length,
      totalMessagesProcessed: 142,
      meshHealthScorePct: 99,
      agents,
      recentMessages,
    };
  }
}
