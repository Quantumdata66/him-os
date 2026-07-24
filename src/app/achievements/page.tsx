'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { AchievementService } from '@/core/achievements/achievementService';
import { Achievement, AchievementStats, AchievementCategory } from '@/core/achievements/types';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<AchievementStats | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');

  useEffect(() => {
    loadData();
    AchievementService.initAutoUnlockListeners();
  }, []);

  const loadData = () => {
    setAchievements(AchievementService.getAchievements());
    setStats(AchievementService.getStats());
  };

  const handleManualUnlock = (id: string) => {
    AchievementService.unlockAchievement(id);
    loadData();
  };

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  if (!stats) return <div className="text-gray-400 p-8">Loading Trophy Room...</div>;

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Achievement Trophy Room</h1>
            <Badge variant="gold">Gamified OS</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Event-driven unlock engine. Earn achievement points by hitting real-world engineering milestones.
          </p>
        </div>
        <div className="text-right font-mono">
          <span className="text-2xl font-bold text-[#C9A84C]">{stats.totalPoints} XP</span>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total Experience Points</p>
        </div>
      </div>

      {/* Progress Banner */}
      <Card goldBorder className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl font-serif font-bold text-gray-100">Overall Gamification Progress</h2>
            <p className="text-xs text-gray-400">
              {stats.unlockedCount} of {stats.totalCount} Trophies Unlocked ({stats.completionPct}%)
            </p>
          </div>

          <div className="w-full md:w-64 space-y-1.5 font-mono">
            <div className="flex justify-between text-xs text-gray-300">
              <span>Trophy Progress</span>
              <span className="text-[#C9A84C]">{stats.completionPct}%</span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-[#C9A84C] h-full transition-all duration-500"
                style={{ width: `${stats.completionPct}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {(['all', 'engineering', 'habits', 'career', 'learning', 'financial', 'business'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-[#C9A84C] text-gray-950 font-bold'
                : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((ach) => (
          <Card
            key={ach.id}
            goldBorder={ach.unlocked}
            className={`space-y-4 flex flex-col justify-between transition-all ${
              ach.unlocked ? 'bg-[#111827]' : 'bg-gray-950/40 opacity-70 border-gray-800/50'
            }`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`text-3xl ${ach.unlocked ? 'grayscale-0' : 'grayscale opacity-50'}`}>
                    {ach.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-gray-100">{ach.title}</h3>
                    <Badge variant="purple" className="uppercase text-[9px] mt-0.5">
                      {ach.category}
                    </Badge>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#C9A84C]">+{ach.points} XP</span>
              </div>

              <p className="text-xs text-gray-400">{ach.description}</p>
              <p className="text-[11px] text-gray-500 italic mt-2">
                Target: {ach.requirementDetails}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-800/60 flex items-center justify-between">
              {ach.unlocked ? (
                <Badge variant="green" className="text-[10px]">
                  Unlocked on {ach.unlockedAt} ✓
                </Badge>
              ) : (
                <div className="flex items-center justify-between w-full">
                  <Badge variant="gray" className="text-[10px]">Locked 🔒</Badge>
                  <Button variant="ghost" size="sm" onClick={() => handleManualUnlock(ach.id)}>
                    Unlock Trophy
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
