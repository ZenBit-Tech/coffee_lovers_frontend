import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { roles, routes } from '@freelance/constants';
import { selectAuthToken, setRole } from 'redux/auth/auth-slice';
import { useGetUserInfoQuery } from 'redux/services/user';
import { Role } from 'redux/types/user.types';

export default function PrivateRoute({
  allowedRoles,
}: {
  allowedRoles: Role[];
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = useGetUserInfoQuery();
  const token = useSelector(selectAuthToken);
  data && dispatch(setRole({ role: data.role }));

  if (!token) {
    return <Navigate to={routes.login} replace={true} />;
  }

  if (data && !allowedRoles.includes(data.role)) {
    return data.role === roles.freelancer ? (
      <Navigate to={routes.findJobs} state={{ from: location }} replace />
    ) : (
      <Navigate
        to={routes.jobOwnerDashboard}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}
