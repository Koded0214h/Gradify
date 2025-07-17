import { NavLink } from 'react-router-dom';
import '../styles/LecturerDashboardLayout.css';

const LecturerDashboardLayout = ({ children }) => {
  return (
    <div className="lecturer-layout-container">
      {/* Sidebar */}
      <aside className="lecturer-sidebar">
        <div className="lecturer-sidebar-title">Lecturer</div>
        <nav className="lecturer-sidebar-nav">
          <NavLink
            to="/lecturer/create-assignment"
            className={({ isActive }) =>
              `lecturer-sidebar-link${isActive ? ' active' : ''}`
            }
          >
            Create Assignment
          </NavLink>
          <NavLink
            to="/lecturer/check-assignment"
            className={({ isActive }) =>
              `lecturer-sidebar-link${isActive ? ' active' : ''}`
            }
          >
            Check Assignment
          </NavLink>
        </nav>
        <div className="lecturer-sidebar-spacer" />
      </aside>
      {/* Main Content */}
      <main className="lecturer-main-content">
        {children}
      </main>
    </div>
  );
};

export default LecturerDashboardLayout; 