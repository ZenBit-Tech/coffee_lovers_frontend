import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthToken } from 'redux/auth/auth-slice';
import { setRole } from 'redux/auth/auth-slice';
import { useGetUserInfoQuery } from 'redux/services/user';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useSelector(selectAuthToken);
  const dispatch = useDispatch();
  const { data } = useGetUserInfoQuery();
  data && dispatch(setRole({ role: data.role }));

  return token ? children : <Navigate to="/login" replace={true} />;
}
