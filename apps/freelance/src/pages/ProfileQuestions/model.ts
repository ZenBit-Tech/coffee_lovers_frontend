import { Moment } from 'moment';

export interface IProfileQuestions1 {
  [key: string]: string | number | object | undefined;
  available_time: string;
  description: string;
  hourly_rate: number;
  position: string;
  education: educationProps;
  work_history_wrapper: workProps;
}

interface educationProps {
  information_about_education: string;
  education_from: Moment;
  education_to: Moment;
}
interface workProps {
  work_history: string;
  work_from: Moment;
  work_to: Moment;
}

export interface IProfileQuestions2 {
  [key: string]: string | number | object | undefined;
  category: string;
  english_level: string;
  other_experience: string;
  skills: [];
}
