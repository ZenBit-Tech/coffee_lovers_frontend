import { FreelancerDataById } from 'src/redux/types/user.types';
import {
  AddEducation,
  AddWorkhistory,
  GetEducation,
  GetWorkhistory,
  User,
} from 'src/redux/types/user.types';

export interface mockWork extends AddWorkhistory {
  id?: number;
}
export interface mockEducation extends AddEducation {
  id: number;
}

export const mockUserData: FreelancerDataById = {
  id: 5,
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
  role: 'Freelancer',
  position: 'Software engeneer',
  skills: [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 4, name: 'Web development' },
  ],
  educations: [
    {
      id: 1,
      education_descr:
        'Bachelors in International Business Administration. LCC IU',
      education_from: '2010',
      education_to: '2014',
    },
    {
      id: 2,
      education_descr: 'Harward IU',
      education_from: '2015',
      education_to: '2018',
    },
  ],
  workHistory: [
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
      work_history_descr: 'Boudin Bakery',
      work_history_from: '2013',
      work_history_to: '2014',
    },
  ],
};

export const mockUsers: User[] = [
  {
    id: 1,
    email: 'johndoe@test.com',
    first_name: 'John',
    last_name: 'Doe',
    profile_image: 'img/660ba6e4-557b-4033-8e79-656ea305f342.jpg',
  } as User,
  {
    id: 2,
    email: 'adampowers@test.com',
    first_name: 'Adam',
    last_name: 'Powers',
    profile_image: 'img/660ba6e4-557b-4033-8779-656ea304f342.jpg',
  } as User,
];

export const mockOneUser: User = {
  id: 5,
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
  role: 'Freelancer',
  position: 'Software engeneer',
  skills: [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 4, name: 'Web development' },
  ],
};

export const mockFreelancerProfileData: User = {
  id: 123,
  email: 'test@test.com',
  first_name: 'John',
  last_name: 'Doe',
  profile_image: 'https://localhost:4200/image.img',
  role: 'Freelancer',
  available_time: 'Part-Time',
  description: 'Front-end developer',
  position: 'Front-end developer',
  hourly_rate: 30,
  other_experience: 'English teacher',
  english_level: 'Upper-Intermediate',
  category: {
    id: 1,
    name: 'Front-end development',
  },
  skills: [
    {
      id: 1,
      name: 'HTML',
    },
  ],
};

export const mockFreelancerWH: GetWorkhistory[] = [
  {
    id: 1,
    work_history_descr: 'Full-Stack Developer at Apple inc',
    work_history_from: '2016',
    work_history_to: '2022',
  },
];

export const mockFreelacerEducation: GetEducation[] = [
  {
    id: 1,
    education_descr:
      'Bachelors in International Business Administration. LCC IU',
    education_from: '2010',
    education_to: '2014',
  },
];
