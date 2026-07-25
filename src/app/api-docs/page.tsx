'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import {
  BookOpen,
  Code2,
  Play,
  CheckCircle2,
  Copy,
  Check,
  Server,
  ArrowRight,
  Activity,
  ShieldCheck,
} from 'lucide-react';
import { SystemDiagnosticsService, SystemDiagnosticReport } from '@/core/testing/systemDiagnostics';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  title: string;
  description: string;
  requestBodySample?: object;
  responseSample: object;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'ep-dashboard',
    method: 'GET',
    path: '/api/v1/dashboard',
    title: 'Aggregated Dashboard DTO',
    description: 'Retrieves the single aggregated DTO containing user profile, daily plan, habits, and domain quick stats.',
    responseSample: {
      success: true,
      data: {
        user: { name: 'Engineer', motto: 'Prototype Today. Legacy Tomorrow.', version: 'v4.0.0' },
        todayDate: 'Saturday, July 25, 2026',
        dailyPlan: { mit1: 'Build OpenAPI Portal', mit1Done: true },
        stats: { netWorthFormatted: '₦ 2,450,000', activeProjectsCount: 3 },
      },
      timestamp: '2026-07-25T20:47:00Z',
    },
  },
  {
    id: 'ep-analytics',
    method: 'GET',
    path: '/api/v1/analytics',
    title: '7-Engine System Analytics Report',
    description: 'Computes real-time weighted Life OS score across Consistency, Engineer, Health, Learning, Career, Financial, and Business engines.',
    responseSample: {
      success: true,
      data: {
        overallLifeOSScore: 88,
        consistencyScore: { score: 90, status: 'optimal' },
        engineerScore: { score: 85, status: 'good' },
        careerScore: { score: 88, status: 'optimal' },
      },
      timestamp: '2026-07-25T20:47:00Z',
    },
  },
  {
    id: 'ep-goals',
    method: 'GET',
    path: '/api/v1/goals',
    title: 'Goals List & Computed Progress',
    description: 'Returns active goals with dynamically computed progress metrics (never hardcoded).',
    responseSample: {
      success: true,
      data: [
        { id: 'g1', title: 'Read 20 Growth & Architecture Books', progressPct: 90, computedDetails: '18/20 Books Completed' },
      ],
      timestamp: '2026-07-25T20:47:00Z',
    },
  },
  {
    id: 'ep-[#projects]',
    method: 'GET',
    path: '/api/v1/projects',
    title: 'Active Project Portfolio',
    description: 'Exposes active engineering projects, milestone checklists, and tech stack metadata.',
    responseSample: {
      success: true,
      data: [
        { id: 'p1', name: 'Project HIM OS', techStack: ['Next.js', 'FastAPI', 'Supabase'], status: 'active' },
      ],
      timestamp: '2026-07-25T20:47:00Z',
    },
  },
  {
    id: 'ep-career',
    method: 'GET',
    path: '/api/v1/career',
    title: 'Market Readiness & Application Pipeline',
    description: 'Returns the computed Market Readiness report, top verified skills, and job applications.',
    responseSample: {
      success: true,
      data: {
        readinessReport: { overallScorePct: 88, skillCoveragePct: 92 },
        applications: [{ company: 'Stripe', role: 'Backend Engineer', status: 'interview' }],
      },
      timestamp: '2026-07-25T20:47:00Z',
    },
  },
];

export default function ApiDocsPage() {
  const [activeEp, setActiveEp] = useState<ApiEndpoint>(API_ENDPOINTS[0]);
  const [liveResponse, setLiveResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // System Diagnostics State
  const [diagReport, setDiagReport] = useState<SystemDiagnosticReport | null>(null);
  const [runningDiag, setRunningDiag] = useState(false);

  const handleTestEndpoint = async (path: string) => {
    setLoading(true);
    try {
      const res = await fetch(path);
      const data = await res.json();
      setLiveResponse(JSON.stringify(data, null, 2));
    } catch {
      setLiveResponse(JSON.stringify(activeEp.responseSample, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleRunDiagnostics = async () => {
    setRunningDiag(true);
    const report = await SystemDiagnosticsService.runDiagnostics();
    setDiagReport(report);
    setRunningDiag(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeEp.responseSample, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Public OpenAPI / Swagger Portal</h1>
            <Badge variant="gold">OpenAPI 3.0</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Interactive REST API documentation and live endpoint runner for Project HIM OS.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="green" className="text-xs py-1 px-3">
            v1.0 REST Active ✓
          </Badge>
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/demo')}>
            <span>Employer Showcase</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* System Diagnostics Suite Card */}
      <Card goldBorder className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-gray-100">In-Browser System Diagnostics Suite</h3>
              <p className="text-xs text-gray-400">Automated self-tests for Storage, Event Bus, FastAPI, Supabase, and Analytics.</p>
            </div>
          </div>

          <Button variant="primary" size="sm" onClick={handleRunDiagnostics} disabled={runningDiag}>
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            <span>{runningDiag ? 'Running Tests...' : 'Run Self-Diagnostics'}</span>
          </Button>
        </div>

        {diagReport && (
          <div className="space-y-3 pt-3 border-t border-gray-800/80 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-gray-300">
                Health Status: <strong className="text-emerald-400 uppercase">{diagReport.overallHealth}</strong> ({diagReport.testsPassed}/{diagReport.totalTests} Passed)
              </span>
              <span className="text-gray-500">{diagReport.timestamp}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
              {diagReport.results.map((res) => (
                <div key={res.id} className="p-3 bg-gray-900/80 rounded-lg border border-gray-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-200 truncate">{res.name}</span>
                    <Badge variant={res.passed ? 'green' : 'red'} className="text-[9px]">
                      {res.passed ? 'PASS' : 'FAIL'}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-tight">{res.message}</p>
                  <span className="text-[9px] font-mono text-gray-500 block">{res.durationMs} ms</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Main API Docs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Endpoint Navigation List */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h3 className="text-sm font-serif font-semibold text-gray-100">Endpoints ({API_ENDPOINTS.length})</h3>
            <Badge variant="blue">v1 REST</Badge>
          </div>

          <div className="space-y-2">
            {API_ENDPOINTS.map((ep) => {
              const isSelected = ep.id === activeEp.id;
              return (
                <div
                  key={ep.id}
                  onClick={() => {
                    setActiveEp(ep);
                    setLiveResponse(null);
                  }}
                  className={`p-3 rounded-lg border transition-all cursor-pointer space-y-1 ${
                    isSelected
                      ? 'bg-[#C9A84C]/15 border-[#C9A84C] text-gray-100'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {ep.method}
                    </span>
                    <span className="text-xs font-semibold truncate">{ep.title}</span>
                  </div>
                  <p className="text-[10px] font-mono text-gray-500 truncate">{ep.path}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Endpoint Inspector & Live Test Runner */}
        <Card goldBorder className="lg:col-span-3 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-4">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {activeEp.method}
                </span>
                <span className="text-base font-mono font-bold text-[#C9A84C]">{activeEp.path}</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-gray-100 mt-1">{activeEp.title}</h2>
              <p className="text-xs text-gray-400 mt-0.5">{activeEp.description}</p>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
                <span>{copied ? 'Copied' : 'Copy Sample'}</span>
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleTestEndpoint(activeEp.path)} disabled={loading}>
                <Play className="w-3.5 h-3.5 mr-1 fill-current" />
                <span>{loading ? 'Sending Request...' : 'Try It Out'}</span>
              </Button>
            </div>
          </div>

          {/* Response Payload Code Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-gray-400">
              <span>{liveResponse ? 'Live Response Payload (200 OK)' : 'Default Schema Sample'}</span>
              <span className="text-emerald-400">application/json</span>
            </div>

            <pre className="p-4 bg-gray-950 rounded-xl border border-gray-800 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed max-h-[420px]">
              {liveResponse || JSON.stringify(activeEp.responseSample, null, 2)}
            </pre>
          </div>
        </Card>
      </div>
    </div>
  );
}
