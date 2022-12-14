import { Space } from 'antd';
import { GoogleLoginButton, LoginForm } from '@freelance/components';

import { Wrapper } from './styles';

export default function LoginPage() {
  return (
    <Wrapper>
      <Space align="start">
        <LoginForm />
        <GoogleLoginButton />
      </Space>
    </Wrapper>
  );
}
