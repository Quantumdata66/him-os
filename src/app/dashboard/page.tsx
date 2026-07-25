'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { ScoreRing } from '@/shared/ui/ScoreRing';
import { AiCopilotWidget } from '@/shared/ui/AiCopilotWidget';
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

    // Compute 7-Score Analytics Report
    const report = AnalyticsAggregator.generateReport();
    setAnalytics(report);

    // Fetch V2 FastAPI microservices
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

  if (!dto || !analytics) return <div className="text-gray-400 p-8 text-sm">Loading HIM OS Dashboard & AI Copilot...</div>;

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
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800/80 gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Welcome Back, {dto.user.name}</h1>
            <Badge variant="gold">v4.0 AI Copilot Integrated</Badge>
          </div>
          <p className="text-xs text-gray-400 font-mono">{dto.todayDate} • Single DTO Aggregated View</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="green" className="text-xs py-1 px-3">
            Streak: 7 Days 🔥
          </Badge>
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/execution/daily')}>
            Open Daily Planner 🎯
          </Button>
        </div>
      </div>

      {/* V4 AI Engineering Copilot Banner Widget */}
      <AiCopilotWidget />

      {/* V2 7-Engine System Analytics Banner */}
      <Card goldBorder className="space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-800/80 pb-6">
          <div className="flex items-center space-x-6">
            <ScoreRing score={analytics.overallLifeOSScore} size={110} strokeWidth={10} />
            <div>
              <span className="text-xs font-mono text-[#C9A84C] uppercase tracking-wider">Overall System Score</span>
              <h2 className="text-2xl font-serif font-bold text-gray-100 mt-1">Project HIM Life OS Rating</h2>
              <p className="text-xs text-gray-400 mt-1">
                Real-time weighted score across 7 isolated analytics engines.
              </p>
            </div>
          </div>
          <Badge variant="gold" className="text-xs py-1 px-3">
            {analytics.overallLifeOSScore >= 80 ? 'Optimal Performance 🔥' : 'Good Performance ⚡'}
          </Badge>
        </div>

        {/* 7 Score Engines Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
          {[
            { metric: analytics.consistencyScore, icon: '🔥' },
            { metric: analytics.engineerScore, icon: '💻' },
            { metric: analytics.healthScore, icon: '🏋️‍♂️' },
            { metric: analytics.learningScore, icon: '📚' },
            { metric: analytics.careerScore, icon: '⭐' },
            { metric: analytics.financialScore, icon: '💰' },
            { metric: analytics.businessScore, icon: '🏢' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gray-900/80 p-3 rounded-lg border border-gray-800 flex flex-col justify-between">
              <div>
                <span className="text-base">{item.icon}</span>
                <p className="text-[10px] text-gray-400 font-medium mt-1 truncate" title={item.metric.name}>
                  {item.metric.name}
                </p>
              </div>
              <div className="mt-2">
                <span className="text-lg font-mono font-bold text-gray-100">{item.metric.score}%</span>
                <Badge
                  variant={
                    item.metric.status === 'optimal'
                      ? 'gold'
                      : item.metric.status === 'good'
                      ? 'green'
                      : 'red'
                  }
                  className="block text-[8px] mt-1"
                >
                  {item.metric.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* V2 Automated Microservices Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weather && (
          <Card className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{weather.icon}</span>
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
              <span className="text-3xl">🐙</span>
              <div>
                <p className="text-xs font-semibold text-gray-200">GitHub Commit Automation ({github.username})</p>
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

      {/* Grid Section 1: Core Daily Loop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's 3 MITs */}
        <Card goldBorder className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🎯</span>
              <h2 className="text-lg font-serif font-semibold text-gray-100">Today's Most Important Tasks (MITs)</h2>
            </div>
            <span className="text-xs text-[#C9A84C] font-mono font-medium">Daily Command Center</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { num: 1 as const, text: dto.dailyPlan.mit1 || 'Build AI Copilot Analysis Engine', done: dto.dailyPlan.mit1Done },
              { num: 2 as const, text: dto.dailyPlan.mit2 || 'Integrate AI Widget on Dashboard', done: dto.dailyPlan.mit2Done },
              { num: 3 as const, text: dto.dailyPlan.mit3 || 'German Anki Vocabulary & Speaking Practice', done: dto.dailyPlan.mit3Done },
            ].map((mit) => (
              <div
                key={mit.num}
                onClick={() => handleMitToggle(mit.num)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                  mit.done
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-400 line-through'
                    : 'bg-gray-900/60 border-gray-800 text-gray-200 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center text-xs transition-colors ${
                      mit.done ? 'bg-emerald-500 border-emerald-400 text-gray-950 font-bold' : 'border-gray-600'
                    }`}
                  >
                    {mit.done && '✓'}
                  </div>
                  <span className="text-sm font-medium">{mit.text}</span>
                </div>
                <Badge variant={mit.done ? 'green' : 'gray'}>{mit.done ? 'Completed' : `MIT #${mit.num}`}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Deep Work Timer */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-xl">⏱️</span>
                <h2 className="text-lg font-serif font-semibold text-gray-100">Deep Work Engine</h2>
              </div>
              <Badge variant="blue">25m Block</Badge>
            </div>

            <div className="text-center py-6">
              <div className="text-5xl font-mono font-bold text-[#C9A84C] tracking-wider mb-2">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-xs text-gray-400">High-Focus Engineering Session</p>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              className="flex-1"
              variant={timerRunning ? 'secondary' : 'primary'}
              onClick={() => setTimerRunning(!timerRunning)}
            >
              {timerRunning ? 'Pause Session' : 'Start Focus'}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
            >
              Reset
            </Button>
          </div>
        </Card>
      </div>

      {/* Grid Section 2: Domain Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>FINANCIAL OS</span>
            <span className="text-emerald-400 font-mono">+12.4%</span>
          </div>
          <div className="text-2xl font-bold text-gray-100 mb-1">{dto.stats.netWorthFormatted}</div>
          <p className="text-[11px] text-gray-500">Assets & Investment Snapshots</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>CAREER ENGINE ⭐</span>
            <span className="text-[#C9A84C]">Flagship</span>
          </div>
          <div className="text-2xl font-bold text-gray-100 mb-1">{dto.stats.skillsTrackedCount} Skills</div>
          <p className="text-[11px] text-gray-500">Verified by Project Evidence</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>PROJECTS</span>
            <span className="text-blue-400">In Progress</span>
          </div>
          <div className="text-2xl font-bold text-gray-100 mb-1">{dto.stats.activeProjectsCount} Projects</div>
          <p className="text-[11px] text-gray-500">FastAPI, Docker, Next.js</p>
        </Card>

        <Card>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>LEARNING ENGINE</span>
            <span className="text-purple-400">Books</span>
          </div>
          <div className="text-2xl font-bold text-gray-100 mb-1">{dto.stats.booksReadCount} Completed</div>
          <p className="text-[11px] text-gray-500">Target: 20 Books (Computed)</p>
        </Card>
      </div>
    </div>
  );
}
