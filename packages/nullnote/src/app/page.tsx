'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Editor } from '@/components/Editor';
import { mockNotebooks, mockNotes } from '@/lib/mockData';
import type { Note, Notebook } from '@/lib/types';

export default function NotebookApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notebooks, setNotebooks] = useState<Notebook[]>(mockNotebooks);
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [selectedNotebook, setSelectedNotebook] = useState<string | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => {
    const matchesNotebook = !selectedNotebook || note.notebookId === selectedNotebook;
    const matchesSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesNotebook && matchesSearch;
  });

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      notebookId: selectedNotebook || notebooks[0].id,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
    ));
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, ...updates });
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(null);
    }
  };

  const handleCreateNotebook = (name: string) => {
    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name,
      color: '#6366f1',
    };
    setNotebooks([...notebooks, newNotebook]);
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Sidebar
          notebooks={notebooks}
          notes={filteredNotes}
          selectedNotebook={selectedNotebook}
          selectedNote={selectedNote}
          searchQuery={searchQuery}
          theme={theme}
          onNotebookSelect={setSelectedNotebook}
          onNoteSelect={setSelectedNote}
          onSearchChange={setSearchQuery}
          onThemeToggle={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          onCreateNote={handleCreateNote}
          onCreateNotebook={handleCreateNotebook}
        />
        <Editor
          note={selectedNote}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
        />
      </div>
    </div>
  );
}

