import { unmountComponentAtNode } from 'react-dom';
import { mockPostedJobsResponse, postedJobsTestId } from '@freelance/constants';
import { render, screen } from '@testing-library/react';

import PostedJobsList from './index';

jest.mock('redux/services/jobsApi', () => ({
  useGetPostedJobsQuery: () => ({
    data: mockPostedJobsResponse,
    isLoading: false,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string, params?: object) =>
        `${str} ${Object.values(params || {}).join(' ')}`,
    };
  },
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

  it('renders a component ContractsPage', () => {
    const baseElement = render(<PostedJobsList />);
    expect(baseElement).toBeTruthy();
  });

  it('posted job cards renders', () => {
    render(<PostedJobsList />);

    const postedJobCard = screen.getAllByTestId(postedJobsTestId.postedJobCard);
    expect(postedJobCard).toHaveLength(mockPostedJobsResponse.length);
  });

  it('posted job card should display correct data', () => {
    render(<PostedJobsList />);
    const index = 0;

    expect(
      screen
        .getAllByTestId(postedJobsTestId.postedJobCardStatus)
        [index].textContent?.toLowerCase(),
    ).toContain(mockPostedJobsResponse[index].status.toLowerCase());

    expect(
      screen.getAllByTestId(postedJobsTestId.postedJobCardTitle)[index]
        .textContent,
    ).toBe(mockPostedJobsResponse[index].title);

    expect(
      screen.getAllByTestId(postedJobsTestId.postedJobCardDescription)[index]
        .textContent,
    ).toContain(mockPostedJobsResponse[index].description);

    expect(
      screen.getAllByTestId(postedJobsTestId.postedJobCardProposals)[index]
        .textContent,
    ).toContain(String(mockPostedJobsResponse[index].proposalsCount));

    expect(
      screen.getAllByTestId(postedJobsTestId.postedJobCardHired)[index]
        .textContent,
    ).toContain(String(mockPostedJobsResponse[index].hiresCount));
  });
});
