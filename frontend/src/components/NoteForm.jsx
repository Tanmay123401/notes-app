import React, { useState, useEffect } from "react";

export default function NoteForm({ onCreate, editing, onUpdate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title || "");
      setContent(editing.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [editing]);

  function submit(e) {
    e.preventDefault();
    const payload = { title, content };
    if (editing) {
      onUpdate(editing.id, payload);
    } else {
      onCreate(payload);
    }
  }

  return (
    <form onSubmit={submit} className="mb-4 bg-white p-4 rounded shadow">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 border rounded mb-2"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={4}
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          {editing ? "Update" : "Create"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              // clear editing
              onUpdate && onUpdate(null, null); // harmless
              window.location.reload(); // cheap way to clear state
            }}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
