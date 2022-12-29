import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom';

import LoginForm from './login-form';

jest.mock('src/redux/auth/auth-api', () => ({
  loginUser: () => ({
    data: { email: 'test@gmail.com', token: 'Qwerty123' },
    isLoading: false,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('LoginForm', () => {
  const container: Element = document.createElement('div');

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  beforeEach(() => {
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
  });

  it('renders a component LoginForm', () => {
    const baseElement = render(<LoginForm />);

    expect(baseElement).toBeTruthy();
  });
});
