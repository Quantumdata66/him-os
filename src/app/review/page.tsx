'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { RotateCcw, Calendar, Trophy, RefreshCw, Scale, ArrowUpRight } from 'lucide-react';

export default function ReviewRitualsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#2B4D3E]">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">REVIEW</h1>
            <Badge variant="green">HPS Reflection Rituals</Badge>
          </div>
          <p className="text-xs text-gray-400">
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
          badgeVariant="gold"
          icon={Calendar}
          trend="up"
          trendValue="High Velocity"
          subtext="Automated sprint rollover engine active."
        />
        <MetricCard
          label="Reviews Conducted"
          value="12 Reviews"
          badgeText="Ritual"
          badgeVariant="green"
          icon={RotateCcw}
          trend="up"
          trendValue="Consistent"
          subtext="Daily, weekly, and monthly audits."
        />
        <MetricCard
          label="Trophy Rank"
          value="Level 4"
          badgeText="1,450 XP"
          badgeVariant="purple"
          icon={Trophy}
          trend="up"
          trendValue="Advanced"
          subtext="Event-driven gamified badges."
        />
        <MetricCard
          label="Lessons Learned"
          value="8 Audit Records"
          badgeText="Wisdom"
          badgeVariant="blue"
          icon={Scale}
          trend="neutral"
          trendValue="Structured"
          subtext="Failure analysis & system adjustments."
        />
      </div>

      {/* Review Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Review & Sprint Rollover */}
        <Card goldBorder className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/40 flex items-center justify-center text-[#4ADE80]">
                <RefreshCw className="w-5 h-5" />
              </div>
              <Badge variant="gold">Weekly Sprint</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Weekly Review & Sprint Rollover</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Evaluate completed sprint outcomes, run automated task rollover, and export markdown digests.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/execution/weekly/rollover')}>
            <span>Open Sprint Rollover</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Achievements & Trophy Room */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Trophy className="w-5 h-5" />
              </div>
              <Badge variant="purple">Achievements</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Trophy Room & Badges</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
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
