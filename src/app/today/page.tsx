'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Target, Clock, Check, CalendarDays, BookOpen, Flame, Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import { DailyPlanService } from '@/domain/execution/daily/service';
import { DashboardService } from '@/domain/dashboard/service';
import { DashboardDTO } from '@/domain/dashboard/types';

export default function TodayExecutionPage() {
  const [dto, setDto] = useState<DashboardDTO | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [reflection, setReflection] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);

  useEffect(() => {
    setDto(DashboardService.getDashboardDTO());
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

  if (!dto) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-8">
        <div className="flex items-center space-x-3 text-gray-400 font-mono text-xs">
          <div className="w-4 h-4 rounded-full border-2 border-[#22C55E] border-t-transparent animate-spin" />
          <span>Loading Today's Execution Environment...</span>
        </div>
      </div>
    );
  }

  const handleMitToggle = (mitNum: 1 | 2 | 3) => {
    DailyPlanService.toggleMit(dto.dailyPlan.date, mitNum);
    setDto(DashboardService.getDashboardDTO());
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) return;
    const plan = DailyPlanService.getPlanByDate(dto.dailyPlan.date);
    plan.reflection = reflection;
    DailyPlanService.savePlan(plan);
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 2000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#2B4D3E]">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">TODAY</h1>
            <Badge variant="green">HPS Execution Hub</Badge>
          </div>
          <p className="text-xs text-gray-400 font-mono">
            {dto.todayDate} • Focused Execution Environment (Zero Clutter)
          </p>
        </div>
        <Badge variant="gold" className="text-xs py-1 px-3">
          <Flame className="w-3.5 h-3.5 mr-1 text-emerald-400" />
          <span>Consistency Streak: 7 Days</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Morning Planning & MIT Outcomes */}
        <div className="lg:col-span-7 space-y-6">
          <Card goldBorder className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-[#22C55E]" />
                <h2 className="text-lg font-serif font-bold text-gray-100">Today's Priorities (Top 3 MITs)</h2>
              </div>
              <Badge variant="green" className="text-[10px]">HPS Priority</Badge>
            </div>

            <div className="space-y-3">
              {[
                { num: 1 as const, text: dto.dailyPlan.mit1 || 'Configure Production SaaS Dashboard UI', done: dto.dailyPlan.mit1Done },
                { num: 2 as const, text: dto.dailyPlan.mit2 || 'Verify Lucide React Icons Integration', done: dto.dailyPlan.mit2Done },
                { num: 3 as const, text: dto.dailyPlan.mit3 || 'German Anki Vocabulary Practice', done: dto.dailyPlan.mit3Done },
              ].map((mit) => (
                <div
                  key={mit.num}
                  onClick={() => handleMitToggle(mit.num)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    mit.done
                      ? 'bg-[#0F2D20] border-[#22C55E]/40 text-gray-400 line-through'
                      : 'bg-[#163526] border-[#2B4D3E] text-gray-200 hover:border-[#22C55E]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] transition-colors ${
                        mit.done ? 'bg-[#22C55E] border-[#22C55E] text-[#071A12] font-bold' : 'border-gray-600'
                      }`}
                    >
                      {mit.done && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-semibold">{mit.text}</span>
                  </div>
                  <Badge variant={mit.done ? 'green' : 'gray'} className="text-[9px]">
                    {mit.done ? 'Completed' : `MIT #${mit.num}`}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Evening Reflection & Daily Journal */}
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#4ADE80]" />
                <h2 className="text-lg font-serif font-bold text-gray-100">Evening Reflection & Journal</h2>
              </div>
              <Badge variant="blue" className="text-[10px]">HPS Ritual</Badge>
            </div>

            <form onSubmit={handleSaveReflection} className="space-y-3">
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What went well today? What did you learn?"
                rows={4}
                className="w-full bg-[#071A12] border border-[#2B4D3E] rounded-xl p-3 text-xs text-gray-100 focus:outline-none focus:border-[#22C55E]"
              />
              <div className="flex justify-end">
                <Button type="submit" variant="primary" size="sm">
                  {journalSaved ? 'Reflection Saved!' : 'Save Reflection'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Right Column: Deep Work Block Timer & Time Blocks */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="space-y-4 text-center p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-[#22C55E]" />
                <h2 className="text-lg font-serif font-bold text-gray-100">Deep Work Session</h2>
              </div>
              <Badge variant="green" className="text-[10px]">25m Focus Block</Badge>
            </div>

            <div className="py-6">
              <div className="text-5xl font-mono font-bold text-[#4ADE80] tracking-wider mb-2">
                {formatTimer(timerSeconds)}
              </div>
              <p className="text-xs text-gray-400">High-Focus Execution Block</p>
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
                    <span>Pause Session</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 mr-1" />
                    <span>Start Session</span>
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

          {/* Time Blocks Overview */}
          <Card className="space-y-3 p-6">
            <h3 className="text-sm font-serif font-bold text-gray-200">Today's Time Block Timeline</h3>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-[#071A12] border border-[#2B4D3E] flex justify-between items-center">
                <span className="text-emerald-400 font-bold">08:00 - 10:00</span>
                <span className="text-gray-200 font-sans">Morning Focus Block (SaaS Dashboard)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#071A12] border border-[#2B4D3E] flex justify-between items-center">
                <span className="text-[#4ADE80] font-bold">11:00 - 12:00</span>
                <span className="text-gray-200 font-sans">German Goethe B1 Anki Practice</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#071A12] border border-[#2B4D3E] flex justify-between items-center">
                <span className="text-purple-400 font-bold">14:00 - 16:00</span>
                <span className="text-gray-200 font-sans">Deep Work Code Architecture Review</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
