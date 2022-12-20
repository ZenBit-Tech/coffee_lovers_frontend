import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { roles, routes } from '@freelance/constants';
import { selectAuthToken, selectRole } from 'redux/auth/auth-slice';

export default function PublicRoute() {
  const token = useSelector(selectAuthToken);
  const role = useSelector(selectRole);
  const location = useLocation();

  return token && role !== roles.visitor ? (
    <Navigate to={routes.jobs} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}
