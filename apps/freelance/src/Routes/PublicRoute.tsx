import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { selectAuthToken } from 'redux/auth/auth-slice';

export default function PublicRoute() {
  const token = useSelector(selectAuthToken);

  return token ? <Navigate to={routes.jobOwnerDashboard} /> : <Outlet />;
}
