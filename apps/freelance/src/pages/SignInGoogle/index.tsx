import React, { ReactElement } from 'react';
import { Wrapper } from '../ExampleRootPage/styles';
import { GoogleLoginButton } from '@freelance/components';

const SignInGoogle = (): ReactElement => {
  return (
    <Wrapper>
      <GoogleLoginButton/>
    </Wrapper>
  );
};

export default SignInGoogle;
