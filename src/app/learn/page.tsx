'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { GraduationCap, BookOpen, Globe, Award, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { LearningService } from '@/domain/learning/service';
import { LearningItem } from '@/domain/learning/types';

export default function LearnEcosystemPage() {
  const [items, setItems] = useState<LearningItem[]>([]);

  useEffect(() => {
    setItems(LearningService.getBooks());
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#2B4D3E]">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">LEARN</h1>
            <Badge variant="green">HPS Learning Ecosystem</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Books, Courses, Goethe B1 German Anki Deck, Research Papers & Knowledge Graph.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => window.location.assign('/skills/radar')}>
          <Sparkles className="w-3.5 h-3.5 mr-1" />
          <span>Competency Radar</span>
        </Button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Books Completed"
          value={`${items.length} Books`}
          badgeText="Active Track"
          badgeVariant="gold"
          icon={BookOpen}
          trend="up"
          trendValue="14 Finished"
          subtext="Reading highlights linked to knowledge graph."
        />
        <MetricCard
          label="German Proficiency"
          value="Goethe B1"
          badgeText="Anki Deck"
          badgeVariant="green"
          icon={Globe}
          trend="up"
          trendValue="Daily 20m"
          subtext="Automated daily vocabulary flashcards."
        />
        <MetricCard
          label="Technical Courses"
          value="6 Completed"
          badgeText="Verified"
          badgeVariant="blue"
          icon={Award}
          trend="up"
          trendValue="Next.js / MLOps"
          subtext="FastAPI, Supabase, and RAG systems."
        />
        <MetricCard
          label="Learning Velocity"
          value="88%"
          badgeText="Growth"
          badgeVariant="purple"
          icon={GraduationCap}
          trend="up"
          trendValue="High"
          subtext="Computed from study logs & exercises."
        />
      </div>

      {/* Books Vault & German Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Books Vault */}
        <Card goldBorder className="lg:col-span-7 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-[#22C55E]" />
              <h2 className="text-lg font-serif font-bold text-gray-100">Reading & Books Vault</h2>
            </div>
            <Badge variant="green" className="text-[10px]">HPS Vault</Badge>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#071A12] border border-[#2B4D3E] flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-100">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.author} • {item.type}</p>
                </div>
                <div className="text-right">
                  <Badge variant="gold" className="text-[9px]">
                    {item.status}
                  </Badge>
                  <p className="text-[10px] text-gray-500 font-mono mt-1">
                    {item.pagesTotal ? Math.round(((item.pagesRead || 0) / item.pagesTotal) * 100) : 100}% Read
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* German Goethe B1 Module */}
        <Card className="lg:col-span-5 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-[#4ADE80]" />
              <h2 className="text-lg font-serif font-bold text-gray-100">Goethe B1 German Anki</h2>
            </div>
            <Badge variant="blue" className="text-[10px]">Active Deck</Badge>
          </div>

          <div className="bg-[#071A12] p-4 rounded-xl border border-[#2B4D3E] space-y-2">
            <p className="text-xs text-gray-400 font-mono">Daily Anki Target: 20 Cards</p>
            <div className="w-full bg-[#163526] h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#22C55E] h-full w-[85%]" />
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold text-right">17 / 20 Cards Reviewed</p>
          </div>

          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/skills/radar')}>
            <span>Open Competency Radar</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
