import { Job } from 'redux/types/jobs.types';
import { Interview, Offer, OfferStatus } from 'redux/types/offers.types';
import { User } from 'redux/types/user.types';

export const offers: Offer[] = [
  {
    id: 1,
    job: {
      id: 1,
      title: 'Freelance platform',
      description: 'Create freelance platform',
      category: {
        id: 1,
        name: 'Web development',
      },
      skills: [
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'React' },
        { id: 3, name: 'Nest.js' },
      ],
      available_time: 'Full-time',
      english_level: 'Intermediate',
    } as Job,
    job_owner: {
      id: 1,
      first_name: 'Gerald',
      last_name: 'Dranis',
      profile_image: 'img/2815d6fd-f9ed-42af-8d71-fe033711e64e.jpg',
    } as User,
    hourly_rate: 35,
    status: OfferStatus.ACCEPTED,
    created_at: '2022-11-25T22:24:28.682Z',
  },
  {
    id: 2,
    job: {
      id: 2,
      title: 'Music platform',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
      category: {
        id: 1,
        name: 'Web development',
      },
      skills: [
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'React' },
        { id: 3, name: 'Nest.js' },
      ],
      available_time: 'Part-time',
      english_level: 'Upper-Intermediate',
    } as Job,
    job_owner: {
      id: 2,
      first_name: 'Andrew',
      last_name: 'Morris',
      profile_image: 'img/679ba877-1d46-4c3e-a8a6-0af414c24119.jpg',
    } as User,
    hourly_rate: 30,
    status: OfferStatus.PENDING,
    created_at: '2022-11-25T22:24:28.682Z',
  },
  {
    id: 3,
    job: {
      id: 2,
      title: 'Streaming service mobile app',
      category: {
        id: 2,
        name: 'Mobile development',
      },
      skills: [
        { id: 1, name: 'Java' },
        { id: 2, name: 'Android' },
        { id: 3, name: 'iOS' },
      ],
      available_time: 'Part-time',
      english_level: 'Upper-Intermediate',
    } as Job,
    job_owner: {
      id: 2,
      first_name: 'Adam',
      last_name: 'Smasher',
      profile_image: 'img/a3e51fce-fd90-429a-b2bc-a41a9ef2b3a1.jpg',
    } as User,
    hourly_rate: 40,
    status: OfferStatus.DECLINED,
    created_at: '2022-11-25T22:24:28.682Z',
  },
];

export const interviews: Interview[] = [
  {
    id: 1,
    job: {
      id: 1,
      title: 'Freelance platform',
      description: 'Create freelance platform',
      category: {
        id: 1,
        name: 'Web development',
      },
      skills: [
        { id: 1, name: 'JavaScript' },
        { id: 2, name: 'React' },
        { id: 3, name: 'Nest.js' },
      ],
      available_time: 'Full-time',
      english_level: 'Intermediate',
    } as Job,
    hourly_rate: 25,
    job_owner: {
      id: 1,
      first_name: 'Gerald',
      last_name: 'Dranis',
      profile_image: 'img/2815d6fd-f9ed-42af-8d71-fe033711e64e.jpg',
    } as User,
  },
];
