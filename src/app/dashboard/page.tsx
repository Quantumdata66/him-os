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
  FolderGit2,
  BookOpen,
  Wallet,
  Flame,
  CloudSun,
  GitCommit,
  Play,
  Pause,
  RotateCcw,
  Check,
  ExternalLink,
  ArrowUpRight,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { DashboardService } from '@/domain/dashboard/service';
import { DailyPlanService } from '@/domain/execution/daily/service';
import { HabitService } from '@/domain/execution/habits/service';
import { FastApiClient, GitHubSummary, WeatherSummary } from '@/core/api/fastapiClient';
import { AnalyticsAggregator } from '@/core/analytics/analyticsAggregator';
import { SystemAnalyticsReport } from '@/core/analytics/types';
import { DashboardDTO } from '@/domain/dashboard/types';

export default function DashboardPage() {
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
        <div className="flex items-center space-x-3 text-gray-400 font-mono text-xs">
          <div className="w-4 h-4 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
          <span>Loading Executive Operating System...</span>
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12 select-none">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-800/80 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-100">
              Welcome Back, {dto.user.name}
            </h1>
            <Badge variant="gold">v9.0 Executive OS</Badge>
          </div>
          <p className="text-xs text-gray-400 font-mono">{dto.todayDate} • Single-DTO Command Center</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="green" className="text-xs py-1 px-3">
            <Flame className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span>Streak: 7 Days</span>
          </Badge>
          <Button variant="primary" size="sm" onClick={() => window.location.assign('/execution/daily')}>
            <span>Daily Planner</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Metric Cards KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Execution Rating"
          value={`${analytics.overallLifeOSScore}%`}
          badgeText="7 Score Engines"
          badgeVariant="gold"
          icon={TrendingUp}
          trend="up"
          trendValue="+4.2%"
          subtext="Computed across all source domain services."
        />
        <MetricCard
          label="Total Net Worth"
          value={dto.stats.netWorthFormatted}
          badgeText="NGN (₦)"
          badgeVariant="green"
          icon={Wallet}
          trend="up"
          trendValue="+12.4%"
          subtext="Live balance snapshot aggregated across assets."
        />
        <MetricCard
          label="Market Readiness"
          value={`${analytics.careerScore.score}%`}
          badgeText="Flagship"
          badgeVariant="blue"
          icon={Briefcase}
          trend="up"
          trendValue="Senior Level"
          subtext="Daily work -> Projects -> CV pipeline score."
        />
        <MetricCard
          label="Books Completed"
          value={dto.stats.booksReadCount}
          badgeText="Learning Target"
          badgeVariant="purple"
          icon={BookOpen}
          trend="neutral"
          trendValue="20 Goal"
          subtext="Goethe B1 German Anki practice active."
        />
      </div>

      {/* Autonomous AI Agents Row */}
      <AiCopilotWidget />
      <AutonomousSchedulerWidget />
      <AgentMeshWidget />

      {/* Grid Section: Hero Execution Score & Today's MITs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Execution Score (7-Engine Aggregator) */}
        <Card goldBorder className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Life OS Analytics</span>
              <h2 className="text-lg font-serif font-bold text-gray-100 mt-0.5">Execution Breakdown</h2>
            </div>
            <Badge variant="gold" className="text-[10px]">Active</Badge>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <ScoreRing score={analytics.overallLifeOSScore} size={130} strokeWidth={11} label="Life OS Rating" />
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-800/80 text-center font-mono text-[11px]">
            <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
              <span className="text-gray-500 block text-[9px]">Consistency</span>
              <span className="font-bold text-emerald-400">{analytics.consistencyScore.score}%</span>
            </div>
            <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
              <span className="text-gray-500 block text-[9px]">Engineer</span>
              <span className="font-bold text-[#C9A84C]">{analytics.engineerScore.score}%</span>
            </div>
            <div className="bg-gray-900/60 p-2 rounded border border-gray-800">
              <span className="text-gray-500 block text-[9px]">Career</span>
              <span className="font-bold text-purple-400">{analytics.careerScore.score}%</span>
            </div>
          </div>
        </Card>

        {/* Today's MITs Checklist */}
        <Card goldBorder className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#C9A84C]" />
                <h2 className="text-lg font-serif font-bold text-gray-100">Today's MITs</h2>
              </div>
              <Badge variant="gold" className="text-[10px]">Most Important Tasks</Badge>
            </div>

            <div className="space-y-2.5">
              {[
                { num: 1 as const, text: dto.dailyPlan.mit1 || 'Configure Production SaaS Dashboard', done: dto.dailyPlan.mit1Done },
                { num: 2 as const, text: dto.dailyPlan.mit2 || 'Verify Lucide React Icons Integration', done: dto.dailyPlan.mit2Done },
                { num: 3 as const, text: dto.dailyPlan.mit3 || 'German Anki Vocabulary Practice', done: dto.dailyPlan.mit3Done },
              ].map((mit) => (
                <div
                  key={mit.num}
                  onClick={() => handleMitToggle(mit.num)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    mit.done
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-400 line-through'
                      : 'bg-gray-900/60 border-gray-800 text-gray-200 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors ${
                        mit.done ? 'bg-emerald-500 border-emerald-400 text-gray-950 font-bold' : 'border-gray-600'
                      }`}
                    >
                      {mit.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">{mit.text}</span>
                  </div>
                  <Badge variant={mit.done ? 'green' : 'gray'} className="text-[9px]">
                    {mit.done ? 'Done' : `MIT #${mit.num}`}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-right">
            <Button variant="ghost" size="sm" onClick={() => window.location.assign('/execution/daily')}>
              <span>Edit Daily Plan</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </Card>

        {/* Deep Work Timer */}
        <Card className="lg:col-span-3 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#C9A84C]" />
                <h2 className="text-lg font-serif font-bold text-gray-100">Deep Work</h2>
              </div>
              <Badge variant="blue" className="text-[10px]">25m Focus Block</Badge>
            </div>

            <div className="text-center py-5">
              <div className="text-4xl font-mono font-bold text-[#C9A84C] tracking-wider mb-1">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-[11px] text-gray-400">High-Focus Engineering Session</p>
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

      {/* Microservices Telemetry Widgets (GitHub Commits & Weather) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weather && (
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <CloudSun className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-200">{weather.city} • {weather.condition}</p>
                <p className="text-[11px] text-gray-400 italic mt-0.5">{weather.recommendation}</p>
              </div>
            </div>
            <span className="text-2xl font-mono font-bold text-[#C9A84C]">{weather.temperature_celsius}°C</span>
          </Card>
        )}

        {github && (
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <GitCommit className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-200">GitHub Automation ({github.username})</p>
                <p className="text-[11px] text-gray-400">
                  Active Repos: {github.recent_repos.join(', ')}
                </p>
              </div>
            </div>
            <div className="text-right font-mono">
              <span className="text-xl font-bold text-emerald-400">{github.total_commits_today} Commits</span>
              <p className="text-[9px] text-gray-500 font-sans">Synced via FastAPI</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
