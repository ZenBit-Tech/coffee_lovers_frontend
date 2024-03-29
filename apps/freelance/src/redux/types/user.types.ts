import { Job } from './jobs.types';
import { Property } from './properties.types';

export interface PasswordResetPayload {
  password: string;
  key: string;
}

export interface UserError {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export interface FreelancerListItem extends User {
  isFavorite?: object | boolean;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  available_time: string;
  description: string;
  hourly_rate: number;
  position: string;
  other_experience: string;
  english_level: string;
  category: Property;
  role: Role;
  skills: Property[];
  reviews_amount?: number;
  average_rating?: number;
}

export interface UpdateUser {
  first_name?: string;
  last_name?: string;
  available_time?: string;
  description?: string;
  hourly_rate?: number;
  position?: string;
  category?: number;
  english_level?: string;
  other_experience?: string;
  skills?: number[];
  role?: string;
}

export interface AddWorkhistory {
  work_history_descr?: string;
  work_history_from?: string;
  work_history_to?: string;
}

export interface AddFavorites {
  is_favorite: boolean;
  id: number;
}

export interface GetFavorites {
  totalCount: number;
  favorites: Favorites[];
}

export interface Favorites {
  id: number;
  freelancer: User;
}

export interface GetWorkhistory extends AddWorkhistory {
  id?: number;
}

export interface AddEducation {
  education_descr: string;
  education_from: string;
  education_to: string;
}

export interface GetEducation extends AddEducation {
  id?: number;
}

export type Role = 'Freelancer' | 'JobOwner' | 'Visitor';

export interface SetProfileImageResponse {
  file: string;
}

export interface GetUserProposals {
  proposals: {
    id: number;
    hourly_rate: number;
    cover_letter: string;
    job: {
      id: number;
      title: string;
      description: string;
      hourly_rate: number;
      available_time: string;
      english_level: string;
      created_at: string;
    };
  }[];
}

export interface ProposalByUserId {
  id: number;
  hourly_rate: number;
  cover_letter: string;
  job: {
    id: number;
    title: string;
    description: string;
    hourly_rate: number;
    available_time: string;
    english_level: string;
    duration: number;
    duration_amount: string;
    status: string;
    created_at: string;
  };
}

export interface FreelancerQuery {
  skills?: number[];
  categories?: number[];
  hourly_rate_start?: number;
  hourly_rate_end?: number;
  available_time?: string;
  english_level?: string;
  search?: string;
  page?: number;
  take?: number;
}

export interface FreelancerFavQuery {
  take?: number;
  page?: number;
}

export interface FreelancerDataById extends User {
  workHistory?: GetWorkhistory[];
  educations?: GetEducation[];
}

export interface UserRatingDataById {
  id: number;
  created_at: string;
  rating: number;
  rating_comment: string;
  job: Job;
  job_owner?: User;
  freelancer?: User;
}

export interface SetUserRating {
  rating: number;
  rating_comment: string;
  freelancer_id?: number;
  job_owner_id?: number;
  job_id?: number;
}

export type JobOwnerId = number | undefined;
