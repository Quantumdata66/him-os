'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Sparkles, Network, RefreshCw, Cpu, Activity, MessageSquare } from 'lucide-react';
import { MeshProtocolService, SwarmProtocolReport } from '@/core/agent/meshProtocolEngine';

export default function SwarmMeshPage() {
  const [report, setReport] = useState<SwarmProtocolReport | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    runSync();
  }, []);

  const runSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setReport(MeshProtocolService.getSwarmReport());
      setSyncing(false);
    }, 600);
  };

  if (!report) return null;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Autonomous AI Agent Mesh</h1>
            <Badge variant="gold">v10.0 Swarm Protocol</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Real-time multi-agent swarm orchestration, memory health monitoring, and inter-agent message logs.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/dashboard')}>
            <span>Dashboard</span>
          </Button>
          <Button variant="primary" size="sm" onClick={runSync} disabled={syncing}>
            <RefreshCw className={`w-3.5 h-3.5 mr-1 ${syncing ? 'animate-spin' : ''}`} />
            <span>Sync Agent Swarm</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Swarm Mesh Health</span>
          <p className="text-2xl font-mono font-bold text-emerald-400">{report.meshHealthScorePct}%</p>
          <Badge variant="green" className="text-[9px]">Operational</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Active Agent Swarm</span>
          <p className="text-2xl font-mono font-bold text-[#C9A84C]">{report.activeAgentsCount} Agents</p>
          <Badge variant="gold" className="text-[9px]">Orchestrated</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Messages Processed</span>
          <p className="text-2xl font-mono font-bold text-blue-400">{report.totalMessagesProcessed}</p>
          <Badge variant="blue" className="text-[9px]">Inter-Agent Bus</Badge>
        </Card>

        <Card goldBorder className="space-y-2 p-4 text-center">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Latency / Memory</span>
          <p className="text-2xl font-mono font-bold text-purple-400">12ms / 38MB</p>
          <Badge variant="purple" className="text-[9px]">Sub-15ms Target</Badge>
        </Card>
      </div>

      {/* Active Agents Grid */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#C9A84C]" />
            <h3 className="text-lg font-serif font-semibold text-gray-100">Swarm Agent Roster</h3>
          </div>
          <Badge variant="gold">{report.agents.length} Active Autonomous Agents</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {report.agents.map((agent) => (
            <div key={agent.id} className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-100">{agent.name}</span>
                <Badge variant={agent.status === 'active' ? 'green' : 'gold'} className="text-[9px] uppercase">
                  {agent.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-400">{agent.role}</p>
              <div className="pt-2 border-t border-gray-800 flex justify-between items-center text-[10px] font-mono text-gray-500">
                <span>Task: {agent.lastAction}</span>
                <span className="text-emerald-400">Latency: {agent.latencyMs}ms</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Inter-Agent Message Log Feed */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-serif font-semibold text-gray-100">Inter-Agent Message Bus Feed</h3>
          </div>
          <Badge variant="blue">Real-Time Bus</Badge>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {report.recentMessages.map((msg) => (
            <div key={msg.id} className="p-3 bg-gray-900/60 rounded-lg border border-gray-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[#C9A84C] font-bold">
                  {msg.sender} → {msg.recipient}
                </span>
                <span className="text-gray-500 text-[10px]">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-gray-300 font-sans">{msg.message}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
