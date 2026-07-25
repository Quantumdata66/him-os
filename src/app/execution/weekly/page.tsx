'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { WeeklySprintService } from '@/domain/execution/weekly/service';
import { WeeklySprint } from '@/domain/execution/weekly/types';
import { FastApiClient, WeeklyDigestResponse } from '@/core/api/fastapiClient';

export default function WeeklySprintPage() {
  const [sprint, setSprint] = useState<WeeklySprint | null>(null);
  const [savedMsg, setSavedMsg] = useState('');
  const [newDeliverable, setNewDeliverable] = useState('');
  const [digest, setDigest] = useState<WeeklyDigestResponse | null>(null);
  const [loadingDigest, setLoadingDigest] = useState(false);

  useEffect(() => {
    setSprint(WeeklySprintService.getSprintByWeek());
  }, []);

  if (!sprint) return <div className="text-gray-400 p-8">Loading Weekly Sprint...</div>;

  const handleSave = () => {
    WeeklySprintService.saveSprint(sprint);
    setSavedMsg('Sprint Saved Successfully! 🚀');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleGenerateDigest = async () => {
    setLoadingDigest(true);
    const res = await FastApiClient.generateWeeklyDigest();
    setDigest(res);
    setLoadingDigest(false);
  };

  const toggleDeliverable = (id: string) => {
    const updated = sprint.deliverables.map((d) => (d.id === id ? { ...d, completed: !d.completed } : d));
    setSprint({ ...sprint, deliverables: updated });
  };

  const addDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeliverable.trim()) return;

    const item = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      title: newDeliverable,
      completed: false,
    };

    setSprint({ ...sprint, deliverables: [...sprint.deliverables, item] });
    setNewDeliverable('');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Weekly Sprint Execution</h1>
            <Badge variant="gold">Week Starting: {sprint.weekStart}</Badge>
          </div>
          <p className="text-xs text-gray-400">Sprint Goal → Key Deliverables → Hours Planned vs Completed</p>
        </div>
        <div className="flex items-center space-x-3">
          {savedMsg && <span className="text-xs text-emerald-400">{savedMsg}</span>}
          <Button variant="outline" onClick={handleGenerateDigest} disabled={loadingDigest}>
            {loadingDigest ? 'Generating...' : '📥 Export Weekly Digest'}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Sprint
          </Button>
        </div>
      </div>

      {/* Generated Weekly Digest Report Drawer */}
      {digest && (
        <Card goldBorder className="space-y-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-lg">📊</span>
              <h3 className="text-base font-serif font-semibold text-[#C9A84C]">FastAPI Generated Weekly Report Digest</h3>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setDigest(null)}>
              ✕ Close
            </Button>
          </div>
          <p className="text-xs text-emerald-400 italic">{digest.summary_sentence}</p>
          <pre className="p-4 bg-gray-950 rounded-lg border border-gray-800 text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-96">
            {digest.markdown_report}
          </pre>
        </Card>
      )}

      {/* Sprint Goal Card */}
      <Card goldBorder className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-serif font-semibold text-gray-100">Primary Sprint Goal</h2>
          <Badge variant="blue">Weekly Objective</Badge>
        </div>
        <input
          type="text"
          value={sprint.sprintGoal}
          onChange={(e) => setSprint({ ...sprint, sprintGoal: e.target.value })}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-[#C9A84C]"
        />

        {/* Deliverables Checklist */}
        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-gray-300">Key Deliverables Checklist</label>
          <div className="space-y-2">
            {sprint.deliverables.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleDeliverable(item.id)}
                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer ${
                  item.completed
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-400 line-through'
                    : 'bg-gray-900/60 border-gray-800 text-gray-200 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                      item.completed ? 'bg-emerald-500 border-emerald-400 text-gray-950 font-bold' : 'border-gray-600'
                    }`}
                  >
                    {item.completed && '✓'}
                  </div>
                  <span className="text-xs font-medium">{item.title}</span>
                </div>
                <Badge variant={item.completed ? 'green' : 'gray'}>{item.completed ? 'Done' : 'In Progress'}</Badge>
              </div>
            ))}
          </div>

          <form onSubmit={addDeliverable} className="flex space-x-2 pt-2">
            <input
              type="text"
              placeholder="+ Add Sprint Deliverable..."
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="secondary" size="sm">
              Add Item
            </Button>
          </form>
        </div>
      </Card>

      {/* Hours & Sprint Retrospective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Sprint Capacity & Hours</h3>
          <div className="grid grid-cols-2 gap-4 text-center font-mono">
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
              <label className="text-[10px] text-gray-500 block mb-1">Hours Planned</label>
              <input
                type="number"
                value={sprint.hoursPlanned}
                onChange={(e) => setSprint({ ...sprint, hoursPlanned: Number(e.target.value) })}
                className="w-full bg-transparent text-xl font-bold text-[#C9A84C] text-center focus:outline-none"
              />
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
              <label className="text-[10px] text-gray-500 block mb-1">Hours Completed</label>
              <input
                type="number"
                value={sprint.hoursCompleted}
                onChange={(e) => setSprint({ ...sprint, hoursCompleted: Number(e.target.value) })}
                className="w-full bg-transparent text-xl font-bold text-emerald-400 text-center focus:outline-none"
              />
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Sprint Retrospective</h3>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Sprint Wins</label>
            <input
              type="text"
              value={sprint.wins}
              onChange={(e) => setSprint({ ...sprint, wins: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-300">Sprint Lessons</label>
            <input
              type="text"
              value={sprint.lessons}
              onChange={(e) => setSprint({ ...sprint, lessons: e.target.value })}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
