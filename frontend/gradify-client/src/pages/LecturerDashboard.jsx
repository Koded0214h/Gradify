import { Outlet } from 'react-router-dom';
import LecturerDashboardLayout from '../layouts/LecturerDashboardLayout';

const LecturerDashboard = () => {
  return (
    <LecturerDashboardLayout>
      <Outlet />
    </LecturerDashboardLayout>
  );
};

export default LecturerDashboard;
   