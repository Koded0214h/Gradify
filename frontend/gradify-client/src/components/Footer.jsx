import { useNavigate } from 'react-router-dom';

const styles = {
  root: {
    width: '100%',
    background: 'var(--background)',
    color: 'var(--textPrimary)',
    borderTop: '1.5px solid #e0e7ef',
    padding: '2.5rem 1rem 1.5rem 1rem',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '2rem',
    fontFamily: 'system-ui, sans-serif',
    backgroundColor: 'rgba(37,99,235,0.04)',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 2,
    minWidth: '220px',
  },
  cta: {
    fontWeight: 700,
    fontSize: '1.2rem',
    color: 'var(--primaryAccent)',
    marginBottom: '0.5rem',
  },
  registerBtn: {
    background: 'var(--primaryAccent)',
    color: 'white',
    border: 'none',
    borderRadius: '999px',
    padding: '0.6rem 1.7rem',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    marginTop: '0.5rem',
    alignSelf: 'flex-start',
    transition: 'background 0.2s',
  },
  links: {
    display: 'flex',
    gap: '1.5rem',
    fontSize: '1rem',
    margin: '1rem 0 0 0',
    color: 'var(--primaryAccent)',
    fontWeight: 500,
    flex: 1,
    flexWrap: 'wrap',
  },
  link: {
    color: 'var(--primaryAccent)',
    textDecoration: 'none',
    cursor: 'pointer',
    opacity: 0.85,
    transition: 'opacity 0.15s',
  },
  copyright: {
    fontSize: '0.95rem',
    color: 'var(--textPrimary)',
    opacity: 0.7,
    marginTop: '1.5rem',
    flex: 1,
    textAlign: 'right',
  },
  '@media (max-width: 800px)': {
    root: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '1.5rem',
      padding: '2rem 1rem 1rem 1rem',
    },
    left: {
      alignItems: 'flex-start',
      gap: '0.5rem',
    },
    links: {
      margin: '0.5rem 0 0 0',
      gap: '1rem',
    },
    copyright: {
      textAlign: 'left',
      marginTop: '1rem',
    },
  },
};

function getResponsiveStyle(base, key) {
  if (typeof window !== 'undefined' && window.innerWidth <= 800 && styles['@media (max-width: 800px)'][key]) {
    return { ...base, ...styles['@media (max-width: 800px)'][key] };
  }
  return base;
}

function Footer() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  return (
    <footer style={getResponsiveStyle(styles.root, 'root')}>
      <div style={getResponsiveStyle(styles.left, 'left')}>
        <div style={styles.cta}>Ready to level up your submissions?</div>
        <button style={styles.registerBtn} onClick={() => navigate('/register')}>
          Register
        </button>
      </div>
      <div style={getResponsiveStyle(styles.links, 'links')}>
        <span style={styles.link}>Terms</span>
        <span style={styles.link}>Privacy</span>
        <span style={styles.link}>Contact</span>
      </div>
      <div style={getResponsiveStyle(styles.copyright, 'copyright')}>
        © {year} Gradify
      </div>
    </footer>
  );
}

export default Footer; 