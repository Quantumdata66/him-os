'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { LearningService } from '@/domain/learning/service';
import { LearningItem, LearningType } from '@/domain/learning/types';

export default function LearningPage() {
  const [items, setItems] = useState<LearningItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [type, setType] = useState<LearningType>('book');
  const [pagesTotal, setPagesTotal] = useState(300);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    setItems(LearningService.getItems());
  };

  const handleProgressChange = (id: string, newRead: number) => {
    LearningService.updateProgress(id, newRead);
    loadItems();
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    LearningService.addItem({
      title,
      author: author || 'Unknown Author',
      type,
      status: 'in_progress',
      pagesTotal,
      pagesRead: 0,
      startedAt: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setAuthor('');
    setShowAdd(false);
    loadItems();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Learning Engine</h1>
            <Badge variant="gold">{items.length} Items</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Books, Courses, Certifications, Research Papers & German B1 Roadmap tracking.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : '+ Add Learning Item'}
        </Button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Add New Resource</h3>
          <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Title (e.g. Docker Deep Dive)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Author / Source"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <select
              value={type}
              onChange={(e: any) => setType(e.target.value)}
              className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            >
              <option value="book">Book</option>
              <option value="course">Course</option>
              <option value="certification">Certification</option>
              <option value="paper">Paper</option>
              <option value="flashcard_deck">Flashcard Deck</option>
            </select>
            <Button type="submit" variant="primary" size="sm">
              Save Resource
            </Button>
          </form>
        </Card>
      )}

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => {
          const pct = item.pagesTotal ? Math.min(100, Math.round(((item.pagesRead || 0) / item.pagesTotal) * 100)) : 0;

          return (
            <Card key={item.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="gold" className="uppercase text-[9px] mb-1">
                    {item.type}
                  </Badge>
                  <h3 className="text-base font-semibold text-gray-100">{item.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{item.author}</p>
                </div>
                <Badge variant={item.status === 'completed' ? 'green' : 'blue'}>{item.status}</Badge>
              </div>

              {item.pagesTotal && (
                <div className="space-y-2 pt-2 border-t border-gray-800/80">
                  <div className="flex justify-between text-xs text-gray-400 font-mono">
                    <span>
                      Progress: {item.pagesRead || 0} / {item.pagesTotal}
                    </span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#C9A84C] h-full transition-all" style={{ width: `${pct}%` }} />
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <span className="text-xs text-gray-400">Update Pages/Items:</span>
                    <input
                      type="number"
                      value={item.pagesRead || 0}
                      onChange={(e) => handleProgressChange(item.id, Number(e.target.value))}
                      className="w-20 bg-gray-900 border border-gray-800 rounded px-2 py-1 text-xs text-gray-100 font-mono focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
