import { Property } from './properties.types';
import { User } from './user.types';

export interface Job {
  id: number;
  title?: string;
  description?: string;
  hourly_rate?: number;
  available_time?: number;
  english_level?: string;
  owner: User;
  category: Property;
  skills: Property[];
}

export interface GetJobParams {
  limit?: number;
  offset?: number;
}

export interface FindJobsResponse {
  jobs: Job[];
  meta: {
    totalCount: number;
  };
}
