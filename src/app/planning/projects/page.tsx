'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { ProjectService } from '@/domain/planning/projects/service';
import { DeepWorkService } from '@/domain/execution/deep-work/service';
import { Project } from '@/domain/planning/projects/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDeepWorkModal, setShowDeepWorkModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [sessionMins, setSessionMins] = useState<number>(60);
  const [sessionNotes, setSessionNotes] = useState<string>('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    setProjects(ProjectService.getProjects());
  };

  const handleMilestoneToggle = (projectId: string, milestoneId: string) => {
    ProjectService.toggleMilestone(projectId, milestoneId);
    loadProjects();
  };

  const handleLogDeepWork = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find((p) => p.id === selectedProjectId);

    DeepWorkService.logSession({
      projectId: selectedProjectId,
      projectName: proj?.name || 'General Focus',
      date: new Date().toISOString().split('T')[0],
      durationMins: sessionMins,
      focusRating: 5,
      notes: sessionNotes || 'Logged deep work focus block.',
    });

    setShowDeepWorkModal(false);
    setSessionNotes('');
    alert(`Logged ${sessionMins} mins of Deep Work for ${proj?.name || 'Project'}! 🔥`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Projects & Milestones</h1>
            <Badge variant="gold">{projects.length} Projects</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Checkable milestones emit real-time events. Linked directly to Deep Work focus sessions.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowDeepWorkModal(true)}>
          ⏱️ Log Deep Work Session
        </Button>
      </div>

      {/* Deep Work Logger Modal */}
      {showDeepWorkModal && (
        <Card goldBorder className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-serif font-semibold text-gray-100">Log Deep Work Session</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowDeepWorkModal(false)}>
              ✕ Close
            </Button>
          </div>
          <form onSubmit={handleLogDeepWork} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            >
              <option value="">Select Target Project...</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Duration (Mins)"
              value={sessionMins}
              onChange={(e) => setSessionMins(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Focus Notes (e.g. FastAPI route handlers)"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="primary" size="sm">
              Save Deep Work
            </Button>
          </form>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <Card key={proj.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-100">{proj.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{proj.objective}</p>
              </div>
              <Badge variant={proj.status === 'completed' ? 'green' : 'gold'}>{proj.status}</Badge>
            </div>

            {/* Milestones Checklist */}
            <div className="space-y-2 pt-2 border-t border-gray-800/80">
              <p className="text-xs font-semibold text-gray-300">Milestones Checklist</p>
              {proj.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleMilestoneToggle(proj.id, m.id)}
                  className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer ${
                    m.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-gray-400 line-through'
                      : 'bg-gray-900/60 border-gray-800 text-gray-200 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                        m.completed ? 'bg-emerald-500 border-emerald-400 text-gray-950 font-bold' : 'border-gray-600'
                      }`}
                    >
                      {m.completed && '✓'}
                    </div>
                    <span className="text-xs">{m.title}</span>
                  </div>
                  <Badge variant={m.completed ? 'green' : 'gray'} className="text-[9px]">
                    {m.completed ? 'Done' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {proj.techStack.map((tech) => (
                <span key={tech} className="text-[10px] bg-gray-900 border border-gray-800 text-gray-300 px-2 py-0.5 rounded">
                  {tech}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
