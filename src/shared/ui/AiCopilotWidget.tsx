'use client';

import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Sparkles, ChevronDown, ChevronUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AiCopilotService, AiCopilotAnalysis } from '@/core/ai/aiCopilot';

export const AiCopilotWidget: React.FC = () => {
  const [analysis, setAnalysis] = useState<AiCopilotAnalysis | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    setAnalysis(AiCopilotService.generateAnalysis());
  }, []);

  if (!analysis) return null;

  return (
    <Card goldBorder className="space-y-4 bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#09090B]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#C9A84C]/20 border border-[#C9A84C]/50 flex items-center justify-center text-[#C9A84C]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold text-gray-100">AI Engineering Copilot</h3>
            <p className="text-[10px] text-[#C9A84C] font-mono">Real-Time Strategic Analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="gold" className="text-[10px]">Copilot Active</Badge>
          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <>
                <span>Collapse</span>
                <ChevronUp className="w-3.5 h-3.5 ml-1" />
              </>
            ) : (
              <>
                <span>Analyze</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="bg-gray-900/80 p-3.5 rounded-lg border border-gray-800 space-y-2">
        <p className="text-xs font-semibold text-gray-200">{analysis.greeting}</p>
        <p className="text-xs text-gray-400 leading-relaxed">{analysis.overallAssessment}</p>
        <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-2 text-[#C9A84C]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="font-medium">{analysis.focusPromptToday}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="space-y-3 pt-2 animate-in fade-in duration-200">
          <span className="text-xs font-serif font-semibold text-gray-200 block">AI Strategic Recommendations</span>
          <div className="space-y-2">
            {analysis.suggestions.map((sug) => (
              <div
                key={sug.id}
                className="p-3 bg-gray-950/60 rounded-lg border border-gray-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold text-gray-100">{sug.title}</span>
                    <Badge variant="purple" className="text-[8px] uppercase">
                      {sug.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{sug.recommendation}</p>
                </div>
                {sug.actionUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[10px] whitespace-nowrap"
                    onClick={() => window.location.assign(sug.actionUrl!)}
                  >
                    <span>Action</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
