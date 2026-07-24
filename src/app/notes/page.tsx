'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { NoteService } from '@/domain/notes/service';
import { Note, NoteType } from '@/domain/notes/types';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [contentMd, setContentMd] = useState('');
  const [type, setType] = useState<NoteType>('tech');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    setNotes(NoteService.getNotes());
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput ? tagsInput.split(',').map((t) => t.trim()) : ['General'];

    NoteService.createNote({
      title,
      contentMd,
      type,
      tags,
    });

    setTitle('');
    setContentMd('');
    setTagsInput('');
    setShowAdd(false);
    loadNotes();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between pb-6 border-b border-gray-800">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h1 className="text-3xl font-serif font-bold text-gray-100">Knowledge Base & Notes</h1>
            <Badge variant="gold">{notes.length} Notes</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Markdown architecture notes, ideas, meeting records & engineering snippets.
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? 'Cancel' : '+ New Note'}
        </Button>
      </div>

      {/* Note Form */}
      {showAdd && (
        <Card goldBorder className="space-y-4">
          <h3 className="text-base font-serif font-semibold text-gray-100">Create Knowledge Note</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="sm:col-span-2 bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
                required
              />
              <select
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
              >
                <option value="tech">Tech Architecture</option>
                <option value="idea">Idea</option>
                <option value="journal">Journal</option>
                <option value="meeting">Meeting</option>
                <option value="general">General</option>
              </select>
            </div>
            <textarea
              rows={5}
              placeholder="Markdown Content (# Title, - Points)"
              value={contentMd}
              onChange={(e) => setContentMd(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg p-3 text-xs text-gray-100 font-mono focus:outline-none"
            />
            <input
              type="text"
              placeholder="Tags (Comma separated: FastAPI, Docker, Architecture)"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-gray-100 focus:outline-none"
            />
            <Button type="submit" variant="primary">
              Save Note
            </Button>
          </form>
        </Card>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="gold" className="uppercase text-[9px]">
                  {note.type}
                </Badge>
                <span className="text-[10px] text-gray-500 font-mono">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-200 mb-2">{note.title}</h3>
              <p className="text-xs text-gray-400 font-mono whitespace-pre-wrap line-clamp-4 bg-gray-900/50 p-2.5 rounded border border-gray-800/60">
                {note.contentMd}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-800/60">
              {note.tags.map((tag) => (
                <span key={tag} className="text-[9px] bg-gray-900 text-gray-400 px-2 py-0.5 rounded border border-gray-800 font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
