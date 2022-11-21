import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthToken } from 'redux/auth/auth-slice';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useSelector(selectAuthToken);

  return token ? children : <Navigate to="/login" replace={true} />;
}
