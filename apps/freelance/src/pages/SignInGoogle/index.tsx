import React, { ReactElement } from 'react';
import { GoogleLoginButton } from '@freelance/components';

import { Wrapper } from '../ExampleRootPage/styles';

const SignInGoogle = (): ReactElement => {
  return (
    <Wrapper>
      <GoogleLoginButton />
    </Wrapper>
  );
};

export default SignInGoogle;
