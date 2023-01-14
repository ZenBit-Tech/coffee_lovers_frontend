import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { useGoogleLogin } from '@react-oauth/google';
import { setUser } from 'src/redux/auth/auth-slice';
import { useAddUserGoogleMutation } from 'src/redux/services/authApi';

import { ButtonContainer, GoogleButton } from './styles';

export function GoogleLoginButton() {
  const [addUser, { data, isSuccess, isError, error }] =
    useAddUserGoogleMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const login = useGoogleLogin({
    onSuccess: async credentialResponse => {
      await addUser(credentialResponse);
    },
  });

  return (
    <ButtonContainer>
      <GoogleButton onClick={() => login()}>
        {t('loginPage.google')}
      </GoogleButton>
    </ButtonContainer>
  );
}
export default GoogleLoginButton;
