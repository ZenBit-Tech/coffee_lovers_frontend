import { Space } from 'antd';
import { GoogleLoginButton, LoginForm } from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

import { Wrapper } from './styles';

const LoginPage = () => {
  return (
    <Wrapper theme={baseTheme}>
      <Space align="start">
        <LoginForm />
        <GoogleLoginButton />
      </Space>
    </Wrapper>
  );
};

export default LoginPage;
