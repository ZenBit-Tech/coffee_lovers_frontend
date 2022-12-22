import { GetJobResponse as GetJobResponsea } from '@freelance/components';

export interface Error {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export interface JobPost {
  title: string;
  description: string;
  hourly_rate: number;
  category: number;
  english_level: string;
  skills: number[];
  duration: number;
  duration_amount: string;
  available_time: string;
}

export interface GetJobResponse {
  job: GetJobResponsea;
}
