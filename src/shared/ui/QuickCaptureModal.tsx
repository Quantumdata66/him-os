'use client';

import React, { useState } from 'react';
import { Plus, X, Check, Target, BookOpen, Wallet, Flame, Briefcase } from 'lucide-react';
import { ModalDrawer } from './ModalDrawer';
import { Button } from './Button';

export const QuickCaptureModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'task' | 'note' | 'expense' | 'habit'>('task');
  const [title, setTitle] = useState('');
  const [saved, setSaved] = useState(false);

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaved(true);
    setTimeout(() => {
      setTitle('');
      setSaved(false);
      setIsOpen(false);
    }, 800);
  };

  return (
    <>
      {/* Persistent Floating Action Button (+) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#22C55E] text-[#071A12] flex items-center justify-center font-bold shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 gold-glow cursor-pointer"
        title="Global Quick Capture (+)"
      >
        <Plus className="w-6 h-6 stroke-[3]" />
      </button>

      {/* Quick Capture Drawer Modal */}
      <ModalDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Global Quick Capture"
        subtitle="Capture first. Organize later."
      >
        <form onSubmit={handleCapture} className="space-y-4 font-sans">
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'task', label: 'Task / MIT', icon: Target },
              { id: 'note', label: 'Note / Idea', icon: BookOpen },
              { id: 'expense', label: 'Expense', icon: Wallet },
              { id: 'habit', label: 'Habit Log', icon: Flame },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = type === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setType(item.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#22C55E]/20 border-[#22C55E] text-[#4ADE80]'
                      : 'bg-gray-900/60 border border-[#2B4D3E] text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Quick Record Content</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What deserves attention right now?"
              className="w-full bg-[#071A12] border border-[#2B4D3E] rounded-xl px-3.5 py-2.5 text-xs text-gray-100 focus:outline-none focus:border-[#22C55E]"
              autoFocus
              required
            />
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" disabled={saved}>
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>Progress Recorded!</span>
                </>
              ) : (
                'Save to Command Center'
              )}
            </Button>
          </div>
        </form>
      </ModalDrawer>
    </>
  );
};
