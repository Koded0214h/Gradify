import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { token, role, logout } = useAuth ? useAuth() : {};

  return (
    <nav style={{
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#222',
      color: '#fff',
      display: 'flex',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Gradify</h2>
      <ul style={{
        listStyle: 'none',
        display: 'flex',
        gap: '1rem',
        margin: 0,
        padding: 0,
        alignItems: 'center',
      }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        {!token && <li><Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link></li>}
        {!token && <li><Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link></li>}
        {token && role === 'student' && <li><Link to="/student" style={{ color: '#fff', textDecoration: 'none' }}>Student</Link></li>}
        {token && role === 'lecturer' && <li><Link to="/lecturer" style={{ color: '#fff', textDecoration: 'none' }}>Lecturer</Link></li>}
        {token && (
          <>
            <li style={{ color: '#fff', fontWeight: 'bold' }}>{role.charAt(0).toUpperCase() + role.slice(1)}</li>
            <li>
              <button onClick={logout} style={{ color: '#fff', background: 'none', border: '1px solid #fff', borderRadius: '6px', padding: '0.3rem 0.8rem', cursor: 'pointer' }}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
