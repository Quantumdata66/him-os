'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Bot, Clock, CheckCircle2, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { AutonomousSchedulerAgent, AutonomousAgentPlan } from '@/core/agent/autonomousScheduler';

export const AutonomousSchedulerWidget: React.FC = () => {
  const [agentPlan, setAgentPlan] = useState<AutonomousAgentPlan | null>(null);
  const [recalibrating, setRecalibrating] = useState(false);

  useEffect(() => {
    setAgentPlan(AutonomousSchedulerAgent.generateAgentPlan());
  }, []);

  const handleRecalibrate = () => {
    setRecalibrating(true);
    setTimeout(() => {
      setAgentPlan(AutonomousSchedulerAgent.generateAgentPlan());
      setRecalibrating(false);
    }, 600);
  };

  if (!agentPlan) return null;

  return (
    <Card goldBorder className="space-y-4 bg-gradient-to-r from-[#09090B] via-[#111827] to-[#0F172A]">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C]">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-100">Autonomous Daily Routine Agent</h3>
            <p className="text-[10px] text-gray-400 font-mono">v6.0 AI Schedule Optimizer</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant={agentPlan.agentStatus === 'optimal' ? 'green' : 'gold'} className="text-[10px]">
            {agentPlan.agentStatus === 'optimal' ? 'Schedule Optimal ✓' : 'Auto-Recalibrated'}
          </Badge>
          <Button variant="ghost" size="sm" onClick={handleRecalibrate} disabled={recalibrating}>
            <RefreshCw className={`w-3.5 h-3.5 ${recalibrating ? 'animate-spin text-[#C9A84C]' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="p-3 bg-gray-900/80 rounded-lg border border-gray-800 space-y-1.5">
        <p className="text-xs text-gray-300 font-medium leading-relaxed">{agentPlan.recommendationReason}</p>
        <div className="flex items-center justify-between text-[11px] text-[#C9A84C] font-mono pt-1">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Optimal Window: {agentPlan.optimalFocusHours}</span>
          </div>
        </div>
      </div>

      {/* Timeline Blocks */}
      <div className="space-y-2">
        <span className="text-xs font-serif font-semibold text-gray-300 block">Agent Auto-Generated Timeline</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {agentPlan.timelineBlocks.map((block) => (
            <div
              key={block.id}
              className={`p-2.5 rounded-lg border transition-all space-y-1 ${
                block.isCompleted
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-400'
                  : block.category === 'deep_work'
                  ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-gray-100'
                  : 'bg-gray-900/60 border-gray-800 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-400">{block.timeSlot}</span>
                {block.isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className="text-xs font-semibold leading-tight line-clamp-2">{block.activity}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
