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

export interface GetPostedJobsResponse {
  id: number;
  title: string;
  description: string;
  hourly_rate: number;
  available_time: string;
  english_level: string;
  created_at: string;
  category: Property;
  proposalsCount: number;
}

export interface IJobProposal {
  job: number;
  hourly_rate: number;
  cover_letter: string;
}

export interface IProposalResponse {
  job?: {
    id?: number;
    title?: string;
    description?: string;
    hourly_rate?: number;
    available_time?: number;
    english_level?: string;
    created_at?: Date;
    owner?: {
      id?: number;
      email?: string;
      password?: string;
      first_name?: string;
      last_name?: string;
      profile_image?: string;
      is_google?: boolean;
      reset_password_key: string;
      available_time?: number | null;
      description?: string;
      hourly_rate?: number;
      position?: string | null;
      other_experience?: null;
      english_level?: null;
      category_id: number | null;
      role?: string;
    };
  };
  proposals?: [
    {
      id?: number;
      hourly_rate?: number;
      cover_letter?: string;
      user?: {
        id?: number;
        email?: string;
        first_name?: string;
        last_name?: string;
        profile_image?: null;
        is_google?: boolean;
        reset_password_key: string;
        available_time?: number | null;
        description?: string;
        hourly_rate?: number;
        position?: string | null;
        other_experience?: null;
        english_level?: null;
        category_id: number | null;
        role?: string;
      };
    },
  ];
}
