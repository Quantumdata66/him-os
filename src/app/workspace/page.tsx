'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface DocumentNote {
  id: string;
  title: string;
  category: 'architecture' | 'career' | 'systems' | 'journal';
  content: string;
  updatedAt: string;
}

const INITIAL_DOCS: DocumentNote[] = [
  {
    id: 'doc-1',
    title: 'FastAPI Microservice Architecture',
    category: 'architecture',
    content: `# FastAPI Microservice Architecture Blueprint

## Core Objectives
- Decouple domain layer from Next.js framework
- Async SQLAlchemy database sessions with Pydantic v2 schemas
- Integrated with [[Project HIM OS]] domain event bus

## Endpoints
- \`/api/v1/github/commits\`: Live commit tracker
- \`/api/v1/weather/current\`: Morning execution weather
- \`/api/v1/resume/generate\`: CV Auto-builder

## Lessons & Key Learnings
Check [[Decision Journal]] for complete architectural justification.`,
    updatedAt: new Date().toISOString().split('T')[0],
  },
  {
    id: 'doc-2',
    title: 'Career Engine Roadmap',
    category: 'career',
    content: `# 5-Year Backend & MLOps Engineer Roadmap

## Objectives
- Master FastAPI, Docker, Kubernetes, PostgreSQL
- Reach 85%+ Market Readiness score in [[Career Engine]]
- Goethe B1 German Language certification

## Target Milestones
1. Build 5 production projects
2. Verify 8 core skills in [[Skills Matrix]]
3. Deploy portfolio to Vercel`,
    updatedAt: new Date().toISOString().split('T')[0],
  },
];

export default function WorkspacePage() {
  const [docs, setDocs] = useState<DocumentNote[]>(INITIAL_DOCS);
  const [activeDocId, setActiveDocId] = useState<string>('doc-1');
  const [content, setContent] = useState<string>(INITIAL_DOCS[0].content);
  const [title, setTitle] = useState<string>(INITIAL_DOCS[0].title);
  const [previewMode, setPreviewMode] = useState<'split' | 'edit' | 'preview'>('split');

  const handleSelectDoc = (doc: DocumentNote) => {
    setActiveDocId(doc.id);
    setTitle(doc.title);
    setContent(doc.content);
  };

  const handleSaveDoc = () => {
    const updated = docs.map((d) =>
      d.id === activeDocId
        ? { ...d, title, content, updatedAt: new Date().toISOString().split('T')[0] }
        : d
    );
    setDocs(updated);
    alert('Document Saved to Workspace Studio! 📓');
  };

  const handleNewDoc = () => {
    const newDoc: DocumentNote = {
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      title: 'Untitled Document Note',
      category: 'architecture',
      content: '# New Workspace Note\n\nStart typing markdown here...',
      updatedAt: new Date().toISOString().split('T')[0],
    };

    setDocs([newDoc, ...docs]);
    handleSelectDoc(newDoc);
  };

  // Backlinking Parser: Finds [[WikiLinks]] in markdown content
  const parseBacklinks = (mdText: string): string[] => {
    const regex = /\[\[(.*?)\]\]/g;
    const matches: string[] = [];
    let match;
    while ((match = regex.exec(mdText)) !== null) {
      matches.push(match[1]);
    }
    return matches;
  };

  const backlinks = parseBacklinks(content);

  // Render Markdown preview with styled [[WikiLinks]]
  const renderFormattedMarkdown = (text: string) => {
    const parts = text.split(/(\[\[.*?\]\])/g);
    return parts.map((part, idx) => {
      if (part.startsWith('[[') && part.endsWith(']]')) {
        const linkTitle = part.slice(2, -2);
        return (
          <span
            key={idx}
            className="inline-flex items-center px-2 py-0.5 rounded-lg bg-intel-sapphire/20 border border-intel-sapphire/40 text-intel-slate font-semibold cursor-pointer text-xs mx-0.5 font-mono"
            onClick={() => alert(`Backlink Target: ${linkTitle}`)}
          >
            🔗 {linkTitle}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-text-primary">Notion / Obsidian Workspace Studio</h1>
            <Badge variant="intel">v3.0 Companion</Badge>
          </div>
          <p className="text-xs text-text-muted font-mono">
            Split-pane Markdown editor with [[WikiLink]] backlinking and global spotlight search.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-bg-surface border border-border-subtle rounded-xl p-1 flex space-x-1 text-xs font-mono">
            <button
              onClick={() => setPreviewMode('split')}
              className={`px-3 py-1 rounded-lg transition-colors ${previewMode === 'split' ? 'bg-accent-emerald text-bg-primary font-bold' : 'text-text-muted'}`}
            >
              Split View
            </button>
            <button
              onClick={() => setPreviewMode('edit')}
              className={`px-3 py-1 rounded-lg transition-colors ${previewMode === 'edit' ? 'bg-accent-emerald text-bg-primary font-bold' : 'text-text-muted'}`}
            >
              Editor Only
            </button>
            <button
              onClick={() => setPreviewMode('preview')}
              className={`px-3 py-1 rounded-lg transition-colors ${previewMode === 'preview' ? 'bg-accent-emerald text-bg-primary font-bold' : 'text-text-muted'}`}
            >
              Preview Only
            </button>
          </div>
          <Button variant="primary" onClick={handleSaveDoc}>
            Save Document
          </Button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document Sidebar List */}
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-serif font-semibold text-text-primary">Documents ({docs.length})</h3>
            <Button variant="ghost" size="sm" onClick={handleNewDoc}>
              + New Doc
            </Button>
          </div>

          <div className="space-y-2">
            {docs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectDoc(doc)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  doc.id === activeDocId
                    ? 'bg-intel-sapphire/20 border-intel-slate text-text-primary'
                    : 'bg-bg-elevated border-border-subtle text-text-muted hover:border-accent-emerald'
                }`}
              >
                <p className="text-xs font-semibold truncate">{doc.title}</p>
                <div className="flex justify-between items-center mt-1">
                  <Badge variant="intel" className="text-[8px] uppercase">
                    {doc.category}
                  </Badge>
                  <span className="text-[9px] font-mono text-text-muted">{doc.updatedAt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Backlinks Explorer */}
          {backlinks.length > 0 && (
            <div className="pt-3 border-t border-border-subtle space-y-2">
              <span className="text-xs font-semibold text-text-secondary">Detected Backlinks ({backlinks.length})</span>
              <div className="space-y-1">
                {backlinks.map((link, idx) => (
                  <div key={idx} className="p-2 bg-bg-subtle rounded-xl border border-border-subtle text-[10px] text-intel-slate font-mono">
                    🔗 [[{link}]]
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* Workspace Canvas (Split / Edit / Preview) */}
        <Card variant="intel" className="lg:col-span-3 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-xl font-serif font-bold text-text-primary border-b border-border-subtle pb-2 focus:outline-none focus:border-accent-emerald"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[500px]">
            {/* Editor Pane */}
            {(previewMode === 'split' || previewMode === 'edit') && (
              <div className={`space-y-2 ${previewMode === 'edit' ? 'md:col-span-2' : ''}`}>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Markdown Source Editor</span>
                <textarea
                  rows={22}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full bg-bg-surface border border-border-subtle rounded-xl p-4 text-xs font-mono text-text-primary focus:outline-none focus:border-accent-emerald leading-relaxed resize-none"
                />
              </div>
            )}

            {/* Preview Pane */}
            {(previewMode === 'split' || previewMode === 'preview') && (
              <div className={`space-y-2 ${previewMode === 'preview' ? 'md:col-span-2' : ''}`}>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">Live Render Preview</span>
                <div className="w-full h-full bg-bg-surface border border-border-subtle rounded-xl p-4 text-xs text-text-primary font-sans leading-relaxed overflow-y-auto whitespace-pre-wrap">
                  {renderFormattedMarkdown(content)}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
