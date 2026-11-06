
import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <span className="hero-tag">ABOUT OUR PROJECT</span>
        <h1>Meet <span>NoteSpace.</span></h1>
        <p>
          A simple and organized digital space designed to help
          people manage their thoughts, ideas and important notes.
        </p>
      </section>

      <section className="about-content">
        <div className="about-card">
          <span className="about-icon">🎯</span>
          <h2>Our Purpose</h2>
          <p>
            NoteSpace aims to make note management easy and accessible.
            Users can create, update, search, categorize and delete
            their notes from one organized dashboard.
          </p>
        </div>

        <div className="about-card">
          <span className="about-icon">💡</span>
          <h2>Why NoteSpace?</h2>
          <p>
            Important ideas can get lost in scattered places.
            NoteSpace provides one convenient place to keep personal
            thoughts, study material, project ideas and daily tasks.
          </p>
        </div>
      </section>

      <section className="technology-section">
        <h2>Technologies We Use</h2>
        <p>Built using the MERN Stack.</p>

        <div className="tech-grid">
          <div className="tech-card">
            <strong>MongoDB</strong>
            <span>Database</span>
          </div>
          <div className="tech-card">
            <strong>Express.js</strong>
            <span>Backend Framework</span>
          </div>
          <div className="tech-card">
            <strong>React.js</strong>
            <span>Frontend Library</span>
          </div>
          <div className="tech-card">
            <strong>Node.js</strong>
            <span>Runtime Environment</span>
          </div>
        </div>
      </section>

      <section className="info-cta">
        <h2>Your ideas deserve a space.</h2>
        <p>Start organizing your thoughts with NoteSpace today.</p>
        <Link to="/register" className="hero-primary-btn">
          Get Started →
        </Link>
      </section>
    </main>
  );
}
