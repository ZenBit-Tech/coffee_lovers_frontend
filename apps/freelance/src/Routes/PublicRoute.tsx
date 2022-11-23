import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthToken } from 'redux/auth/auth-slice';

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const token = useSelector(selectAuthToken);

  return token ? <Navigate to="/jobownerdashboard" /> : children;
}
