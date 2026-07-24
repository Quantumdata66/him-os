export type NoteType = 'idea' | 'journal' | 'meeting' | 'tech' | 'general';

export interface Note {
  id: string;
  title: string;
  contentMd: string;
  type: NoteType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
