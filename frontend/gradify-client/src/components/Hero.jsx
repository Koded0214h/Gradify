import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  root: {
    minHeight: '100vh',
    width: '100vw',
    boxSizing: 'border-box',
    background: 'var(--background)',
    color: 'var(--textPrimary)',
    fontFamily: 'system-ui, sans-serif',
    padding: '0',
    margin: '0',
    position: 'relative',
    transition: 'background 0.3s, color 0.3s',
  },
  registerBtn: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    background: 'var(--primaryAccent)',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    padding: '0.75rem 2rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    zIndex: 10,
    transition: 'background 0.2s',
  },
  header: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '6rem 2rem 2.5rem 2rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
    color: 'var(--primaryAccent)',
    letterSpacing: '-1px',
  },
  paragraph: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: 'var(--textPrimary)',
    opacity: 0.92,
    marginBottom: '0',
  },
  stack: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    maxWidth: '900px',
    margin: '2rem auto 0 auto',
    padding: '2rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  block: {
    flex: '1 1 260px',
    minWidth: '240px',
    maxWidth: '320px',
    background: 'rgba(0, 102, 204, 0.07)',
    borderRadius: '1.5rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    padding: '2rem 1.5rem',
    margin: '0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'background 0.3s',
  },
  emoji: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  blockTitle: {
    fontWeight: 700,
    fontSize: '1.25rem',
    marginBottom: '0.5rem',
    color: 'var(--primaryAccent)',
  },
  blockDesc: {
    fontSize: '1.05rem',
    color: 'var(--textPrimary)',
    opacity: 0.88,
    fontWeight: 500,
  },
  '@media (max-width: 800px)': {
    stack: {
      flexDirection: 'column',
      gap: '1.25rem',
      padding: '1rem',
    },
    block: {
      maxWidth: '100%',
      minWidth: '0',
      padding: '1.5rem 1rem',
    },
    header: {
      padding: '4rem 1rem 1.5rem 1rem',
    },
    heading: {
      fontSize: '2rem',
    },
    paragraph: {
      fontSize: '1.05rem',
    },
  },
};

function useThemeVars() {
  useEffect(() => {
    const setVars = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.style.setProperty('--background', isDark ? '#0a1929' : '#f8fafc');
      document.body.style.setProperty('--textPrimary', isDark ? '#e3e8ee' : '#1e293b');
      document.body.style.setProperty('--primaryAccent', '#2563eb');
    };
    setVars();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setVars);
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', setVars);
    };
  }, []);
}

function getResponsiveStyle(base, key) {
  if (typeof window !== 'undefined' && window.innerWidth <= 800 && styles['@media (max-width: 800px)'][key]) {
    return { ...base, ...styles['@media (max-width: 800px)'][key] };
  }
  return base;
}

function Hero() {
  useThemeVars();
  const navigate = useNavigate();

  return (
    <div style={styles.root}>
      <button style={styles.registerBtn} onClick={() => navigate('/register')}>
        Register
      </button>
      <div style={getResponsiveStyle(styles.header, 'header')}>
        <div style={styles.heading}>Welcome to Gradify</div>
        <div style={styles.paragraph}>
          A modern platform for students and lecturers to manage assignments effortlessly.
        </div>
      </div>
      <div style={getResponsiveStyle(styles.stack, 'stack')}>
        {/* Feature 1 */}
        <div style={getResponsiveStyle(styles.block, 'block')}>
          <div style={styles.emoji}>📥</div>
          <div style={styles.blockTitle}>One-Click Uploads</div>
          <div style={styles.blockDesc}>Submit assignments without the chaos.</div>
        </div>
        {/* Feature 2 */}
        <div style={getResponsiveStyle(styles.block, 'block')}>
          <div style={styles.emoji}>📊</div>
          <div style={styles.blockTitle}>Deadline Tracking</div>
          <div style={styles.blockDesc}>Visualize and conquer your workload.</div>
        </div>
        {/* Feature 3 */}
        <div style={getResponsiveStyle(styles.block, 'block')}>
          <div style={styles.emoji}>🧑‍🏫</div>
          <div style={styles.blockTitle}>Lecturer Tools</div>
          <div style={styles.blockDesc}>Manage, review, and respond — all in one place.</div>
        </div>
      </div>
    </div>
  );
}

export default Hero; 