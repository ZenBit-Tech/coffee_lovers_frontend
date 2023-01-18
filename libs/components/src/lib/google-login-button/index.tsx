import { useEffect } from 'react';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { GoogleIconUrl } from '@freelance/constants';
import { useGoogleLogin } from '@react-oauth/google';
import { setUser } from 'src/redux/auth/auth-slice';
import { useAddUserGoogleMutation } from 'src/redux/services/authApi';
import { useGetUserInfoQuery } from 'src/redux/services/userApi';

import { ButtonContainer, GoogleButton } from './styles';

export function GoogleLoginButton() {
  const [addUser, { data, isSuccess, isError, error }] =
    useAddUserGoogleMutation();
  const { data: user } = useGetUserInfoQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: data.access_token }));
      if (user?.role) {
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
      try {
        await addUser(credentialResponse);
      } catch (err) {
        alert(err);
      }
    },
  });

  return (
    <ButtonContainer>
      <GoogleButton onClick={() => login()}>
        <Avatar src={GoogleIconUrl} size="default" />
        {t('loginPage.google')}
      </GoogleButton>
    </ButtonContainer>
  );
}
export default GoogleLoginButton;
