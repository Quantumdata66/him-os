'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { MonthlyReviewService } from '@/domain/execution/monthly/service';
import { MonthlyReview } from '@/domain/execution/monthly/types';

export default function MonthlyReviewPage() {
  const [review, setReview] = useState<MonthlyReview | null>(null);
  const [savedMsg, setSavedMsg] = useState('');

  useEffect(() => {
    setReview(MonthlyReviewService.getReview());
  }, []);

  if (!review) return <div className="text-gray-400 p-8">Loading Monthly Review...</div>;

  const handleSave = () => {
    MonthlyReviewService.saveReview(review);
    setSavedMsg('Monthly Review Saved! ✨');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Monthly Execution Review</h1>
            <Badge variant="gold">Month: {review.month}/{review.year}</Badge>
          </div>
          <p className="text-xs text-gray-400">Wins → Failures → Lessons → Targets Next Month</p>
        </div>
        <div className="flex items-center space-x-3">
          {savedMsg && <span className="text-xs text-emerald-400">{savedMsg}</span>}
          <Button variant="primary" onClick={handleSave}>
            Save Monthly Review
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Major Monthly Wins</h3>
          <textarea
            rows={4}
            value={review.wins}
            onChange={(e) => setReview({ ...review, wins: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
          />
        </Card>

        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Failures & Misses</h3>
          <textarea
            rows={4}
            value={review.failures}
            onChange={(e) => setReview({ ...review, failures: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
          />
        </Card>

        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Core Lessons Learned</h3>
          <textarea
            rows={4}
            value={review.lessons}
            onChange={(e) => setReview({ ...review, lessons: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
          />
        </Card>

        <Card className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Goals & Targets Next Month</h3>
          <textarea
            rows={4}
            value={review.goalsNextMonth}
            onChange={(e) => setReview({ ...review, goalsNextMonth: e.target.value })}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
          />
        </Card>
      </div>
    </div>
  );
}
