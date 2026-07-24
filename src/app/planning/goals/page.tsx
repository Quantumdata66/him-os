'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { GoalService } from '@/domain/planning/goals/service';
import { GoalWithProgress, GoalType } from '@/domain/planning/goals/types';

export default function GoalsPage() {
  const [goals, setGoals] = useState<GoalWithProgress[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<GoalType>('career');
  const [metricName, setMetricName] = useState('projects_completed');
  const [metricTarget, setMetricTarget] = useState(5);

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    setGoals(GoalService.getGoalsWithProgress());
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    GoalService.createGoal({
      title,
      type,
      description: `Target: ${metricTarget} ${metricName}`,
      metricName,
      metricTarget,
      targetDate: '2026-12-31',
      status: 'active',
    });

    setTitle('');
    setShowAdd(false);
    loadGoals();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Master Goals</h1>
            <Badge variant="gold">{goals.length} Active Goals</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Progress is <strong>always computed dynamically</strong> from source domain events — never stored statically.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : '+ Create Goal'}
        </Button>
      </div>

      {/* Goal Form */}
      {showAdd && (
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Create New Goal</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Goal Title (e.g. Build 5 FastAPI Services)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="sm:col-span-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none focus:border-[#C9A84C]"
              required
            />
            <select
              value={type}
              onChange={(e: any) => setType(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-100 focus:outline-none"
            >
              <option value="career">Career</option>
              <option value="life">Life</option>
              <option value="financial">Financial</option>
              <option value="business">Business</option>
              <option value="health">Health</option>
            </select>
            <Button type="submit" variant="primary">
              Save Goal
            </Button>
          </form>
        </Card>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="gold" className="uppercase text-[9px] mb-1">
                  {goal.type}
                </Badge>
                <h3 className="text-base font-semibold text-gray-100">{goal.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{goal.description}</p>
              </div>
              <span className="text-xl font-mono font-bold text-[#C9A84C]">{goal.progressPct}%</span>
            </div>

            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#C9A84C] h-full transition-all" style={{ width: `${goal.progressPct}%` }} />
            </div>

            <div className="flex justify-between text-xs text-gray-400 font-mono pt-1">
              <span>Current (Computed): {goal.currentValue}</span>
              <span>Target: {goal.metricTarget}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
