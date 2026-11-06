
import React, { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import NoteForm from '../components/NoteForm';
import NoteCard from '../components/NoteCard';

export default function Dashboard() {
  const { user } = useAuth();

  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'All',
    'Personal',
    'Study',
    'Project',
    'Work',
    'Activity'
  ];

  // Load notes
  async function loadNotes() {
    try {
      const { data } = await api.get('/notes');
      setNotes(data.notes || []);
      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not load notes.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  // Search and category filtering
  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        note.title?.toLowerCase().includes(searchText) ||
        note.content?.toLowerCase().includes(searchText);

      const matchesCategory =
        activeCategory === 'All' ||
        (note.category || 'Personal') === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [notes, search, activeCategory]);

  // Create or update note
  async function saveNote(values) {
    setSaving(true);
    setError('');

    try {
      if (editing) {
        await api.put(`/notes/${editing._id}`, values);
      } else {
        await api.post('/notes', values);
      }

      setShowForm(false);
      setEditing(null);
      setSelected(null);

      await loadNotes();
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not save note.'
      );
    } finally {
      setSaving(false);
    }
  }

  // Create note
  function startCreate() {
    setEditing(null);
    setSelected(null);
    setShowProfile(false);
    setShowForm(true);
  }

  // Edit note
  function editNote(note) {
    setSelected(null);
    setShowProfile(false);
    setEditing(note);
    setShowForm(true);
  }

  // Delete note
  async function deleteNote(id) {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      await api.delete(`/notes/${id}`);

      setNotes((current) =>
        current.filter((note) => note._id !== id)
      );

      if (selected?._id === id) {
        setSelected(null);
      }

      setError('');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Could not delete note.'
      );
    }
  }

  // Navigation
  function openNotes() {
    setShowForm(false);
    setEditing(null);
    setSelected(null);
    setShowProfile(false);
    setActiveCategory('All');
  }

  function openProfile() {
    setShowForm(false);
    setEditing(null);
    setSelected(null);
    setShowProfile(true);
  }

  return (
    <main className="workspace">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="sidebar-brand">
          <span className="sidebar-logo">▤</span>
          <span>Note<span>Space</span></span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">

          <button
            className={`sidebar-link ${
              !showForm && !showProfile ? 'active' : ''
            }`}
            onClick={openNotes}
          >
            <span>⌂</span>
            My Notes
          </button>

          <button
            className={`sidebar-link ${
              showForm ? 'active' : ''
            }`}
            onClick={startCreate}
          >
            <span>＋</span>
            Create Note
          </button>

          <button
            className={`sidebar-link ${
              showProfile ? 'active' : ''
            }`}
            onClick={openProfile}
          >
            <span>♙</span>
            Profile
          </button>

        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-storage">
            <span>YOUR NOTES</span>
            <strong>{notes.length} Notes</strong>
            <div className="storage-progress">
              <div
                style={{
                  width: `${Math.min(notes.length * 5, 100)}%`
                }}
              />
            </div>
          </div>

          <p>NoteSpace © 2026</p>
        </div>

      </aside>

      {/* Main Content */}
      <section className="workspace-main">

        {/* Dashboard topbar */}
        <header className="workspace-topbar">
          <div className="topbar-breadcrumb">
            Workspace <span>/</span> {
              showProfile
                ? 'Profile'
                : showForm
                  ? editing ? 'Edit Note' : 'Create Note'
                  : selected ? 'Note Details' : 'My Notes'
            }
          </div>

          <div className="topbar-user">
            <span className="topbar-greeting">
              Hi, {user?.name || 'User'}
            </span>

            <div className="topbar-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        <div className="workspace-content">

          {/* Error */}
          {error && (
            <div className="alert">
              {error}
              <button onClick={() => setError('')}>×</button>
            </div>
          )}

          {/* Profile */}
          {showProfile ? (
            <section className="profile-panel">
              <div className="section-heading">
                <div>
                  <span className="section-eyebrow">ACCOUNT SETTINGS</span>
                  <h1>My Profile</h1>
                  <p>View your account information.</p>
                </div>
              </div>

              <div className="profile-card">
                <div className="profile-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>

                <h2>{user?.name || 'User'}</h2>
                <p>{user?.email || 'No email available'}</p>

                <div className="profile-info">
                  <div>
                    <span>Full Name</span>
                    <strong>{user?.name || 'User'}</strong>
                  </div>

                  <div>
                    <span>Email Address</span>
                    <strong>{user?.email || 'Not available'}</strong>
                  </div>

                  <div>
                    <span>Total Notes</span>
                    <strong>{notes.length}</strong>
                  </div>
                </div>
              </div>
            </section>
          ) : selected ? (

            /* Note details */
            <section className="note-detail-page">
              <button
                className="back-btn"
                onClick={() => setSelected(null)}
              >
                ← Back to Notes
              </button>

              <div className="detail-panel">
                <span className="note-category">
                  {selected.category || 'Personal'}
                </span>

                <h1>{selected.title}</h1>

                <p className="detail-content">
                  {selected.content}
                </p>

                <small>
                  Created{' '}
                  {selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString()
                    : 'Recently'}
                </small>

                <div className="detail-actions">
                  <button
                    className="form-save-btn"
                    onClick={() => editNote(selected)}
                  >
                    Edit Note
                  </button>

                  <button
                    className="form-cancel-btn"
                    onClick={() => deleteNote(selected._id)}
                  >
                    Delete Note
                  </button>
                </div>
              </div>
            </section>

          ) : showForm ? (

            /* Create/Edit Note */
            <section className="form-page">
              <button
                className="back-btn"
                onClick={openNotes}
              >
                ← Back to Notes
              </button>

              <NoteForm
                initialNote={editing}
                onSave={saveNote}
                onCancel={openNotes}
                saving={saving}
              />
            </section>

          ) : (

            /* Main Dashboard */
            <>
              <section className="dashboard-heading">

                <div>
                  <span className="section-eyebrow">
                    YOUR PERSONAL SPACE
                  </span>

                  <h1>My Notes</h1>

                  <p>
                    Manage all your notes in one place.
                  </p>
                </div>

                <button
                  className="new-note-btn"
                  onClick={startCreate}
                >
                  ＋ New Note
                </button>

              </section>

              {/* Search and category filters */}
              <section className="notes-toolbar">

                <div className="search-box">
                  <span>⌕</span>

                  <input
                    type="search"
                    placeholder="Search your notes..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="category-filters">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={
                        activeCategory === category ? 'selected' : ''
                      }
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

              </section>

              {/* Notes heading */}
              <div className="list-heading">
                <div>
                  <h2>All Notes</h2>
                  <p>Your saved thoughts and ideas</p>
                </div>

                <span>
                  {filteredNotes.length} Notes
                </span>
              </div>

              {/* Loading */}
              {loading ? (
                <div className="empty">
                  <p>Loading your notes...</p>
                </div>

              ) : filteredNotes.length === 0 ? (

                /* Empty state */
                <div className="empty">
                  <div className="empty-icon">✎</div>

                  <h3>
                    {search || activeCategory !== 'All'
                      ? 'No matching notes'
                      : 'No notes yet'}
                  </h3>

                  <p>
                    {search || activeCategory !== 'All'
                      ? 'Try another search or category.'
                      : 'Start organizing your ideas by creating your first note.'}
                  </p>

                  {search || activeCategory !== 'All' ? (
                    <button
                      className="new-note-btn"
                      onClick={() => {
                        setSearch('');
                        setActiveCategory('All');
                      }}
                    >
                      Clear Filters
                    </button>
                  ) : (
                    <button
                      className="new-note-btn"
                      onClick={startCreate}
                    >
                      ＋ Create Your First Note
                    </button>
                  )}
                </div>

              ) : (

                /* Notes grid */
                <section className="notes-grid">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onEdit={editNote}
                      onDelete={deleteNote}
                      onOpen={setSelected}
                    />
                  ))}
                </section>

              )}
            </>
          )}

        </div>
      </section>

    </main>
  );
}
