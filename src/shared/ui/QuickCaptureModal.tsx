'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { ModalDrawer } from './ModalDrawer';
import { Button } from './Button';

export const QuickCaptureModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'task' | 'note' | 'decision'>('task');
  const [title, setTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setTitle('');
      setSubmitted(false);
      setIsOpen(false);
    }, 600);
  };

  return (
    <>
      {/* Mobile FAB Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Universal Quick Capture (Ctrl+Shift+C)"
        className="lg:hidden fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-accent-emerald text-bg-primary shadow-xl hover:bg-accent-mint focus:outline-none focus:ring-2 focus:ring-accent-mint active:scale-95 transition-all duration-150"
      >
        <Plus className="w-5 h-5 font-bold" />
      </button>

      <ModalDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Universal Executive Quick Capture"
        subtitle="Shortcut: Ctrl+Shift+C"
      >
        <form onSubmit={handleSubmit} className="space-y-4 font-sans">
          <div className="flex items-center space-x-2">
            {(['task', 'note', 'decision'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-mono font-medium uppercase tracking-wider transition-all ${
                  type === t
                    ? 'bg-accent-emerald/20 text-accent-mint border border-accent-emerald'
                    : 'bg-bg-elevated text-text-muted hover:text-text-primary border border-border-subtle'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder={`Enter ${type} title...`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl bg-bg-elevated border border-border-subtle text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-emerald focus:ring-2 focus:ring-accent-mint transition-all duration-150"
          />

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={!title.trim() || submitted}>
              {submitted ? (
                <>
                  <Check className="w-3.5 h-3.5 text-bg-primary mr-1" /> Captured!
                </>
              ) : (
                'Capture'
              )}
            </Button>
          </div>
        </form>
      </ModalDrawer>
    </>
  );
};
