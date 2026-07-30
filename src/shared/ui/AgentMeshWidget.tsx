'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Network, Briefcase, Wallet, Target, Sparkles, RefreshCw, ArrowUpRight } from 'lucide-react';
import { AgentMeshService, AgentMeshReport } from '@/core/agent/agentMesh';

export const AgentMeshWidget: React.FC = () => {
  const [report, setReport] = useState<AgentMeshReport | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    setReport(AgentMeshService.generateMeshReport());
  }, []);

  const handleSyncMesh = () => {
    setSyncing(true);
    setTimeout(() => {
      setReport(AgentMeshService.generateMeshReport());
      setSyncing(false);
    }, 600);
  };

  if (!report) return null;

  return (
    <Card goldBorder className="space-y-4 bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#09090B]">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-100">AI Multi-Agent Orchestration Mesh</h3>
            <p className="text-[10px] text-gray-400 font-mono">v7.0 Autonomous Sub-Agent Network</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/dashboard/mesh')}>
            <span>Swarm Telemetry</span>
            <ArrowUpRight className="w-3 h-3 ml-1 text-purple-400" />
          </Button>
          <Badge variant="purple" className="text-[10px]">
            {report.activeAgentsCount} Agents Mesh Synced ✓
          </Badge>
          <Button variant="ghost" size="sm" onClick={handleSyncMesh} disabled={syncing}>
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-purple-400' : ''}`} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {report.insights.map((insight, idx) => {
          const Icon =
            insight.agentName === 'Career Agent'
              ? Briefcase
              : insight.agentName === 'Financial Agent'
              ? Wallet
              : Target;

          return (
            <div key={idx} className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-[#C9A84C]" />
                  <span className="text-xs font-bold text-gray-200">{insight.agentName}</span>
                </div>
                <Badge variant={insight.status === 'active' ? 'green' : 'gold'} className="text-[9px]">
                  {insight.status.toUpperCase()}
                </Badge>
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed">{insight.primaryRecommendation}</p>

              <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-500">{insight.metricLabel}:</span>
                <span className="text-[#C9A84C] font-bold">{insight.metricValue}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
