'use client';

import React, { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

interface GraphNode {
  id: string;
  label: string;
  category: 'architecture' | 'decision' | 'career' | 'skill' | 'project';
  connections: string[];
}

const GRAPH_NODES: GraphNode[] = [
  { id: 'n1', label: 'FastAPI Microservices', category: 'architecture', connections: ['n2', 'n4', 'n5'] },
  { id: 'n2', label: 'Next.js App Router', category: 'architecture', connections: ['n1', 'n3', 'n6'] },
  { id: 'n3', label: 'Notion/Obsidian Workspace', category: 'architecture', connections: ['n2', 'n4'] },
  { id: 'n4', label: 'Feature-Driven Architecture', category: 'decision', connections: ['n1', 'n2'] },
  { id: 'n5', label: 'Market Readiness Pipeline', category: 'career', connections: ['n1', 'n6'] },
  { id: 'n6', label: 'Skills Matrix (Docker/FastAPI)', category: 'skill', connections: ['n2', 'n5'] },
];

export default function KnowledgeGraphPage() {
  const [activeNode, setActiveNode] = useState<GraphNode>(GRAPH_NODES[0]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Knowledge & Architecture Graph</h1>
            <Badge variant="gold">Obsidian Visualizer</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Visual backlink graph connecting notes, architecture decisions, projects, and verified skills.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.location.assign('/workspace')}>
          ← Back to Workspace
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Node Visualizer Canvas */}
        <Card goldBorder className="lg:col-span-2 space-y-4 min-h-[420px] flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <span className="text-xs font-mono text-gray-400">Interactive Node Canvas</span>
            <Badge variant="green" className="text-[9px]">{GRAPH_NODES.length} Active Nodes</Badge>
          </div>

          {/* Graph Nodes Grid Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-8">
            {GRAPH_NODES.map((node) => {
              const isSelected = node.id === activeNode.id;
              const isConnected = activeNode.connections.includes(node.id);

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer text-center flex flex-col items-center justify-center space-y-2 ${
                    isSelected
                      ? 'bg-[#C9A84C]/20 border-[#C9A84C] text-gray-100 scale-105 shadow-lg shadow-[#C9A84C]/10'
                      : isConnected
                      ? 'bg-emerald-950/30 border-emerald-500/50 text-gray-200'
                      : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      node.category === 'architecture'
                        ? 'bg-blue-400'
                        : node.category === 'decision'
                        ? 'bg-[#C9A84C]'
                        : node.category === 'career'
                        ? 'bg-purple-400'
                        : 'bg-emerald-400'
                    }`}
                  />
                  <p className="text-xs font-semibold leading-snug">{node.label}</p>
                  {isConnected && <span className="text-[9px] text-emerald-400 font-mono">Linked</span>}
                </div>
              );
            })}
          </div>

          <div className="text-[10px] text-gray-500 text-center font-mono pt-2 border-t border-gray-800">
            Click any node to inspect bidirectionally linked architecture records.
          </div>
        </Card>

        {/* Node Inspector Drawer */}
        <Card className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-sm font-serif font-semibold text-gray-100">Node Inspector</h3>
              <Badge variant="purple" className="uppercase text-[8px]">
                {activeNode.category}
              </Badge>
            </div>

            <div className="space-y-3 pt-4">
              <div>
                <span className="text-[10px] font-mono text-gray-500 block uppercase">Selected Entity</span>
                <h4 className="text-base font-bold text-gray-100 mt-0.5">{activeNode.label}</h4>
              </div>

              <div>
                <span className="text-[10px] font-mono text-gray-500 block uppercase">Bidirectional Links ({activeNode.connections.length})</span>
                <div className="space-y-1.5 mt-2">
                  {activeNode.connections.map((targetId) => {
                    const linked = GRAPH_NODES.find((n) => n.id === targetId);
                    return (
                      <div key={targetId} className="p-2 bg-gray-900 rounded border border-gray-800 flex items-center space-x-2 text-xs text-[#C9A84C]">
                        <span>🔗</span>
                        <span className="font-medium">{linked?.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => window.location.assign('/workspace')}>
            Open Node in Editor
          </Button>
        </Card>
      </div>
    </div>
  );
}
