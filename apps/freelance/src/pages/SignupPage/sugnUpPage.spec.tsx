import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import { authTestId, mockRegisterData } from '@freelance/constants';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import SignupPage from './index';

export interface IRegisterResponse {
  access_token: string;
}

const registerUser = (mockProposalResponse: IRegisterResponse) => ({});

jest.mock('src/redux/auth/auth-api', () => ({
  useRegisterUserMutation: () => [registerUser, { data: mockRegisterData }],
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

describe('SignupPage', () => {
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

  it('renders a component SignUpPage', () => {
    const baseElement = render(<SignupPage />);
    expect(baseElement).toBeTruthy();
  });

  it('show all SignUpPage fields and buttons', () => {
    render(<SignupPage />);

    expect(screen.getByTestId(authTestId.signUpEmailField)).toBeVisible();
    expect(screen.getByTestId(authTestId.signUpFirstNameField)).toBeVisible();
    expect(screen.getByTestId(authTestId.signUpLastNameField)).toBeVisible();
    expect(screen.getByTestId(authTestId.signUpPasswordField)).toBeVisible();
    expect(
      screen.getByTestId(authTestId.signUpConfirmPasswordField),
    ).toBeVisible();
    expect(screen.getByTestId(authTestId.signUpButton)).toBeVisible();
    expect(screen.getByTestId(authTestId.signUpConditions)).toBeVisible();
  });

  it('checkbox is checked/unchecked after click', async () => {
    render(<SignupPage />);

    expect(screen.getByTestId(authTestId.signUpAcceptField)).not.toBeChecked();

    await act(async () => {
      fireEvent.click(screen.getByTestId(authTestId.signUpAcceptField));
    });

    expect(screen.getByTestId(authTestId.signUpAcceptField)).toBeChecked();
  });

  it('All fields display entered data', () => {
    render(<SignupPage />);

    const emailField = screen.getByTestId(authTestId.signUpEmailField);
    const firstNameField = screen.getByTestId(authTestId.signUpFirstNameField);
    const lastNameField = screen.getByTestId(authTestId.signUpLastNameField);
    const passwordField = screen.getByTestId(authTestId.signUpPasswordField);
    const confirmPasswordField = screen.getByTestId(
      authTestId.signUpConfirmPasswordField,
    );

    expect(emailField).toContainHTML('');
    fireEvent.input(emailField, {
      target: { value: mockRegisterData.email },
    });
    expect(emailField).toContainHTML(mockRegisterData.email);

    expect(firstNameField).toContainHTML('');
    fireEvent.input(firstNameField, {
      target: { value: mockRegisterData.first_name },
    });
    expect(firstNameField).toContainHTML(mockRegisterData.first_name);

    expect(lastNameField).toContainHTML('');
    fireEvent.input(lastNameField, {
      target: { value: mockRegisterData.email },
    });
    expect(lastNameField).toContainHTML(mockRegisterData.email);

    expect(passwordField).toContainHTML('');
    fireEvent.input(passwordField, {
      target: { value: mockRegisterData.password },
    });
    expect(passwordField).toContainHTML(mockRegisterData.password);

    expect(confirmPasswordField).toContainHTML('');
    fireEvent.input(confirmPasswordField, {
      target: { value: mockRegisterData.confirmPassword },
    });
    expect(confirmPasswordField).toContainHTML(
      mockRegisterData.confirmPassword,
    );
  });

  it('Buttons are not disabled', () => {
    render(<SignupPage />);

    expect(screen.getByTestId(authTestId.signUpButton)).not.toBeDisabled();
    expect(screen.getByTestId(authTestId.toLogin)).not.toBeDisabled();
  });
});
