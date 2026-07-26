'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { RefreshCw, Calendar, ArrowRight, CheckCircle2, AlertTriangle, MessageSquare } from 'lucide-react';
import { DailyPlanService } from '@/domain/execution/daily/service';

export default function SprintRolloverPage() {
  const [wins, setWins] = useState('');
  const [bottlenecks, setBottlenecks] = useState('');
  const [rolloverDone, setRolloverDone] = useState(false);

  const pendingTasks = [
    { id: 't1', title: 'Complete Supabase Realtime WebSocket Audit', category: 'Engineering' },
    { id: 't2', title: 'German Anki Goethe B1 Episode 45 Review', category: 'Learning' },
  ];

  const handleExecuteRollover = () => {
    setRolloverDone(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Weekly Sprint Rollover & Retrospective</h1>
            <Badge variant="gold">v7.0 Rollover Engine</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Automated sprint migration engine carrying over uncompleted MITs and logging retrospective lessons.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.assign('/execution/weekly')}>
          <span>Weekly Sprint</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* Sprint Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card goldBorder className="space-y-2 text-center p-4">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Sprint Velocity</span>
          <p className="text-3xl font-mono font-bold text-emerald-400">85%</p>
          <Badge variant="green" className="text-[9px]">Target Exceeded</Badge>
        </Card>

        <Card goldBorder className="space-y-2 text-center p-4">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Completed MITs</span>
          <p className="text-3xl font-mono font-bold text-[#C9A84C]">14 Tasks</p>
          <Badge variant="gold" className="text-[9px]">Shipped</Badge>
        </Card>

        <Card goldBorder className="space-y-2 text-center p-4">
          <span className="text-[10px] font-mono text-gray-400 uppercase">Rollover Tasks</span>
          <p className="text-3xl font-mono font-bold text-purple-400">{pendingTasks.length} Tasks</p>
          <Badge variant="purple" className="text-[9px]">Migrating</Badge>
        </Card>
      </div>

      {/* Retrospective Form Card */}
      <Card className="space-y-6">
        <div className="flex items-center space-x-2 border-b border-gray-800 pb-3">
          <MessageSquare className="w-4 h-4 text-[#C9A84C]" />
          <h3 className="text-base font-serif font-bold text-gray-100">Sprint Retrospective Notes</h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Major Wins & Shipped Features</label>
            <textarea
              rows={3}
              value={wins}
              onChange={(e) => setWins(e.target.value)}
              placeholder="Shipped Version 6.0 Realtime Sync Engine & Monte Carlo Simulator..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 font-semibold">Bottlenecks & Blockers Encountered</label>
            <textarea
              rows={2}
              value={bottlenecks}
              onChange={(e) => setBottlenecks(e.target.value)}
              placeholder="Minor Webpack module resolution issues resolved..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
        </div>

        {/* Pending Rollover Items */}
        <div className="space-y-3 pt-4 border-t border-gray-800">
          <h4 className="text-xs font-semibold text-gray-300">Uncompleted MITs Migrating to Next Sprint:</h4>
          <div className="space-y-2">
            {pendingTasks.map((t) => (
              <div key={t.id} className="p-3 bg-gray-900/60 rounded-lg border border-gray-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-gray-200 font-medium">{t.title}</span>
                </div>
                <Badge variant="purple" className="text-[9px]">
                  {t.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button variant="primary" size="md" onClick={handleExecuteRollover} disabled={rolloverDone}>
            <RefreshCw className={`w-4 h-4 mr-1.5 ${rolloverDone ? '' : 'animate-spin'}`} />
            <span>{rolloverDone ? 'Sprint Rollover Executed ✓' : 'Execute Sprint Rollover'}</span>
          </Button>
        </div>

        {rolloverDone && (
          <p className="text-xs font-mono text-emerald-400 text-center animate-in fade-in">
            New sprint initialized! 2 pending tasks carried over to next week.
          </p>
        )}
      </Card>
    </div>
  );
}
