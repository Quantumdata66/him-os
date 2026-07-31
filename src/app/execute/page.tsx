'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { Zap, Target, Calendar, Flame, Scale, ArrowUpRight, Trophy, RefreshCw } from 'lucide-react';

export default function ExecuteWorkspacePage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Execute Workspace</h1>
            <Badge variant="gold">Operational Execution & Habits</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Daily focus planning, weekly sprint rollover, habit streak tracking, and goal alignment.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => window.location.assign('/execution/daily')}>
          <Target className="w-3.5 h-3.5 mr-1" />
          <span>Daily Focus Planner</span>
        </Button>
      </div>

      {/* Execution KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Active Habit Streak"
          value="7 Days"
          badgeText="Streak"
          badgeVariant="green"
          icon={Flame}
          trend="up"
          trendValue="Consistency"
          subtext="5 core daily habits tracked."
        />
        <MetricCard
          label="Sprint Completion"
          value="92%"
          badgeText="Weekly Sprint"
          badgeVariant="gold"
          icon={Calendar}
          trend="up"
          trendValue="High Velocity"
          subtext="Automated weekly rollover active."
        />
        <MetricCard
          label="Goals On Track"
          value="8 / 10"
          badgeText="Goals"
          badgeVariant="blue"
          icon={Scale}
          trend="up"
          trendValue="80% Rate"
          subtext="Source domain computed progress."
        />
        <MetricCard
          label="Achievement XP"
          value="1,450 XP"
          badgeText="Trophy Room"
          badgeVariant="purple"
          icon={Trophy}
          trend="up"
          trendValue="Level 4"
          subtext="Event-driven gamified badges."
        />
      </div>

      {/* Execute Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Focus Planner */}
        <Card goldBorder className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                <Target className="w-5 h-5" />
              </div>
              <Badge variant="gold">Daily Focus</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Daily Focus Planner</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Define today's top 3 Most Important Tasks (MITs), timeblock focus hours, and log daily wins.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/execution/daily')}>
            <span>Open Daily Planner</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Weekly Sprint & Rollover */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <Badge variant="blue">v7.0 Rollover</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Weekly Sprint & Rollover</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Plan weekly sprint outcomes, run automated weekly rollover, and export markdown digests.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/execution/weekly/rollover')}>
            <span>Open Sprint Rollover</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Habit Execution */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <Badge variant="green">Habit Engine</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Habit Execution Streaks</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Log daily habits, monitor 30-day streak heatmaps, and maintain high execution consistency.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/execution/habits')}>
            <span>Open Habit Streaks</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Goals Alignment */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Scale className="w-5 h-5" />
              </div>
              <Badge variant="purple">Objectives</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Goals Alignment</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Align quarterly objectives with daily execution. Progress is computed dynamically from source domains.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/planning/goals')}>
            <span>Open Goals Alignment</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
