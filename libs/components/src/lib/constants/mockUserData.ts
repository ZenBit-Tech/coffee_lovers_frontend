import { AddEducation, AddWorkhistory, User } from 'src/redux/types/user.types';

export interface mockWork extends AddWorkhistory {
  id?: number;
}
export interface mockEducation extends AddEducation {
  id: number;
}

export const mockUserData: User = {
  id: 1,
  email: 'test@test.com',
  first_name: 'John',
  last_name: 'Doe',
  profile_image: '',
  available_time: 'Full-Time',
  description:
    'I am a very energetic and self-motivated person. I always strive for the best. Like to listen to music',
  hourly_rate: 12,
  other_experience: 'Scrum experience',
  english_level: 'Upper-Intermediate',
  category: {
    id: 1,
    name: 'Front-end',
  },
  position: 'Software engeneer',
  skills: [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 4, name: 'Web development' },
  ],
  role: 'Freelancer',
};

export const mockEducationData: mockEducation[] = [
  {
    id: 1,
    education_descr:
      'Bachelors in International Business Administration. LCC IU',
    education_from: '2010',
    education_to: '2014',
  },
  {
    id: 2,
    education_descr: 'Masters in Computer Science. Harward IU',
    education_from: '2015',
    education_to: '2018',
  },
];

export const mockWorkHistoryData: mockWork[] = [
  {
    id: 1,
    work_history_descr: 'Full-Stack Developer at Apple inc',
    work_history_from: '2016',
    work_history_to: '2022',
  },
  {
    id: 2,
    work_history_descr: 'Front-End Developer at Twitter inc',
    work_history_from: '2015',
    work_history_to: '2016',
  },
  {
    id: 3,
    work_history_descr: 'Service Clerk at Boudin Bakery',
    work_history_from: '2013',
    work_history_to: '2014',
  },
];
