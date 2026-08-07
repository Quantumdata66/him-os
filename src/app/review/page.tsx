'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { RotateCcw, Calendar, Trophy, RefreshCw, Scale, ArrowUpRight } from 'lucide-react';

export default function ReviewRitualsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-text-primary">REVIEW</h1>
            <Badge variant="emerald">HPS Reflection Rituals</Badge>
          </div>
          <p className="text-xs text-text-muted font-mono">
            Reflection transforms experience into wisdom: Daily, Weekly, Monthly Reviews & Sprint Rollover.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => window.location.assign('/execution/weekly/rollover')}>
          <RefreshCw className="w-3.5 h-3.5 mr-1" />
          <span>Sprint Rollover</span>
        </Button>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Sprint Completion"
          value="92%"
          badgeText="Weekly"
          badgeVariant="emerald"
          icon={Calendar}
          trend="up"
          trendValue="High Velocity"
          subtext="Automated sprint rollover engine active."
          track="emerald"
        />
        <MetricCard
          label="Reviews Conducted"
          value="12 Reviews"
          badgeText="Ritual"
          badgeVariant="emerald"
          icon={RotateCcw}
          trend="up"
          trendValue="Consistent"
          subtext="Daily, weekly, and monthly audits."
          track="emerald"
        />
        <MetricCard
          label="Trophy Rank"
          value="Level 4"
          badgeText="1,450 XP"
          badgeVariant="gold"
          icon={Trophy}
          trend="up"
          trendValue="Advanced"
          subtext="Event-driven gamified badges."
          track="gold"
        />
        <MetricCard
          label="Lessons Learned"
          value="8 Audit Records"
          badgeText="Wisdom"
          badgeVariant="intel"
          icon={Scale}
          trend="neutral"
          trendValue="Structured"
          subtext="Failure analysis & system adjustments."
          track="intel"
        />
      </div>

      {/* Review Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Review & Sprint Rollover */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-xl bg-accent-emerald/20 border border-accent-emerald/40 flex items-center justify-center text-accent-mint">
                <RefreshCw className="w-5 h-5" />
              </div>
              <Badge variant="emerald">Weekly Sprint</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-text-primary">Weekly Review & Sprint Rollover</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Evaluate completed sprint outcomes, run automated task rollover, and export markdown digests.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/execution/weekly/rollover')}>
            <span>Open Sprint Rollover</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Achievements & Trophy Room */}
        <Card variant="gold" className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-xl bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
                <Trophy className="w-5 h-5" />
              </div>
              <Badge variant="gold">Achievements</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-text-primary">Trophy Room & Badges</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              View unlocked achievements, streak records, and experience points earned through discipline.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/achievements')}>
            <span>Open Trophy Room</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
