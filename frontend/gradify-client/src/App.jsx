import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import LecturerDashboard from './pages/LecturerDashboard';
import CreateAssignment from './pages/CreateAssignment';
import CheckAssignment from './pages/CheckAssignment';
import SubmitAssignment from './pages/SubmitAssignment';
import SubmissionHistory from './pages/SubmissionHistory';
import DashboardStats from './pages/DashboardStats';
import Assignments from './pages/Assignments';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/*" element={<StudentDashboard />}>
            <Route index element={<Navigate to="assignments" replace />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="submit-assignment" element={<SubmitAssignment />} />
            <Route path="submission-history" element={<SubmissionHistory />} />
            <Route path="dashboard-stats" element={<DashboardStats />} />
          </Route>
          <Route path="/lecturer/*" element={<LecturerDashboard />}>
            <Route index element={<Navigate to="create-assignment" replace />} />
            <Route path="create-assignment" element={<CreateAssignment />} />
            <Route path="check-assignment" element={<CheckAssignment />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



