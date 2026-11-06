
import React from 'react';

export default function NoteCard({ note, onEdit, onDelete, onOpen }) {
  const updatedDate = note.updatedAt
    ? new Date(note.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      })
    : 'Recently';

  const category = note.category || 'Personal';

  return (
    <article className="note-card">

      <div className="note-card-top">
        <span className="note-category">
          {category}
        </span>

        <span className="note-date">
          {updatedDate}
        </span>
      </div>

      <button
        type="button"
        className="note-open"
        onClick={() => onOpen(note)}
      >
        <h3>{note.title}</h3>

        <p>{note.content}</p>
      </button>

      <div className="note-card-footer">

        <span className="note-footer-label">
          Updated recently
        </span>

        <div className="note-actions">

          <button
            type="button"
            className="note-action edit-action"
            title="Edit note"
            onClick={() => onEdit(note)}
          >
            ✎
          </button>

          <button
            type="button"
            className="note-action delete-action"
            title="Delete note"
            onClick={() => onDelete(note._id)}
          >
            ♲
          </button>

        </div>
      </div>

    </article>
  );
}
