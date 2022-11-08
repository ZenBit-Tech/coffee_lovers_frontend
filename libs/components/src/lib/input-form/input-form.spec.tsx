import { render } from '@testing-library/react';

import InputForm from './input-form';

describe('InputForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputForm />);
    expect(baseElement).toBeTruthy();
  });
});
