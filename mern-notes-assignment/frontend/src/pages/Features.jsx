
import React from 'react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: '✍️',
    title: 'Create Notes',
    description: 'Quickly create and save notes for your ideas, tasks and important information.',
  },
  {
    icon: '🔍',
    title: 'Quick Search',
    description: 'Find your saved notes easily by searching their titles or content.',
  },
  {
    icon: '📁',
    title: 'Categories',
    description: 'Organize notes into Personal, Study, Project, Work and other categories.',
  },
  {
    icon: '🔒',
    title: 'Secure Account',
    description: 'Your account is protected with authentication so users can access their own notes.',
  },
  {
    icon: '📝',
    title: 'Edit Notes',
    description: 'Update your existing notes whenever your ideas or plans change.',
  },
  {
    icon: '🗑️',
    title: 'Delete Notes',
    description: 'Remove notes that you no longer need from your collection.',
  },
];

export default function Features() {
  return (
    <main className="info-page">
      <section className="info-hero">
        <span className="hero-tag">WHAT NOTE SPACE OFFERS</span>
        <h1>Powerful Features, <span>Simple Experience.</span></h1>
        <p>
          Everything you need to create, organize, search and manage
          your personal notes in one place.
        </p>
      </section>

      <section className="features-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="info-cta">
        <h2>Ready to organize your thoughts?</h2>
        <p>Start creating your personal notes with NoteSpace.</p>
        <Link to="/register" className="hero-primary-btn">
          Create Your Account →
        </Link>
      </section>
    </main>
  );
}
