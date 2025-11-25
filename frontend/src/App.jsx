import React, { useEffect, useState } from "react";
import { listNotes, createNote, updateNote, deleteNote } from "./api";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);
      const data = await listNotes();
      setNotes(data);
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function onCreate(payload) {
    await createNote(payload);
    fetchNotes();
  }

  async function onUpdate(id, payload) {
    await updateNote(id, payload);
    setEditing(null);
    fetchNotes();
  }

  async function onDelete(id) {
    await deleteNote(id);
    fetchNotes();
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Notes</h1>
        <NoteForm onCreate={onCreate} editing={editing} onUpdate={onUpdate} />
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}
        <NoteList notes={notes} onEdit={setEditing} onDelete={onDelete} />
      </div>
    </div>
  );
}
