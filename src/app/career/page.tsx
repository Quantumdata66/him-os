'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { MetricCard } from '@/shared/ui/MetricCard';
import { Printer, Briefcase, Award, TrendingUp, Sparkles } from 'lucide-react';
import { CareerService } from '@/domain/career/service';
import { CareerPipeline, MarketReadinessReport } from '@/domain/career/pipelines/careerPipeline';
import { JobApplication, ApplicationStatus } from '@/domain/career/types';
import { FastApiClient } from '@/core/api/fastapiClient';

export default function CareerEnginePage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [report, setReport] = useState<MarketReadinessReport | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [generatedCv, setGeneratedCv] = useState<string | null>(null);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [salary, setSalary] = useState<number>(12000000);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setApplications(CareerService.getApplications());
    setReport(CareerPipeline.computeMarketReadiness());
  };

  const handleStatusChange = (id: string, newStatus: ApplicationStatus) => {
    CareerService.updateApplicationStatus(id, newStatus);
    loadData();
  };

  const handleGenerateCv = async () => {
    const res = await FastApiClient.generateResume();
    setGeneratedCv(res.markdown_cv);
  };

  const handleAddApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    CareerService.addApplication({
      company,
      role,
      status: 'applied',
      appliedDate: new Date().toISOString().split('T')[0],
      salaryOffered: salary,
      currency: 'NGN',
      notes: 'Submitted resume and portfolio links.',
    });

    setCompany('');
    setRole('');
    setShowAddForm(false);
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Career Engine & Market Readiness</h1>
            <Badge variant="gold">Flagship Module ⭐</Badge>
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
          <Button variant="outline" size="sm" onClick={handleGenerateCv}>
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#C9A84C]" />
            <span>Auto-Generate CV</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? 'Cancel' : '+ Log Application'}
          </Button>
        </div>
      </div>

      {/* Generated CV Drawer */}
      {generatedCv && (
        <Card goldBorder className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-serif font-semibold text-[#C9A84C]">Generated Executive CV</h3>
            <Button variant="ghost" size="sm" onClick={() => setGeneratedCv(null)}>
              ✕ Close
            </Button>
          </div>
          <pre className="p-4 bg-gray-900/80 rounded-xl border border-gray-800 text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-96">
            {generatedCv}
          </pre>
        </Card>
      )}

      {/* Market Readiness KPI Cards */}
      {report && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MetricCard
            label="Overall Readiness"
            value={`${report.overallScorePct}%`}
            badgeText="Senior Level"
            badgeVariant="gold"
            icon={Award}
            trend="up"
            trendValue="Top 5%"
            subtext="Pipeline readiness score calculated from verified code artifacts."
          />
          <MetricCard
            label="Skill Coverage"
            value={`${report.skillCoveragePct}%`}
            badgeText="Backend / MLOps"
            badgeVariant="blue"
            icon={Briefcase}
            trend="up"
            trendValue="Verified"
            subtext="Core competencies backed by production code implementations."
          />
          <MetricCard
            label="Project Rating"
            value={`${report.projectScorePct}%`}
            badgeText="15 Modules"
            badgeVariant="purple"
            icon={TrendingUp}
            trend="up"
            trendValue="Shipped"
            subtext="Computed from production-shipped software repositories."
          />
          <MetricCard
            label="Interview Velocity"
            value={`${report.interviewMomentumPct}%`}
            badgeText="Pipeline"
            badgeVariant="green"
            icon={Sparkles}
            trend="up"
            trendValue="High"
            subtext="Active job application response & interview momentum."
          />
        </div>
      )}

      {/* New Application Form */}
      {showAddForm && (
        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Log Job Application</h3>
          <form onSubmit={handleAddApp} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Company Name (e.g. Stripe, Paystack)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Role Title (e.g. Senior Backend Engineer)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />
            <input
              type="number"
              placeholder="Salary Offered / Target (NGN)"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="primary" size="sm">
              Save Application
            </Button>
          </form>
        </Card>
      )}

      {/* Job Applications Board */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-lg font-serif font-semibold text-gray-100">Job Applications Pipeline</h3>
          <Badge variant="gold">{applications.length} Applications Tracked</Badge>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-sm font-semibold text-gray-100">{app.role}</h4>
                <p className="text-xs text-gray-400">{app.company} • Applied {app.appliedDate}</p>
                {app.salaryOffered && (
                  <p className="text-[11px] text-[#C9A84C] font-mono mt-1">
                    Target/Offered: ₦ {app.salaryOffered.toLocaleString()} NGN
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <select
                  value={app.status}
                  onChange={(e: any) => handleStatusChange(app.id, e.target.value)}
                  className="bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1 text-xs text-gray-200 focus:outline-none"
                >
                  <option value="researching">Researching</option>
                  <option value="applied">Applied</option>
                  <option value="screening">Screening</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>

                <Badge
                  variant={
                    app.status === 'offer' || app.status === 'accepted'
                      ? 'green'
                      : app.status === 'interview' || app.status === 'screening'
                      ? 'gold'
                      : 'gray'
                  }
                >
                  {app.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
