import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/StudentDashboardLayout.css';

const StudentDashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="student-layout-container">
      {/* Sidebar */}
      <aside className="student-sidebar sticky-sidebar">
        <div className="student-sidebar-title">
          {user?.first_name ? `Welcome ${user.first_name}` : 'Welcome Student'}
        </div>
        <nav className="student-sidebar-nav">
          <NavLink
              to="/student/assignments"
              className={({ isActive }) =>
                `student-sidebar-link${isActive ? ' active' : ''}`
              }
            >
              Assignments
          </NavLink>
          {/* <NavLink
            to="/student/submit-assignment"
            className={({ isActive }) =>
              `student-sidebar-link${isActive ? ' active' : ''}`
            }
          >
            Submit Assignment
          </NavLink> */}
          <NavLink
            to="/student/submission-history"
            className={({ isActive }) =>
              `student-sidebar-link${isActive ? ' active' : ''}`
            }
          >
            Submission History
          </NavLink>
          <NavLink
            to="/student/dashboard-stats"
            className={({ isActive }) =>
              `student-sidebar-link${isActive ? ' active' : ''}`
            }
          >
            Dashboard Stats
          </NavLink>
        </nav>
        <div className="student-sidebar-spacer" />
        <button className="student-logout-btn" onClick={handleLogout}>Logout</button>
      </aside>
      {/* Main Content */}
      <main className="student-main-content">
        {children}
      </main>
    </div>
  );
};

export default StudentDashboardLayout; 