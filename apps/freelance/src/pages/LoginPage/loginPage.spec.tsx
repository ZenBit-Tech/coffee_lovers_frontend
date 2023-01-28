import { unmountComponentAtNode } from 'react-dom';
import { authTestId, mockRegisterData } from '@freelance/constants';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import LoginPage from './index';

export interface ILoginResponse {
  access_token: string;
}

const loginUser = (mockProposalResponse: ILoginResponse) => ({});

jest.mock('src/redux/auth/auth-api', () => ({
  useLoginUserMutation: () => [loginUser, { data: mockRegisterData }],
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe('LoginPage', () => {
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

  it('renders a component LoginPage', () => {
    const baseElement = render(<LoginPage />);
    expect(baseElement).toBeTruthy();
  });

  it('show all LoginPage fields and buttons', () => {
    render(<LoginPage />);

    expect(screen.getByTestId(authTestId.loginEmailField)).toBeVisible();
    expect(screen.getByTestId(authTestId.loginPasswordField)).toBeVisible();
    expect(screen.getByTestId(authTestId.loginButton)).toBeVisible();
    expect(screen.getByTestId(authTestId.haveAccountButton)).toBeVisible();
    expect(screen.getByTestId(authTestId.forgetPasswordButton)).toBeVisible();
  });

  it('Email field displays entered email', () => {
    render(<LoginPage />);

    const emailField = screen.getByTestId(authTestId.loginEmailField);
    const passwordField = screen.getByTestId(authTestId.loginPasswordField);

    expect(emailField).toContainHTML('');
    fireEvent.input(emailField, {
      target: { value: mockRegisterData.email },
    });
    expect(emailField).toContainHTML(mockRegisterData.email);

    expect(passwordField).toContainHTML('');
    fireEvent.input(passwordField, {
      target: { value: mockRegisterData.password },
    });
    expect(passwordField).toContainHTML(mockRegisterData.password);
  });

  it('Buttons are not disabled', () => {
    render(<LoginPage />);

    expect(screen.getByTestId(authTestId.loginButton)).not.toBeDisabled();
    expect(screen.getByTestId(authTestId.haveAccountButton)).not.toBeDisabled();
    expect(
      screen.getByTestId(authTestId.forgetPasswordButton),
    ).not.toBeDisabled();
  });

  it('should not submit with empty fields', async () => {
    render(<LoginPage />);
    const submit = jest.fn();

    fireEvent.click(screen.getByTestId(authTestId.loginButton));
    expect(submit).not.toHaveBeenCalled();
  });
});
