import { unmountComponentAtNode } from 'react-dom';
import { ProposalModal } from '@freelance/components';
import {
  jobDataTestId,
  mockJobData,
  mockOneUser,
  mockProposals,
} from '@freelance/constants';
import { formatDate } from '@utils/dates';
import { fireEvent, render, screen } from '@utils/test-utils';
import { IJobProposal } from 'redux/types/jobs.types';

import '@testing-library/jest-dom';

import JobDetailsPage from './index';

const sendProposal = (mockProposalResponse: IJobProposal) => ({});

jest.mock('redux/services/jobsApi', () => ({
  useGetJobQuery: () => ({ data: mockJobData, isLoading: false }),
  useSendProposalMutation: () => [sendProposal],
}));

jest.mock('redux/services/userApi', () => ({
  useGetUserProposalsQuery: () => ({ data: mockProposals, isLoading: false }),
  useGetUserInfoQuery: () => ({ data: mockOneUser }),
}));

describe('JobDetails page rendering', () => {
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

  it('Renders a component JobDetails', () => {
    const baseElement = render(<JobDetailsPage />);

    expect(baseElement).toBeTruthy();
  });

  it('Job information fields display correct data', () => {
    render(<JobDetailsPage />);
    const index = 0;

    expect(screen.getByTestId(jobDataTestId.testTitle).textContent).toBe(
      mockJobData.job.title,
    );

    expect(screen.getByTestId(jobDataTestId.jobDate).textContent).toBe(
      formatDate(new Date(mockJobData.job.created_at)),
    );

    expect(screen.getByTestId(jobDataTestId.jobCategory).textContent).toBe(
      mockJobData.job.category?.name,
    );

    expect(screen.getByTestId(jobDataTestId.jobDuration).textContent).toBe(
      mockJobData.job.duration_amount,
    );

    expect(screen.getByTestId(jobDataTestId.jobRate).textContent).toBe(
      `${mockJobData.job.hourly_rate}`,
    );

    expect(screen.getByTestId(jobDataTestId.jobTime).textContent).toBe(
      mockJobData.job.available_time,
    );

    expect(screen.getByTestId(jobDataTestId.jobEnglish).textContent).toBe(
      mockJobData.job.english_level,
    );

    expect(screen.getByTestId(jobDataTestId.jobDescription).textContent).toBe(
      mockJobData.job.description,
    );

    if (mockJobData.job.skills) {
      expect(
        screen.getAllByTestId(jobDataTestId.jobSkills)[index].textContent,
      ).toBe(mockJobData.job.skills[index].name);
    }
  });

  it('Job owner name renders with correct data', () => {
    render(<JobDetailsPage />);

    expect(screen.getByTestId(jobDataTestId.jobOwner).textContent).toBe(
      `${mockJobData.job.owner.first_name} ${mockJobData.job.owner.last_name}`,
    );
  });

  it('Send proposal modal shown when Send Proposal button is clicked', () => {
    render(<JobDetailsPage />);

    const sendProposalBtn = screen.getByTestId(
      jobDataTestId.jobSendProposalBtn,
    );
    const sendProposalModal = screen.getByTestId(
      jobDataTestId.jobProposalModal,
    );

    fireEvent.click(sendProposalBtn);
    expect(sendProposalModal).toBeVisible();
  });

  it('Send proposal modal renders', () => {
    const baseElement = render(
      <ProposalModal
        openModal={true}
        rate={mockJobData.job.hourly_rate}
        onCancel={jest.fn()}
        freelancer_rate={mockOneUser.hourly_rate}
        id={1}
      />,
    );

    expect(baseElement).toBeTruthy();
  });

  it('Send proposal modal renders with correct data', () => {
    render(
      <ProposalModal
        openModal={true}
        rate={mockJobData.job.hourly_rate}
        onCancel={jest.fn()}
        freelancer_rate={mockOneUser.hourly_rate}
        id={1}
      />,
    );

    expect(
      screen.getByTestId(jobDataTestId.jobFreelancerRate).textContent,
    ).toBe(`${mockOneUser.hourly_rate} $`);
  });

  it('Text area displays entered text', () => {
    render(
      <ProposalModal
        openModal={true}
        rate={mockJobData.job.hourly_rate}
        onCancel={jest.fn()}
        freelancer_rate={mockOneUser.hourly_rate}
        id={1}
      />,
    );

    const text = 'Test cover letter';
    const number = 20;
    const textArea = screen.getByTestId(jobDataTestId.jobTextArea);
    const numberInput = screen.getByTestId(jobDataTestId.jobNumberInput);

    expect(textArea).toContainHTML('');
    fireEvent.input(textArea, {
      target: { value: text },
    });
    expect(textArea).toContainHTML(text);

    expect(numberInput).toContainHTML('');
    fireEvent.input(numberInput, {
      target: { value: number },
    });
    expect(numberInput).toContainHTML(number);
  });
});
