import { unmountComponentAtNode } from 'react-dom';
import {
  findJobsPageTestId,
  mockFindJobsResponse,
  mockUseProperties,
} from '@freelance/constants';
import { render, screen } from '@utils/test-utils';
import { GetJobParams } from 'redux/types/jobs.types';

import '@testing-library/jest-dom';

import FindJobs from './index';

jest.mock('redux/services/jobsApi', () => ({
  useFindJobsQuery: (params: GetJobParams) => ({
    data: mockFindJobsResponse,
    isLoading: false,
  }),
}));

jest.mock('src/hooks/useProperties', () => {
  return () => mockUseProperties;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('FindJobs page rendering', () => {
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

  it('renders a component FindJobs', () => {
    const baseElement = render(<FindJobs />);

    expect(baseElement).toBeTruthy();
  });

  it('total count of find jobs displays correct data', () => {
    render(<FindJobs />);

    expect(screen.getByTestId(findJobsPageTestId.totalCount).textContent).toBe(
      `${mockFindJobsResponse.meta.totalCount}`,
    );
  });
});
