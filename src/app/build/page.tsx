'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { Hammer, Briefcase, FolderGit2, Cpu, Presentation, ArrowUpRight, Award, Sparkles, Printer } from 'lucide-react';
import { CareerPipeline, MarketReadinessReport } from '@/domain/career/pipelines/careerPipeline';
import { SkillService } from '@/domain/skills/service';

export default function BuildWorkspacePage() {
  const [report, setReport] = useState<MarketReadinessReport | null>(null);
  const skillsCount = SkillService.getSkills().length;

  useEffect(() => {
    setReport(CareerPipeline.computeMarketReadiness());
  }, []);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Build Workspace</h1>
            <Badge variant="gold">Creation & Career Elevation</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Pipeline: Daily Work → Projects → Skills → Portfolio → CV → Market Readiness
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => window.location.assign('/career/exporter')}>
            <Printer className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>PDF Resume Exporter</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => window.location.assign('/planning/projects')}>
            <FolderGit2 className="w-3.5 h-3.5 mr-1" />
            <span>Manage Projects</span>
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            label="Market Readiness"
            value={`${report.overallScorePct}%`}
            badgeText="Senior Tier"
            badgeVariant="gold"
            icon={Award}
            trend="up"
            trendValue="Top 5%"
            subtext="Calculated from shipped code & verified skills."
          />
          <MetricCard
            label="Skill Coverage"
            value={`${report.skillCoveragePct}%`}
            badgeText={`${skillsCount} Skills`}
            badgeVariant="blue"
            icon={Cpu}
            trend="up"
            trendValue="Verified"
            subtext="Backend, MLOps, Next.js, and Supabase SQL."
          />
          <MetricCard
            label="Project Quality"
            value={`${report.projectScorePct}%`}
            badgeText="Shipped"
            badgeVariant="purple"
            icon={FolderGit2}
            trend="up"
            trendValue="Production"
            subtext="Computed across active repositories."
          />
          <MetricCard
            label="Interview Velocity"
            value={`${report.interviewMomentumPct}%`}
            badgeText="Active"
            badgeVariant="green"
            icon={Sparkles}
            trend="up"
            trendValue="High"
            subtext="Job application pipeline response score."
          />
        </div>
      )}

      {/* Build Sub-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Career Engine */}
        <Card goldBorder className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/40 flex items-center justify-center text-[#C9A84C]">
                <Briefcase className="w-5 h-5" />
              </div>
              <Badge variant="gold">Flagship ⭐</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Career Engine</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Track job applications, generate executive Markdown CVs, and monitor market readiness scores.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/career')}>
            <span>Open Career Engine</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Projects Hub */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <Badge variant="blue">Planning</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Projects Hub</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Organize feature roadmaps, milestone deliverables, and repository commits.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/planning/projects')}>
            <span>Open Projects Hub</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Skills Matrix & Competency Radar */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Cpu className="w-5 h-5" />
              </div>
              <Badge variant="purple">v6.0 Radar</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Skills Matrix & Radar</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Map technical proficiency scores, target skill coverage, and automated learning roadmaps.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/skills/radar')}>
            <span>Open Skills Radar</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>

        {/* Employer Showcase */}
        <Card className="space-y-4 flex flex-col justify-between p-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Presentation className="w-5 h-5" />
              </div>
              <Badge variant="green">v5.0 Showcase</Badge>
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-100">Employer Showcase</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Interactive recruiter demonstration mode showcasing live system architecture & diagnostics.
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => window.location.assign('/demo')}>
            <span>Open Employer Showcase</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Card>
      </div>
    </div>
  );
}
