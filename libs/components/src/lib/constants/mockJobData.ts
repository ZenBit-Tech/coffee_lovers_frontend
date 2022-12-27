import { FindJobsResponse, Job, JobStatus } from 'src/redux/types/jobs.types';

import { mockUsers } from './mockUserData';

export const mockJobs: Job[] = [
  {
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
    owner: mockUsers[0],
    category: {
      id: 1,
      name: 'JavaScript',
    },
  } as Job,
  {
    id: 2,
    title: 'Streaming platform',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    hourly_rate: 45,
    available_time: 'Part-Time',
    english_level: 'Intermediate',
    duration: 3,
    duration_amount: 'Month',
    status: JobStatus.IN_PROGRESS,
    created_at: '2022-12-08T12:34:27.457Z',
    owner: mockUsers[1],
    category: {
      id: 1,
      name: 'JavaScript',
    },
  } as Job,
];

export const mockFindJobsResponse: FindJobsResponse = {
  jobs: mockJobs,
  meta: {
    totalCount: 2,
  },
};
