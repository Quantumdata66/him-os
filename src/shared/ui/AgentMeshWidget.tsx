'use client';

import React from 'react';
import { Cpu } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

export const AgentMeshWidget: React.FC = () => {
  return (
    <Card variant="intel" className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-intel-slate" />
          <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">Agent Mesh Core</h3>
        </div>
        <Badge variant="intel">4 AGENTS ACTIVE</Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Scheduler Agent</span>
          <span className="font-mono text-intel-slate">Running (0.4ms)</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Sync Engine</span>
          <span className="font-mono text-intel-slate">Verified</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary">Analytics Protocol</span>
          <span className="font-mono text-intel-slate">Active</span>
        </div>
      </div>
    </Card>
  );
};
