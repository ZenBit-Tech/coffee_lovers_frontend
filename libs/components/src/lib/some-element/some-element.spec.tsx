import { render } from '@testing-library/react';

import SomeElement from './some-element';

describe('SomeElement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SomeElement />);
    expect(baseElement).toBeTruthy();
  });
});
