'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { Brain, BookOpen, Network, Scale, FileText, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react';

export default function ThinkWorkspacePage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Think Workspace</h1>
            <Badge variant="gold">External Brain & Knowledge System</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Obsidian markdown workspace studio, interactive knowledge graph nodes, decision logs, and learning vault.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/workspace/graph')}>
            <Network className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Knowledge Graph</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => window.location.assign('/workspace')}>
            <BookOpen className="w-3.5 h-3.5 mr-1" />
            <span>Workspace Studio</span>
          </Button>
        </div>
      </div>

      {/* Think KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Knowledge Nodes"
          value="6 Linked Nodes"
          badgeText="Obsidian Graph"
          badgeVariant="gold"
          icon={Network}
          trend="up"
          trendValue="Connected"
          subtext="Bidirectional architecture backlinks."
        />
        <MetricCard
          label="Notes & Research"
          value="12 Documents"
          badgeText="Vault"
          badgeVariant="blue"
          icon={FileText}
          trend="neutral"
          trendValue="Indexed"
          subtext="Local key-value markdown storage."
        />
        <MetricCard
          label="Decisions Logged"
          value="5 Audit Records"
          badgeText="Decisions"
          badgeVariant="purple"
          icon={Scale}
          trend="up"
          trendValue="Structured"
          subtext="Architecture decision records (ADRs)."
        />
        <MetricCard
          label="German Anki Target"
          value="Goethe B1"
          badgeText="Learning"
          badgeVariant="green"
          icon={GraduationCap}
          trend="up"
          trendValue="Active"
          subtext="Daily 20m vocabulary flashcard deck."
        />
      </div>

      {/* Think Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Workspace Studio */}
        <Card goldBorder className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                <BookOpen className="w-5 h-5" />
              </div>
              <Badge variant="gold">Notion/Obsidian Studio</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Workspace Studio</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Markdown editor, document search palette, and external brain note management.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/workspace')}>
            <span>Open Workspace Studio</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Knowledge Graph Visualizer */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Network className="w-5 h-5" />
              </div>
              <Badge variant="blue">v3.0 Graph</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Knowledge Graph Visualizer</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Interactive node canvas connecting architectural decisions, projects, career goals, and skills.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/workspace/graph')}>
            <span>Open Knowledge Graph</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Decision Vault */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Scale className="w-5 h-5" />
              </div>
              <Badge variant="purple">Decision Log</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Decision Vault</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Log architectural and life decisions with rationale, trade-offs, and outcome reviews.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/decisions')}>
            <span>Open Decision Vault</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Notes & Learning Vault */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <GraduationCap className="w-5 h-5" />
              </div>
              <Badge variant="green">Learning Vault</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Learning & Reading Vault</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track books read, technical learning targets, and Goethe B1 German Anki practice.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/learning')}>
            <span>Open Learning Vault</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
