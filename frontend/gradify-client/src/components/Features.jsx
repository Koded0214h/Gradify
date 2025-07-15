const styles = {
  section: {
    width: '100%',
    background: 'var(--background)',
    color: 'var(--textPrimary)',
    padding: '3rem 1rem',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    maxWidth: '900px',
    width: '100%',
  },
  card: {
    background: 'white',
    color: 'var(--textPrimary)',
    borderRadius: '1.25rem',
    boxShadow: '0 2px 12px rgba(37,99,235,0.07)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
    cursor: 'pointer',
    border: '1.5px solid var(--primaryAccent)',
  },
  cardHover: {
    transform: 'scale(1.035)',
    boxShadow: '0 6px 24px rgba(37,99,235,0.13)',
  },
  emoji: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  heading: {
    fontWeight: 700,
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: 'var(--primaryAccent)',
    textAlign: 'center',
  },
  desc: {
    fontSize: '1rem',
    textAlign: 'center',
    color: 'var(--textPrimary)',
    opacity: 0.85,
  },
  '@media (max-width: 800px)': {
    grid: {
      gridTemplateColumns: '1fr',
      gap: '1.25rem',
    },
    card: {
      padding: '1.5rem 1rem',
    },
  },
};

import { useState } from 'react';

function FeatureCard({ emoji, heading, desc }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        ...styles.card,
        ...(hover ? styles.cardHover : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.emoji}>{emoji}</div>
      <div style={styles.heading}>{heading}</div>
      <div style={styles.desc}>{desc}</div>
    </div>
  );
}

function getResponsiveStyle(base, key) {
  if (typeof window !== 'undefined' && window.innerWidth <= 800 && styles['@media (max-width: 800px)'][key]) {
    return { ...base, ...styles['@media (max-width: 800px)'][key] };
  }
  return base;
}

function Features() {
  return (
    <section style={styles.section}>
      <div style={getResponsiveStyle(styles.grid, 'grid')}>
        <FeatureCard
          emoji="📥"
          heading="One-Click Uploads"
          desc="Students can submit assignments instantly with zero confusion."
        />
        <FeatureCard
          emoji="📊"
          heading="Deadline Tracking"
          desc="Visual overview of all due dates — never miss a thing."
        />
        <FeatureCard
          emoji="🔔"
          heading="Smart Alerts"
          desc="Stay notified on submissions, feedback, and new tasks."
        />
      </div>
    </section>
  );
}

export default Features; 