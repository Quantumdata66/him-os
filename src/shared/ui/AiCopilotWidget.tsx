'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

export const AiCopilotWidget: React.FC = () => {
  return (
    <Card variant="intel" glow className="space-y-3 font-sans">
      <div className="flex items-center space-x-2">
        <div className="p-1.5 rounded-lg bg-intel-sapphire/20 text-intel-slate">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-xs font-bold text-text-primary uppercase tracking-wider font-mono">Executive AI Recommendation</h3>
      </div>

      <p className="text-xs text-text-secondary leading-relaxed">
        High cognitive capacity detected. Recommendation: Allocate 90 minutes to <span className="text-accent-mint font-semibold">Anki B1 German Vocabulary</span> before evening rollover ritual.
      </p>

      <div className="pt-1">
        <Button variant="intel" size="sm" className="w-full justify-between">
          <span>Execute Focus Block</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
};
