import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { role, logout } = useAuth();

  return (
    <div>
      <nav>
        {role === "student" && (
          <>
            <a href="/student">Submit Assignment</a>
            {/* Add more student links if needed */}
          </>
        )}

        {role === "lecturer" && (
          <>
            <a href="/lecturer">View Submissions</a>
            {/* Add more lecturer links */}
          </>
        )}

        <button onClick={logout}>Logout</button>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout; 