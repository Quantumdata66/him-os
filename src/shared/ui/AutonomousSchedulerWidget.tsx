'use client';

import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';

export const AutonomousSchedulerWidget: React.FC = () => {
  return (
    <Card className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-accent-mint" />
          <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider font-mono">Autonomous Scheduler</h3>
        </div>
        <Badge variant="mint">AUTONOMOUS</Badge>
      </div>

      <div className="p-2.5 rounded-xl bg-bg-subtle border border-border-subtle flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <Calendar className="w-3.5 h-3.5 text-text-muted" />
          <span className="text-text-primary font-medium">Daily Review Rollover</span>
        </div>
        <span className="font-mono text-accent-mint font-semibold">20:00 EST</span>
      </div>
    </Card>
  );
};
