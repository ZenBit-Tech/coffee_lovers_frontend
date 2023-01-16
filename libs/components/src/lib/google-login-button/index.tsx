import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { GoogleLogin } from '@react-oauth/google';
import { setUser } from 'src/redux/auth/auth-slice';
import { useAddUserGoogleMutation } from 'src/redux/services/authApi';

import { ButtonContainer } from './styles';

export function GoogleLoginButton() {
  const [addUser, { data, isSuccess, isError, error }] =
    useAddUserGoogleMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: data.access_token }));
      if (data.role) {
        navigate(`${routes.jobs}`);
      } else {
        navigate(`${routes.role}`);
      }
    }
    if (isError) {
      alert(error);
    }
  }, [data, dispatch, error, isError, isSuccess, navigate]);

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
