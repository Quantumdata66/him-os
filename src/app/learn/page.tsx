'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { GraduationCap, BookOpen, Globe, Award, Sparkles, ArrowUpRight } from 'lucide-react';
import { LearningService } from '@/domain/learning/service';
import { LearningItem } from '@/domain/learning/types';

export default function LearnEcosystemPage() {
  const [items, setItems] = useState<LearningItem[]>([]);

  useEffect(() => {
    setItems(LearningService.getItems());
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-text-primary">LEARN</h1>
            <Badge variant="emerald">HPS Learning Ecosystem</Badge>
          </div>
          <p className="text-xs text-text-muted font-mono">
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
          badgeVariant="emerald"
          icon={BookOpen}
          trend="up"
          trendValue="14 Finished"
          subtext="Reading highlights linked to knowledge graph."
          track="emerald"
        />
        <MetricCard
          label="German Proficiency"
          value="Goethe B1"
          badgeText="Anki Deck"
          badgeVariant="emerald"
          icon={Globe}
          trend="up"
          trendValue="Daily 20m"
          subtext="Automated daily vocabulary flashcards."
          track="emerald"
        />
        <MetricCard
          label="Technical Courses"
          value="6 Completed"
          badgeText="Verified"
          badgeVariant="intel"
          icon={Award}
          trend="up"
          trendValue="Next.js / MLOps"
          subtext="FastAPI, Supabase, and RAG systems."
          track="intel"
        />
        <MetricCard
          label="Learning Velocity"
          value="88%"
          badgeText="Growth"
          badgeVariant="intel"
          icon={GraduationCap}
          trend="up"
          trendValue="High"
          subtext="Computed from study logs & exercises."
          track="intel"
        />
      </div>

      {/* Books Vault & German Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Books Vault */}
        <Card className="lg:col-span-7 space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-accent-emerald" />
              <h2 className="text-lg font-serif font-bold text-text-primary">Reading & Books Vault</h2>
            </div>
            <Badge variant="emerald" className="text-[10px]">HPS Vault</Badge>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-bg-elevated border border-border-subtle flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{item.title}</h3>
                  <p className="text-xs text-text-muted mt-0.5">{item.author} • {item.type}</p>
                </div>
                <div className="text-right">
                  <Badge variant="emerald" className="text-[9px]">
                    {item.status}
                  </Badge>
                  <p className="text-[10px] text-text-muted font-mono mt-1">
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
              <Globe className="w-5 h-5 text-accent-mint" />
              <h2 className="text-lg font-serif font-bold text-text-primary">Goethe B1 German Anki</h2>
            </div>
            <Badge variant="emerald" className="text-[10px]">Active Deck</Badge>
          </div>

          <div className="bg-bg-elevated p-4 rounded-xl border border-border-subtle space-y-2">
            <p className="text-xs text-text-muted font-mono">Daily Anki Target: 20 Cards</p>
            <div className="w-full bg-bg-subtle h-2.5 rounded-full overflow-hidden">
              <div className="bg-accent-emerald h-full w-[85%]" />
            </div>
            <p className="text-[11px] text-accent-mint font-semibold text-right font-mono">17 / 20 Cards Reviewed</p>
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
