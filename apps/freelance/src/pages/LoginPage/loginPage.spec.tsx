import { unmountComponentAtNode } from 'react-dom';
import { render } from '@utils/test-utils';

import '@testing-library/jest-dom';

import LoginPage from './index';

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
});
