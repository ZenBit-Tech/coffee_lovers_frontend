import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { GoogleLoginButton, LoginForm } from '@freelance/components';

import { Wrapper } from './styles';

function LoginPage() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Space align="start">
        <LoginForm />
        <GoogleLoginButton> {t('loginPage.google')}</GoogleLoginButton>
      </Space>
    </Wrapper>
  );
}

export default LoginPage;
