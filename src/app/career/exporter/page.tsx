'use client';

import React from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Printer, Download, ArrowRight, Briefcase, Award, CheckCircle2, Code2 } from 'lucide-react';
import { CareerService } from '@/domain/career/service';
import { CareerPipeline } from '@/domain/career/pipelines/careerPipeline';
import { SkillService } from '@/domain/skills/service';
import { ProjectService } from '@/domain/planning/projects/service';
import { DashboardService } from '@/domain/dashboard/service';

export default function ResumeExporterPage() {
  const dto = DashboardService.getDashboardDTO();
  const readiness = CareerPipeline.computeMarketReadiness();
  const skills = SkillService.getSkills();
  const projects = ProjectService.getProjects();

  const profile = {
    name: dto.user.name || 'Executive Engineer',
    title: 'Senior Software & Systems Architect (Backend / MLOps)',
    summary: dto.user.motto || 'High-performance system architecture, FastAPI microservices, and AI Copilot engineering.',
    marketReadinessScore: readiness.overallScorePct,
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    const md = `# ${profile.name} — ${profile.title}

> **Summary:** ${profile.summary}
> **Market Readiness Score:** ${profile.marketReadinessScore}%

---

## 🛠️ Core Engineering Competencies
${skills.map((s) => `- **${s.name}**: Level ${s.currentLevel}/5 (${s.category.toUpperCase()})`).join('\n')}

---

## 🚀 Key Engineering Projects
${projects.map((p) => `### ${p.name}\n- **Description:** ${p.description}\n- **Tech Stack:** ${p.techStack.join(', ')}\n- **Status:** ${p.status.toUpperCase()}`).join('\n\n')}

---

*Generated automatically via Project HIM OS Career Exporter v7.0*
`;

    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(md);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${profile.name.replace(/\s+/g, '_')}_Executive_Resume.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800 print:hidden">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Executive Resume & Portfolio Exporter</h1>
            <Badge variant="gold">v7.0 Exporter</Badge>
          </div>
          <p className="text-xs text-gray-400">
            One-click executive PDF resume and single-page technical portfolio sheet generator.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Markdown</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handlePrintPdf}>
            <Printer className="w-3.5 h-3.5 mr-1" />
            <span>Export Executive PDF</span>
          </Button>
        </div>
      </div>

      {/* Print Preview Paper Container */}
      <Card goldBorder className="p-8 space-y-8 bg-[#0B0F17] text-gray-100 border-gray-700 shadow-2xl print:border-none print:shadow-none print:p-0">
        {/* Header Title Section */}
        <div className="border-b border-gray-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-100">{profile.name}</h1>
            <p className="text-sm text-[#C9A84C] font-mono font-medium mt-1">{profile.title}</p>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-2xl">{profile.summary}</p>
          </div>

          <div className="text-right font-mono text-xs space-y-1">
            <Badge variant="green" className="text-xs py-1 px-3">
              Readiness Score: {profile.marketReadinessScore}%
            </Badge>
            <p className="text-gray-500 text-[10px]">Cloud Verified Profile</p>
          </div>
        </div>

        {/* Technical Core Skills Matrix */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#C9A84C]">
            <Code2 className="w-4 h-4" />
            <h2 className="text-base font-serif font-bold tracking-wide">Core Engineering Skills</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            {skills.map((s) => (
              <div key={s.id} className="p-2.5 bg-gray-900/80 rounded-lg border border-gray-800 flex items-center justify-between">
                <span className="text-gray-200 font-medium truncate">{s.name}</span>
                <span className="text-[#C9A84C] font-bold text-[11px] ml-2">L{s.currentLevel}/5</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects Portfolio */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#C9A84C]">
            <Briefcase className="w-4 h-4" />
            <h2 className="text-base font-serif font-bold tracking-wide">Featured Engineering Projects</h2>
          </div>
          <div className="space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="p-4 bg-gray-900/60 rounded-xl border border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-100">{p.name}</h3>
                  <Badge variant="blue" className="uppercase text-[9px]">
                    {p.status}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
