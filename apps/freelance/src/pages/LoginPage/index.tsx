import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { GoogleLoginButton, LoginForm } from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

import { Wrapper } from './styles';

function LoginPage() {
  const { t } = useTranslation();

  return (
    <Wrapper theme={baseTheme}>
      <Space align="start">
        <LoginForm />
        <GoogleLoginButton> {t('loginPage.google')}</GoogleLoginButton>
      </Space>
    </Wrapper>
  );
}

export default LoginPage;
