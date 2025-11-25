import React from "react";

export default function NoteList({ notes = [], onEdit, onDelete }) {
  if (!notes.length) return <div>No notes yet.</div>;
  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <div key={n.id} className="bg-white p-3 rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold">{n.title}</div>
              <div className="text-sm text-gray-600">{n.content}</div>
              <div className="text-xs text-gray-400 mt-2">
                Created: {new Date(n.created_at).toLocaleString()}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => onEdit(n)}
                className="px-2 py-1 border rounded"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Delete note?")) onDelete(n.id);
                }}
                className="px-2 py-1 border rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
