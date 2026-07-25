'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { ScoreRing } from '@/shared/ui/ScoreRing';
import { AiCopilotWidget } from '@/shared/ui/AiCopilotWidget';
import { AutonomousSchedulerWidget } from '@/shared/ui/AutonomousSchedulerWidget';
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
  TrendingUp,
  Award,
  ArrowUpRight,
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
          <span>Loading HIM OS Dashboard...</span>
        </div>
      </div>
    );
  }

  const handleMitToggle = (mitNum: 1 | 2 | 3) => {
    DailyPlanService.toggleMit(dto.dailyPlan.date, mitNum);
    setDto(DashboardService.getDashboardDTO());
    setAnalytics(AnalyticsAggregator.generateReport());
  };

  const handleHabitToggle = (habitId: string) => {
    HabitService.toggleHabitLog(habitId, dto.dailyPlan.date);
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
            <Badge variant="gold">v6.0 Autonomous OS</Badge>
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

      {/* AI Engineering Copilot & Autonomous Routine Scheduler */}
      <AiCopilotWidget />
      <AutonomousSchedulerWidget />

      {/* Grid Section 1: Hero Metrics (Execution Score, Today's MITs, Deep Work Timer) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Execution Score (7-Engine Aggregator) */}
        <Card goldBorder className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">Life OS Analytics</span>
              <h2 className="text-lg font-serif font-bold text-gray-100 mt-0.5">Execution Score</h2>
            </div>
            <Badge variant="gold" className="text-[10px]">7 Engines Active</Badge>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <ScoreRing score={analytics.overallLifeOSScore} size={130} strokeWidth={11} label="Overall Rating" />
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

      {/* Grid Section 2: Domain Snapshots (Current Project, Learning, Finance, Habit Streaks) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Current Project */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono text-[10px] uppercase">Current Project</span>
            <FolderGit2 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-100">Project HIM OS</h3>
            <p className="text-xs text-gray-400 mt-0.5">Next.js 15, FastAPI, Supabase</p>
          </div>
          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 font-medium">v5.0 Shipped</span>
            <Button variant="ghost" size="sm" className="p-0 text-gray-400 hover:text-gray-100" onClick={() => window.location.assign('/planning/projects')}>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>

        {/* Learning Velocity */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono text-[10px] uppercase">Learning Progress</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-100">{dto.stats.booksReadCount} Books Completed</h3>
            <p className="text-xs text-gray-400 mt-0.5">German Anki: Goethe B1 Target</p>
          </div>
          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
            <span className="text-[11px] text-[#C9A84C] font-mono">20 Books Computed Target</span>
            <Button variant="ghost" size="sm" className="p-0 text-gray-400 hover:text-gray-100" onClick={() => window.location.assign('/learning')}>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>

        {/* Financial Snapshot */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono text-[10px] uppercase">Financial Snapshot</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-100">{dto.stats.netWorthFormatted}</h3>
            <p className="text-xs text-emerald-400 mt-0.5 font-mono">+12.4% Net Worth Growth</p>
          </div>
          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">Asset & Brokerage Accounts</span>
            <Button variant="ghost" size="sm" className="p-0 text-gray-400 hover:text-gray-100" onClick={() => window.location.assign('/finance')}>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>

        {/* Habit Execution Streaks */}
        <Card className="space-y-3">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono text-[10px] uppercase">Habit Streaks</span>
            <Flame className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-100">7-Day Active Streak</h3>
            <p className="text-xs text-gray-400 mt-0.5">5 Core Habits Tracked</p>
          </div>
          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between">
            <span className="text-[11px] text-emerald-400 font-mono">80% 30-Day Completion</span>
            <Button variant="ghost" size="sm" className="p-0 text-gray-400 hover:text-gray-100" onClick={() => window.location.assign('/execution/habits')}>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Grid Section 3: Microservices Telemetry Widgets (GitHub Commits & Weather) */}
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
