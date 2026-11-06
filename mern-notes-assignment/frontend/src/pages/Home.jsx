
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">
            ✨ Your Personal Note Management Space
          </span>

          <h1>
            Your Thoughts,
            <span> Your Space.</span>
          </h1>

          <p>
            Capture your ideas, organize your thoughts, and manage
            everything in one place. NoteSpace makes note-taking
            simple, smart, and secure.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="hero-primary-btn">
              Get Started →
            </Link>

            <Link to="/features" className="hero-secondary-btn">
              Explore Features
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <h3>Easy</h3>
              <span>Note Management</span>
            </div>
            <div>
              <h3>Secure</h3>
              <span>Personal Accounts</span>
            </div>
            <div>
              <h3>Fast</h3>
              <span>Quick Access</span>
            </div>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-header">
              <div className="preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>NoteSpace Dashboard</span>
            </div>

            <div className="preview-body">
              <div className="preview-sidebar">
                <h3>NoteSpace</h3>
                <p>▣ All Notes</p>
                <p>♧ Personal</p>
                <p>▤ Study</p>
                <p>◈ Projects</p>
              </div>

              <div className="preview-notes">
                <h3>My Notes</h3>
                <p>Your ideas, all in one place.</p>

                <div className="preview-note-grid">
                  <div className="preview-note purple">
                    <span>PERSONAL</span>
                    <h4>My Daily Goals</h4>
                    <p>Plan your day and stay productive.</p>
                  </div>

                  <div className="preview-note blue">
                    <span>STUDY</span>
                    <h4>Learning Notes</h4>
                    <p>Keep important concepts organized.</p>
                  </div>

                  <div className="preview-note pink">
                    <span>PROJECT</span>
                    <h4>Project Ideas</h4>
                    <p>Save your creative ideas.</p>
                  </div>

                  <div className="preview-note green">
                    <span>WORK</span>
                    <h4>Important Tasks</h4>
                    <p>Remember what matters most.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="floating-label">
            ✨ Organize your thoughts
          </div>
        </div>
      </section>

      <section className="home-bottom">
        <h2>Everything you need to stay organized.</h2>
        <p>
          One simple space for your notes, ideas, and everyday thoughts.
        </p>

        <Link to="/features" className="text-link">
          Discover all features →
        </Link>
      </section>
    </main>
  );
}
