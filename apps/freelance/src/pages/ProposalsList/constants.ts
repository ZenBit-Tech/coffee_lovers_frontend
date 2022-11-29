import { User } from 'redux/services/types/user.types';

export const mockProjectName = 'Test project';

export interface mockProposalType {
  id: number;
  user: User;
  hourly_rate: number;
  available_time: string;
  cover_letter: string;
}

export const mockProposals: mockProposalType[] = [
  {
    id: 1,
    user: {
      id: 1,
      email: 'test@test.com',
      first_name: 'John',
      last_name: 'Doe',
      position: 'Full Stack Developer',
      available_time: 'Full-time',
      profile_image: '',
      skills: [1, 2, 4],
    },
    hourly_rate: 30,
    available_time: 'Full-time',
    cover_letter: 'Cover letter text',
  },
  {
    id: 2,
    user: {
      id: 2,
      email: 'test@test.com',
      first_name: 'Andrew',
      last_name: 'Cattinham',
      position: 'Java Developer',
      available_time: 'Full-time',
      profile_image: '',
      skills: [3, 5],
    },
    hourly_rate: 35,
    available_time: 'Part-time',
    cover_letter:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];
