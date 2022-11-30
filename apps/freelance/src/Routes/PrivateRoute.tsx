import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { selectAuthToken } from 'redux/auth/auth-slice';
import { setRole } from 'redux/auth/auth-slice';
import { useGetUserInfoQuery } from 'redux/services/user';
import { Role } from 'redux/types/user.types';

export default function PrivateRoute({ allowedRoles }: { allowedRoles: Role }) {
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const { data } = useGetUserInfoQuery();
  data && dispatch(setRole({ role: data.role }));

  return token ? <Outlet /> : <Navigate to={routes.login} replace={true} />;
}
