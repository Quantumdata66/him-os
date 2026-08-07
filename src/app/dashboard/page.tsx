'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { ScoreRing } from '@/shared/ui/ScoreRing';
import { MetricCard } from '@/shared/ui/MetricCard';
import { AiCopilotWidget } from '@/shared/ui/AiCopilotWidget';
import { AutonomousSchedulerWidget } from '@/shared/ui/AutonomousSchedulerWidget';
import { AgentMeshWidget } from '@/shared/ui/AgentMeshWidget';
import {
  Target,
  Clock,
  Wallet,
  Flame,
  CloudSun,
  GitCommit,
  Play,
  Pause,
  RotateCcw,
  Check,
  ArrowUpRight,
  Briefcase,
  TrendingUp,
  BookOpen,
} from 'lucide-react';
import { DashboardService } from '@/domain/dashboard/service';
import { DailyPlanService } from '@/domain/execution/daily/service';
import { FastApiClient, GitHubSummary, WeatherSummary } from '@/core/api/fastapiClient';
import { AnalyticsAggregator } from '@/core/analytics/analyticsAggregator';
import { SystemAnalyticsReport } from '@/core/analytics/types';
import { DashboardDTO } from '@/domain/dashboard/types';

export default function HomeWorkspacePage() {
  const [dto, setDto] = useState<DashboardDTO | null>(null);
  const [analytics, setAnalytics] = useState<SystemAnalyticsReport | null>(null);
  const [github, setGithub] = useState<GitHubSummary | null>(null);
  const [weather, setWeather] = useState<WeatherSummary | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    const data = DashboardService.getDashboardDTO();
    setDto(data);

    const report = AnalyticsAggregator.generateReport();
    setAnalytics(report);

    FastApiClient.getGitHubCommits().then(setGithub);
    FastApiClient.getWeather().then(setWeather);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  if (!dto || !analytics) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="flex items-center space-x-3 text-text-muted font-mono text-xs">
          <div className="w-4 h-4 rounded-full border-2 border-intel-slate border-t-transparent animate-spin" />
          <span>Loading Home Command Center...</span>
        </div>
      </div>
    );
  }

  const handleMitToggle = (mitNum: 1 | 2 | 3) => {
    DailyPlanService.toggleMit(dto.dailyPlan.date, mitNum);
    setDto(DashboardService.getDashboardDTO());
    setAnalytics(AnalyticsAggregator.generateReport());
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none font-sans">
      {/* 1. Executive Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-border-subtle gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-text-primary">
              {dto.user.name} — Executive Command Center
            </h1>
            <Badge variant="intel">HIM OS V1.5</Badge>
          </div>
          <p className="text-xs text-text-muted font-mono">{dto.todayDate} • Focused Execution Environment</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="emerald" className="text-xs py-1 px-3">
            <Flame className="w-3.5 h-3.5 mr-1 text-accent-mint" />
            <span>Streak: 7 Days</span>
          </Badge>
          <Button variant="primary" size="sm" onClick={() => window.location.assign('/execution/daily')}>
            <span>Daily Focus Planner</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* 2. Executive KPI Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Execution Rating"
          value={`${analytics.overallLifeOSScore}%`}
          badgeText="7 Engines"
          badgeVariant="intel"
          icon={TrendingUp}
          trend="up"
          trendValue="+4.2%"
          subtext="Life OS score computed from active domains."
          track="intel"
        />
        <MetricCard
          label="Total Net Worth"
          value={dto.stats.netWorthFormatted}
          badgeText="NGN (₦)"
          badgeVariant="default"
          icon={Wallet}
          trend="up"
          trendValue="+12.4%"
          subtext="Live balance snapshot aggregated across assets."
          track="default"
        />
        <MetricCard
          label="Market Readiness"
          value={`${analytics.careerScore.score}%`}
          badgeText="Flagship"
          badgeVariant="intel"
          icon={Briefcase}
          trend="up"
          trendValue="Senior Level"
          subtext="Work -> Projects -> CV pipeline score."
          track="intel"
        />
        <MetricCard
          label="Books Completed"
          value={dto.stats.booksReadCount}
          badgeText="Learning Goal"
          badgeVariant="default"
          icon={BookOpen}
          trend="neutral"
          trendValue="20 Target"
          subtext="Goethe B1 German Anki practice active."
          track="default"
        />
      </div>

      {/* AI Intelligence Row */}
      <AiCopilotWidget />
      <AutonomousSchedulerWidget />
      <AgentMeshWidget />

      {/* 3. Core Outcomes & Execution Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Execution Score Ring */}
        <Card className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Life OS Analytics</span>
              <h2 className="text-lg font-serif font-bold text-text-primary mt-0.5">Execution Score Ring</h2>
            </div>
            <Badge variant="intel" className="text-[10px]">Active</Badge>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <ScoreRing score={analytics.overallLifeOSScore} size={130} strokeWidth={11} label="Overall Rating" track="intel" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-subtle text-center font-mono text-[11px]">
            <div className="bg-bg-subtle p-2 rounded-xl border border-border-subtle">
              <span className="text-text-muted block text-[9px]">Consistency</span>
              <span className="font-bold text-text-primary">{analytics.consistencyScore.score}%</span>
            </div>
            <div className="bg-bg-subtle p-2 rounded-xl border border-border-subtle">
              <span className="text-text-muted block text-[9px]">Engineer</span>
              <span className="font-bold text-intel-slate">{analytics.engineerScore.score}%</span>
            </div>
            <div className="bg-bg-subtle p-2 rounded-xl border border-border-subtle">
              <span className="text-text-muted block text-[9px]">Career</span>
              <span className="font-bold text-intel-slate">{analytics.careerScore.score}%</span>
            </div>
          </div>
        </Card>

        {/* Today's MITs Checklist */}
        <Card className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-accent-emerald" />
                <h2 className="text-lg font-serif font-bold text-text-primary">Today's Most Important Outcomes</h2>
              </div>
              <Badge variant="emerald" className="text-[10px]">MIT Checklist</Badge>
            </div>

            <div className="space-y-2.5">
              {[
                { num: 1 as const, text: dto.dailyPlan.mit1 || 'Configure Production SaaS Dashboard UI', done: dto.dailyPlan.mit1Done },
                { num: 2 as const, text: dto.dailyPlan.mit2 || 'Verify Lucide React Icons Integration', done: dto.dailyPlan.mit2Done },
                { num: 3 as const, text: dto.dailyPlan.mit3 || 'German Anki Vocabulary Practice', done: dto.dailyPlan.mit3Done },
              ].map((mit) => (
                <div
                  key={mit.num}
                  onClick={() => handleMitToggle(mit.num)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    mit.done
                      ? 'bg-bg-subtle border-border-subtle text-text-muted line-through'
                      : 'bg-bg-elevated border-border-subtle text-text-primary hover:border-border-hover'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors ${
                        mit.done ? 'bg-accent-emerald border-accent-mint text-bg-primary font-bold' : 'border-border-subtle'
                      }`}
                    >
                      {mit.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">{mit.text}</span>
                  </div>
                  <Badge variant={mit.done ? 'emerald' : 'default'} className="text-[9px]">
                    {mit.done ? 'Done' : `MIT #${mit.num}`}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-right">
            <Button variant="ghost" size="sm" onClick={() => window.location.assign('/execution/daily')}>
              <span>Edit Daily Focus Plan</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </Card>

        {/* 4. Deep Work Focus Timer */}
        <Card className="lg:col-span-3 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-intel-slate" />
                <h2 className="text-lg font-serif font-bold text-text-primary">Deep Work</h2>
              </div>
              <Badge variant="intel" className="text-[10px]">25m Focus Block</Badge>
            </div>

            <div className="text-center py-5">
              <div className="text-4xl font-mono font-bold text-text-primary tracking-wider mb-1">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] text-text-muted">High-Focus Engineering Session</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              className="flex-1"
              variant={timerRunning ? 'secondary' : 'primary'}
              onClick={() => setTimerRunning(!timerRunning)}
            >
              {timerRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 mr-1" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 mr-1" />
                  <span>Start</span>
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Telemetry Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weather && (
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-intel-sapphire/20 border border-intel-sapphire/30 flex items-center justify-center text-intel-slate">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">{weather.city} • {weather.condition}</p>
                <p className="text-[11px] text-text-muted italic mt-0.5">{weather.recommendation}</p>
              </div>
            </div>
            <span className="text-2xl font-mono font-bold text-intel-slate">{weather.temperature_celsius}°C</span>
          </Card>
        )}

        {github && (
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-bg-subtle border border-border-subtle flex items-center justify-center text-text-secondary">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">GitHub Automation ({github.username})</p>
                <p className="text-[11px] text-text-muted">
                  Active Repos: {github.recent_repos.join(', ')}
                </p>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xl font-bold text-text-primary">{github.total_commits_today} Commits</span>
              <p className="text-[9px] text-text-muted font-sans">Synced via FastAPI</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
