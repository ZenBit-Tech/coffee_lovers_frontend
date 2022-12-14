import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { roles, routes } from '@freelance/constants';
import { selectAuthToken, selectRole } from 'redux/auth/auth-slice';

export default function PublicRoute() {
  const token = useSelector(selectAuthToken);
  const location = useLocation();
  const role = useSelector(selectRole);

  if (token) {
    return (
      <Navigate
        to={
          role === roles.freelancer ? routes.findJobs : routes.jobOwnerDashboard
        }
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
