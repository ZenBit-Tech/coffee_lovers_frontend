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
  created_at: string;
  category?: Property;
  skills?: Property[];
}

export interface GetJobParams {
  limit?: number;
  offset?: number;
  skills?: number[];
  categories?: number[];
  hourly_rate_start?: number;
  hourly_rate_end?: number;
  available_time?: string;
  english_level?: string;
  search?: string;
}

export interface FindJobsResponse {
  jobs: Job[];
  meta: {
    totalCount: number;
  };
}

export interface Proposal {
  id: number;
  hourly_rate: number;
  cover_letter: string;
  user?: User;
}

export interface GetJobProposalsResponse {
  job: Job;
  proposals: Proposal[];
}
