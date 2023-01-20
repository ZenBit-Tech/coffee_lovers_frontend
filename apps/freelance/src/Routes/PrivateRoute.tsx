import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { NavigationBar, roles } from '@freelance/components';
import { routes } from '@freelance/constants';
import { selectAuthToken, setRole } from 'redux/auth/auth-slice';
import { useGetUserInfoQuery } from 'redux/services/userApi';
import { Role } from 'redux/types/user.types';
import { RoutesWrapper } from 'src/app/styles';

export default function PrivateRoute({
  allowedRoles,
}: {
  allowedRoles: Role[];
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = useGetUserInfoQuery();
  const token = useSelector(selectAuthToken);
  useEffect(() => {
    if (data?.role) {
      dispatch(setRole({ role: data.role }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (token && data?.role && !data?.first_name) {
      navigate(routes.ownerProfileQuestions);
    }
  }, [data?.first_name, data?.role, navigate, token]);

  if (!token) {
    return <Navigate to={routes.login} replace={true} />;
  }

  if (data && !allowedRoles.includes(data.role) && !data.first_name) {
    return (
      <RoutesWrapper isAppBar={false}>
        <Navigate
          to={routes.ownerProfileQuestions}
          state={{ from: location }}
          replace
        />
      </RoutesWrapper>
    );
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
      {data && data.role !== roles.visitor && data.first_name && (
        <NavigationBar />
      )}
      <Outlet />
    </RoutesWrapper>
  );
}
