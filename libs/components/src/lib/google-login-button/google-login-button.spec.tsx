import { render } from '@testing-library/react';

import GoogleLoginButton from '.';

describe('GoogleLoginButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GoogleLoginButton />);
    expect(baseElement).toBeTruthy();
  });
});
