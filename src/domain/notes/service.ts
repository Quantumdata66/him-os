import { StorageAdapter } from '@/core/storage/localStorageAdapter';
import { Note } from './types';

const STORAGE_KEY = 'notes';

const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'FastAPI Microservices & Async Task Patterns',
    contentMd: '# FastAPI Architecture\n- Use Async SQLAlchemy sessions\n- Event-driven background tasks with Celery/Redis\n- Pydantic v2 schemas for strict serialization',
    type: 'tech',
    tags: ['FastAPI', 'Backend', 'Python'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'note-[#2]',
    title: 'Quantum Jersey Brand Expansion Strategy',
    contentMd: '# QJ Strategy\n- Direct to Consumer (D2C) online catalog\n- High quality sportswear manufacturing partnership\n- Automated inventory sync',
    type: 'idea',
    tags: ['QuantumJersey', 'Business', 'D2C'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class NoteService {
  static getNotes(): Note[] {
    const notes = StorageAdapter.getItem<Note[]>(STORAGE_KEY, []);
    if (notes.length === 0) {
      StorageAdapter.setItem(STORAGE_KEY, INITIAL_NOTES);
      return INITIAL_NOTES;
    }
    return notes;
  }

  static createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const notes = this.getNotes();
    const newNote: Note = {
      ...note,
      id: typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    notes.unshift(newNote);
    StorageAdapter.setItem(STORAGE_KEY, notes);
    return newNote;
  }
}
