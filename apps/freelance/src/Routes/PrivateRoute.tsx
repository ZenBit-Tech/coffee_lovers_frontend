import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { NavigationBar, roles } from '@freelance/components';
import { routes } from '@freelance/constants';
import { selectAuthToken, setRole } from 'redux/auth/auth-slice';
import { useGetUserInfoQuery } from 'redux/services/user';
import { Role } from 'redux/types/user.types';
import { RoutesWrapper } from 'src/app/styles';

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
    return (
      <RoutesWrapper isAppBar={data.role !== roles.visitor}>
        {data.role !== roles.visitor && <NavigationBar />}
        <Navigate to={routes.jobs} state={{ from: location }} replace />
      </RoutesWrapper>
    );
  }

  return (
    <RoutesWrapper isAppBar={data && data.role !== roles.visitor}>
      {data && data.role !== roles.visitor && <NavigationBar />}
      <Outlet />
    </RoutesWrapper>
  );
}
