'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import {
  Cpu,
  Target,
  Sparkles,
  BookOpen,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { SkillsService } from '@/domain/skills/service';

export default function SkillRadarPage() {
  const skills = SkillsService.getSkills();

  const skillCategories = [
    { name: 'Backend Engineering', level: 90, icon: Cpu, badge: 'High Demand' },
    { name: 'System Architecture', level: 85, icon: Target, badge: 'Core Foundation' },
    { name: 'MLOps & AI Telemetry', level: 80, icon: Sparkles, badge: 'Emerging' },
    { name: 'Cloud & Supabase SQL', level: 88, icon: TrendingUp, badge: 'High Demand' },
    { name: 'Next.js 15 & SaaS UI', level: 92, icon: Award, badge: 'Flagship' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Skill Matrix Radar & Career Roadmap</h1>
            <Badge variant="gold">v6.0 Competency Radar</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Interactive skill proficiency mapping and automated learning path recommendations.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => window.location.assign('/skills')}>
          <span>Skills Matrix</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* Category Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <Card key={idx} goldBorder className="space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant={cat.badge === 'Flagship' ? 'gold' : cat.badge === 'High Demand' ? 'green' : 'purple'}>
                    {cat.badge}
                  </Badge>
                </div>

                <h3 className="text-base font-serif font-bold text-gray-100">{cat.name}</h3>
                <div className="flex items-center justify-between text-xs font-mono mt-2">
                  <span className="text-gray-400">Proficiency Score:</span>
                  <span className="text-[#C9A84C] font-bold">{cat.level}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800 mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-[#C9A84C] to-[#D4AF37] transition-all duration-500"
                    style={{ width: `${cat.level}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                <span className="flex items-center text-emerald-400">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified Target
                </span>
                <span className="font-mono text-gray-500">Goal: 95%</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recommended Learning Paths */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-[#C9A84C]" />
            <h3 className="text-base font-serif font-bold text-gray-100">Automated Learning Roadmap</h3>
          </div>
          <Badge variant="blue">Skill Gap Analyzer</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-gray-900/80 rounded-xl border border-gray-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-200">Distributed Systems & Microservices</span>
              <Badge variant="green">Priority High</Badge>
            </div>
            <p className="text-gray-400 text-[11px]">Recommended: "Designing Data-Intensive Applications" by Martin Kleppmann.</p>
          </div>

          <div className="p-3.5 bg-gray-900/80 rounded-xl border border-gray-800 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-200">German Technical Vocabulary (Goethe B1)</span>
              <Badge variant="gold">Core Target</Badge>
            </div>
            <p className="text-gray-400 text-[11px]">Recommended: Daily 20-minute Anki deck practice & Nicos Weg Episode 45.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
