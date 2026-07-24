'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { DecisionService } from '@/domain/decisions/service';
import { Decision } from '@/domain/decisions/types';

export default function DecisionsPage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [decisionText, setDecisionText] = useState('');
  const [reasoning, setReasoning] = useState('');
  const [assumptionInput, setAssumptionInput] = useState('');
  const [expectedOutcome, setExpectedOutcome] = useState('');

  // Review Modal state
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [actualOutcome, setActualOutcome] = useState('');
  const [lessons, setLessons] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDecisions(DecisionService.getDecisions());
  };

  const handleRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !decisionText.trim()) return;

    const assumptions = assumptionInput
      ? assumptionInput.split('\n').filter(Boolean)
      : ['Clean separation of concerns.'];

    DecisionService.recordDecision({
      title,
      context,
      decision: decisionText,
      reasoning,
      assumptions,
      expectedOutcome,
    });

    setTitle('');
    setContext('');
    setDecisionText('');
    setReasoning('');
    setAssumptionInput('');
    setExpectedOutcome('');
    setShowAdd(false);
    loadData();
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingId) return;

    DecisionService.reviewDecision(reviewingId, actualOutcome, lessons);
    setReviewingId(null);
    setActualOutcome('');
    setLessons('');
    loadData();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Decision Journal</h1>
            <Badge variant="gold">{decisions.length} Decisions Logged</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Record architectural and life decisions with assumptions to track how your thinking evolves over 5 years.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : '+ Record New Decision'}
        </Button>
      </div>

      {/* Record Decision Form */}
      {showAdd && (
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Log Architectural / Strategic Decision</h3>
          <form onSubmit={handleRecord} className="space-y-4">
            <input
              type="text"
              placeholder="Decision Title (e.g. Switch from REST to GraphQL)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none focus:border-[#C9A84C]"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={3}
                placeholder="What is the Context / Problem?"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
              />
              <textarea
                rows={3}
                placeholder="What did you decide? (Decision)"
                value={decisionText}
                onChange={(e) => setDecisionText(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={3}
                placeholder="Reasoning & Rationale"
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
              />
              <textarea
                rows={3}
                placeholder="Key Assumptions (One per line)"
                value={assumptionInput}
                onChange={(e) => setAssumptionInput(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Expected Outcome"
              value={expectedOutcome}
              onChange={(e) => setExpectedOutcome(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="primary">
              Save Decision Record
            </Button>
          </form>
        </Card>
      )}

      {/* Review Outcome Modal */}
      {reviewingId && (
        <Card goldBorder className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-serif font-semibold text-[#C9A84C]">Review Decision Outcome</h3>
            <Button variant="ghost" size="sm" onClick={() => setReviewingId(null)}>
              ✕ Cancel
            </Button>
          </div>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">What actually happened? (Actual Outcome)</label>
              <textarea
                rows={3}
                value={actualOutcome}
                onChange={(e) => setActualOutcome(e.target.value)}
                placeholder="Describe the real-world results..."
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">What lessons did you learn?</label>
              <textarea
                rows={3}
                value={lessons}
                onChange={(e) => setLessons(e.target.value)}
                placeholder="Core takeaways..."
                className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 focus:outline-none"
                required
              />
            </div>
            <Button type="submit" variant="primary">
              Complete Review
            </Button>
          </form>
        </Card>
      )}

      {/* Decisions List */}
      <div className="space-y-6">
        {decisions.map((dec) => (
          <Card key={dec.id} className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-gray-100">{dec.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Decided on {dec.decidedAt}</p>
              </div>
              <Badge variant={dec.reviewedAt ? 'green' : 'purple'}>
                {dec.reviewedAt ? 'Reviewed' : 'Review Pending'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-900/60 p-3 rounded border border-gray-800 space-y-1">
                <p className="font-semibold text-[#C9A84C]">Decision & Reasoning</p>
                <p className="text-gray-300 font-medium">{dec.decision}</p>
                <p className="text-gray-400 italic pt-1">{dec.reasoning}</p>
              </div>

              <div className="bg-gray-900/60 p-3 rounded border border-gray-800 space-y-1">
                <p className="font-semibold text-gray-300">Key Assumptions</p>
                <ul className="list-disc list-inside text-gray-400 space-y-0.5">
                  {dec.assumptions.map((asm, idx) => (
                    <li key={idx}>{asm}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Review Section */}
            {dec.reviewedAt ? (
              <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-xs space-y-1">
                <p className="font-semibold text-emerald-400">Actual Outcome & Lessons ({dec.reviewedAt})</p>
                <p className="text-gray-300">{dec.actualOutcome}</p>
                <p className="text-gray-400 italic">Lesson: {dec.lessons}</p>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setReviewingId(dec.id)}>
                Log Actual Outcome & Lessons →
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
