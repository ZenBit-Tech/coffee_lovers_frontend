export const filterTop = '45px';
export const filterRight = '0px';

// mock data
interface User {
  first_name: string;
  last_name: string;
}

interface Job {
  id: number;
  owner: User;
  title: string;
  description: string;
  date: Date;
  category: string;
  duration: string;
  rate: number;
}

export const jobsList: Job[] = [
  {
    id: 1,
    title: 'Job 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    owner: { first_name: 'John', last_name: 'Doe' },
    category: 'Front-end',
    date: new Date('2022-11-10'),
    duration: '1 week',
    rate: 40,
  },
  {
    id: 2,
    title: 'Job 2',
    description: 'description 2',
    owner: { first_name: 'David', last_name: 'Micks' },
    category: 'Back-end',
    date: new Date('2022-11-15'),
    duration: '1 month',
    rate: 45,
  },
  {
    id: 3,
    title: 'Job 3',
    description: 'description 3',
    owner: { first_name: 'Andrew', last_name: 'Bean' },
    category: 'Mobile development',
    date: new Date('2022-11-20'),
    duration: '1 week',
    rate: 55,
  },
];
