import { IJobProposal, JobStatus } from 'src/redux/types/jobs.types';
import { ProposalByUserId } from 'src/redux/types/user.types';

export const mockProposals: ProposalByUserId[] = [
  {
    id: 1,
    hourly_rate: 20,
    cover_letter: 'My cover letter',
    job: {
      id: 1,
      title: 'Login page',
      description: 'Login page in Vue.js',
      hourly_rate: 40,
      available_time: 'Part-Time',
      english_level: 'Intermediate',
      duration: 1,
      duration_amount: 'Week',
      status: JobStatus.PENDING,
      created_at: '2022-12-08T12:37:44.968Z',
    },
  },
];

export const mockProposalResponse: IJobProposal = {
  job: 1,
  hourly_rate: 2,
  cover_letter: 'Test',
};
