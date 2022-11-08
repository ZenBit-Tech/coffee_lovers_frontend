import React, { ReactElement } from 'react';
import { Wrapper } from '../ExampleRootPage/styles';
import { GoogleLoginButton } from '@freelance/components';
import { LoginForm } from '@freelance/components';

const SignInGoogle = (): ReactElement => {
  return (
    <Wrapper>
      <GoogleLoginButton />
      <LoginForm />
    </Wrapper>
  );
};

export default SignInGoogle;
