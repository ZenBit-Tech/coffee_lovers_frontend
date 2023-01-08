import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { roles, routes } from '@freelance/constants';
import { GoogleLogin } from '@react-oauth/google';
import { selectRole, setRole, setUser } from 'src/redux/auth/auth-slice';
import { useAddUserGoogleMutation } from 'src/redux/services/authApi';
import { useGetUserInfoQuery } from 'src/redux/services/user';

import { ButtonContainer } from './styles';

export function GoogleLoginButton() {
  const [addUser, { data, isSuccess, isError, error }] =
    useAddUserGoogleMutation();
  const { data: user } = useGetUserInfoQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector(selectRole);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: data.access_token }));
      dispatch(setRole({ role: (user && user.role) || roles.visitor }));
      if (role !== roles.visitor) {
        navigate(`${routes.jobs}`);
      } else {
        navigate(`${routes.role}`);
      }
    }
    if (isError) {
      alert(error);
    }
  }, [data, dispatch, error, isError, isSuccess, navigate, user, role]);

  return (
    <ButtonContainer>
      <GoogleLogin
        onSuccess={async credentialResponse => {
          try {
            await addUser(credentialResponse);
          } catch (err) {
            alert(err);
          }
        }}
      />
    </ButtonContainer>
  );
}
export default GoogleLoginButton;
