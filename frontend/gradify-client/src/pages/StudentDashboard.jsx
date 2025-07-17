import { Outlet } from 'react-router-dom';
import StudentDashboardLayout from '../layouts/StudentDashboardLayout';

const StudentDashboard = () => {
  return (
    <StudentDashboardLayout>
      <Outlet />
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
  