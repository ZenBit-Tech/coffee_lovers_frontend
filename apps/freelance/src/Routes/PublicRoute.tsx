import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { selectAuthToken } from 'redux/auth/auth-slice';

export default function PublicRoute() {
  const token = useSelector(selectAuthToken);
  const location = useLocation();

  return token ? (
    <Navigate to={routes.jobs} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
