import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { selectAuthToken } from 'redux/auth/auth-slice';
import { Role } from 'redux/types/user.types';

export default function PrivateRoute({ allowedRoles }: { allowedRoles: Role }) {
  const token = useSelector(selectAuthToken);

  return token ? <Outlet /> : <Navigate to={routes.login} replace={true} />;
}
