
import React, { useEffect, useState } from 'react';

const categories = [
  'Personal',
  'Study',
  'Project',
  'Work',
  'Activity',
  'Other'
];

export default function NoteForm({
  initialNote,
  onSave,
  onCancel,
  saving
}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
    setCategory(initialNote?.category || 'Personal');
  }, [initialNote]);

  function submit(e) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    onSave({
      title: title.trim(),
      content: content.trim(),
      category
    });
  }

  return (
    <form className="note-form" onSubmit={submit}>

      <div className="note-form-heading">
        <div>
          <span className="form-eyebrow">
            YOUR PERSONAL SPACE
          </span>

          <h2>
            {initialNote ? 'Edit Note' : 'Create New Note'}
          </h2>

          <p>
            {initialNote
              ? 'Update your note and keep everything organized.'
              : 'Capture your thoughts, ideas and important information.'}
          </p>
        </div>

        <span className="form-icon">✎</span>
      </div>

      <div className="note-form-fields">

        <label className="note-field">
          <span>Note Title</span>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            required
            placeholder="Enter your note title..."
          />

          <small>{title.length}/120 characters</small>
        </label>

        <label className="note-field">
          <span>Note Content</span>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={7}
            required
            placeholder="Start writing your thoughts here..."
          />

          <small>{content.length} characters</small>
        </label>

        <label className="note-field">
          <span>Category</span>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

      </div>

      <div className="note-form-actions">

        <button
          type="button"
          className="form-cancel-btn"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="form-save-btn"
          disabled={saving || !title.trim() || !content.trim()}
        >
          {saving
            ? 'Saving...'
            : initialNote
              ? 'Update Note'
              : 'Save Note'}
        </button>

      </div>

    </form>
  );
}
