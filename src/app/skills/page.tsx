'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { SkillService } from '@/domain/skills/service';
import { Skill, SkillCategory } from '@/domain/skills/types';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<SkillCategory>('backend');
  const [currentLevel, setCurrentLevel] = useState(3);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = () => {
    setSkills(SkillService.getSkills());
  };

  const handleLevelChange = (id: string, newLevel: number) => {
    SkillService.updateProficiency(id, newLevel);
    loadSkills();
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    SkillService.createSkill({
      name,
      category,
      currentLevel,
      targetLevel: 5,
    });

    setName('');
    setShowAddModal(false);
    loadSkills();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Engineering Skills Matrix</h1>
            <Badge variant="gold">{skills.length} Tracked Skills</Badge>
          </div>
          <p className="text-xs text-gray-400">
            First-class domain. Every skill proficiency rating is backed by verified project evidence.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(!showAddModal)}>
          {showAddModal ? 'Cancel' : '+ Track New Skill'}
        </Button>
      </div>

      {/* Skill Form */}
      {showAddModal && (
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Track New Skill</h3>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Skill Name (e.g. Kubernetes, Redis)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:col-span-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
              required
            />
            <select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            >
              <option value="backend">Backend</option>
              <option value="devops">DevOps</option>
              <option value="ml">ML / MLOps</option>
              <option value="frontend">Frontend</option>
              <option value="language">Language</option>
            </select>
            <Button type="submit" variant="primary" size="sm">
              Save Skill
            </Button>
          </form>
        </Card>
      )}

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <Card key={skill.id} className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="purple" className="uppercase text-[9px]">
                  {skill.category}
                </Badge>
                <span className="text-xs font-mono text-[#C9A84C] font-bold">
                  Level {skill.currentLevel}/{skill.targetLevel}
                </span>
              </div>
              <h3 className="text-base font-semibold text-gray-100 mb-1">{skill.name}</h3>

              {/* Progress Slider */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C9A84C] h-full transition-all"
                    style={{ width: `${(skill.currentLevel / skill.targetLevel) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-500">
                  <span>Novice</span>
                  <span>Proficient</span>
                  <span>Master</span>
                </div>
              </div>

              {/* Level Control Buttons */}
              <div className="flex items-center justify-between pt-3">
                <span className="text-xs text-gray-400">Update Proficiency:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => handleLevelChange(skill.id, lvl)}
                      className={`w-6 h-6 rounded text-xs font-mono font-bold transition-all ${
                        skill.currentLevel === lvl
                          ? 'bg-[#C9A84C] text-gray-950'
                          : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Evidence Sub-section */}
            <div className="border-t border-gray-800/80 pt-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-300">Verified Evidence</span>
                <Badge variant="gray" className="text-[9px]">
                  {skill.evidence.length} Record(s)
                </Badge>
              </div>

              {skill.evidence.length > 0 ? (
                <div className="space-y-1.5">
                  {skill.evidence.map((ev) => (
                    <div key={ev.id} className="p-2 bg-gray-900/60 rounded border border-gray-800 text-[11px] text-gray-400">
                      <p className="text-gray-300 font-medium">{ev.description}</p>
                      <p className="text-[9px] text-gray-500 font-mono mt-0.5">{ev.date} • {ev.evidenceType}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-gray-500 italic">No verified project evidence linked yet.</p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
