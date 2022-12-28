import { unmountComponentAtNode } from 'react-dom';
import {
  filtersTestId,
  findJobsPageTestId,
  jobCardTestId,
  mockFindJobsResponse,
  mockUseProperties,
} from '@freelance/constants';
import { formatDate } from '@utils/dates';
import { fireEvent, render, screen } from '@utils/test-utils';
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

  it('total count of jobs displays correct data', () => {
    render(<FindJobs />);

    expect(screen.getByTestId(findJobsPageTestId.totalCount).textContent).toBe(
      `${mockFindJobsResponse.meta.totalCount}`,
    );
  });

  it('filter component should be shown when we click filter button & hidden when we click it again', () => {
    render(<FindJobs />);

    const filterBtn = screen.getByTestId(findJobsPageTestId.filterButton);
    const filterComponent = screen.getByTestId(filtersTestId.wrapper);

    expect(filterComponent).not.toBeVisible();
    fireEvent.click(filterBtn);
    expect(filterComponent).toBeVisible();
    fireEvent.click(filterBtn);
    expect(filterComponent).not.toBeVisible();
  });

  it('input search should display entered text', () => {
    render(<FindJobs />);

    const text = 'test';
    const input = screen.getByTestId(findJobsPageTestId.inputSearch);

    expect(input).toContainHTML('');
    fireEvent.input(input, {
      target: { value: text },
    });
    expect(input).toContainHTML(text);
  });

  it('job cards renders', () => {
    render(<FindJobs />);

    const jobCard = screen.getAllByTestId(jobCardTestId.wrapper);
    expect(jobCard).toHaveLength(mockFindJobsResponse.jobs.length);
  });

  it('job card should display correct data', () => {
    render(<FindJobs />);
    const index = 0;

    expect(screen.getAllByTestId(jobCardTestId.title)[index].textContent).toBe(
      mockFindJobsResponse.jobs[index].title,
    );

    expect(
      screen.queryAllByTestId(jobCardTestId.owner)[index].textContent,
    ).toBe(
      `${mockFindJobsResponse.jobs[index].owner.first_name} ${mockFindJobsResponse.jobs[index].owner.last_name}`,
    );

    expect(screen.queryAllByTestId(jobCardTestId.date)[index].textContent).toBe(
      formatDate(new Date(mockFindJobsResponse.jobs[index].created_at)),
    );

    if (mockFindJobsResponse.jobs[index].category) {
      expect(
        screen.queryAllByTestId(jobCardTestId.category)[index].textContent,
      ).toBe(mockFindJobsResponse.jobs[index].category.name);
    }
  });
});
