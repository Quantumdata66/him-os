'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import {
  Presentation,
  CheckCircle2,
  Cpu,
  Sparkles,
  Server,
  Database,
  ArrowRight,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { AiCopilotService } from '@/core/ai/aiCopilot';
import { AnalyticsAggregator } from '@/core/analytics/analyticsAggregator';

export default function DemoShowcasePage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [testResult, setTestResult] = useState<string | null>(null);

  const showcaseHighlights = [
    {
      step: 1,
      title: 'Domain-Driven Architecture',
      icon: Cpu,
      description: 'Zero Next.js/React leaks in the domain layer. All business logic is implemented in pure TypeScript services.',
      badge: 'Architecture',
    },
    {
      step: 2,
      title: 'FastAPI Microservices Backend',
      icon: Server,
      description: 'Async Python microservices containerized with Docker, handling GitHub commit tracking, weather sync, and CV auto-building.',
      badge: 'Backend Microservices',
    },
    {
      step: 3,
      title: 'MLOps Telemetry Engine',
      icon: Sparkles,
      description: 'Real-time telemetry monitoring machine learning inference latency (ms), F1 score, dataset versioning, and zero data drift.',
      badge: 'MLOps & AI',
    },
    {
      step: 4,
      title: '7-Engine System Analytics',
      icon: Zap,
      description: 'Weighted Life OS rating (0-100%) calculated across Consistency, Engineer, Health, Learning, Career, Financial, and Business engines.',
      badge: 'Data Intelligence',
    },
    {
      step: 5,
      title: 'Supabase PostgreSQL Cloud Sync',
      icon: Database,
      description: '11 SQL migration scripts enforcing Row-Level Security (RLS) policies with offline mutation queue listener.',
      badge: 'Database & Cloud',
    },
  ];

  const handleTestAi = () => {
    const analysis = AiCopilotService.generateAnalysis();
    setTestResult(`🤖 AI Copilot Recommendation: "${analysis.suggestions[0].recommendation}"`);
  };

  const handleTestAnalytics = () => {
    const report = AnalyticsAggregator.generateReport();
    setTestResult(`📊 Calculated Overall Life OS Score: ${report.overallLifeOSScore}% across 7 analytics engines.`);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Employer & Client Showcase</h1>
            <Badge variant="gold">v5.0 Interactive Demo</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Interactive presentation mode designed for technical interviews, engineering demos, and architectural reviews.
          </p>
        </div>
        <Button variant="gold" onClick={() => window.location.assign('/dashboard')}>
          <span>Open Live Operating System</span>
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>

      {/* Hero Presentation Card */}
      <Card goldBorder className="space-y-6 bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#09090B]">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C]">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-gray-100">System Architecture Guided Tour</h2>
              <p className="text-xs text-gray-400">Click any architectural milestone to inspect codebase design patterns.</p>
            </div>
          </div>
          <Badge variant="green" className="text-xs py-1 px-3">
            Production Verified ✓
          </Badge>
        </div>

        {/* Step Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {showcaseHighlights.map((item) => {
            const Icon = item.icon;
            const isSelected = item.step === activeStep;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(item.step)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer text-center flex flex-col items-center justify-center space-y-2 ${
                  isSelected
                    ? 'bg-[#C9A84C]/20 border-[#C9A84C] text-gray-100 shadow-md shadow-[#C9A84C]/10 scale-105'
                    : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C9A84C]' : 'text-gray-400'}`} />
                <span className="text-xs font-semibold leading-tight">{item.title}</span>
              </div>
            );
          })}
        </div>

        {/* Active Step Details Card */}
        {showcaseHighlights.find((s) => s.step === activeStep) && (
          <div className="bg-gray-900/80 p-5 rounded-xl border border-gray-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-gray-100">
                {showcaseHighlights[activeStep - 1].title}
              </h3>
              <Badge variant="purple">{showcaseHighlights[activeStep - 1].badge}</Badge>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {showcaseHighlights[activeStep - 1].description}
            </p>
          </div>
        )}
      </Card>

      {/* Interactive Feature Sandbox */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-lg font-serif font-semibold text-gray-100">Live Feature Sandbox</h3>
          <Badge variant="gold">Interactive Testing</Badge>
        </div>

        <p className="text-xs text-gray-400">Test live system services directly from this showcase panel:</p>

        <div className="flex flex-wrap gap-3">
          <Button variant="outline" size="sm" onClick={handleTestAi}>
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Test AI Copilot Engine</span>
          </Button>

          <Button variant="outline" size="sm" onClick={handleTestAnalytics}>
            <Zap className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span>Run 7-Engine Analytics</span>
          </Button>

          <Button variant="outline" size="sm" onClick={() => window.location.assign('/mlops')}>
            <Cpu className="w-3.5 h-3.5 mr-1 text-blue-400" />
            <span>Inspect MLOps Dashboard</span>
          </Button>
        </div>

        {testResult && (
          <div className="p-4 bg-gray-950 rounded-lg border border border-emerald-500/30 text-xs font-mono text-emerald-400 animate-in fade-in duration-150">
            {testResult}
          </div>
        )}
      </Card>
    </div>
  );
}
