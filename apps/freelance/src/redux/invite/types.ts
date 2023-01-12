import { type Dayjs } from 'dayjs';
import { Job } from 'redux/types/jobs.types';
import { User } from 'redux/types/user.types';

export enum Request {
  pending = 'Pending',
  accepted = 'Accepted',
  declined = 'Declined',
}

export enum Invite {
  PROPOSAL = 'Proposal',
  INTERVIEW = 'Interview',
}
export interface PostRequest {
  data: {
    type?: Invite;
    hourly_rate: number | string;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}

export interface PostOffer {
  data: {
    status?: Request;
    hourly_rate: number | string;
    start?: Dayjs | null | string;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}

export interface GetOffersResponse {
  id: number;
  status: string;
  hourly_rate: number;
  start: string;
  created_at: string;
  job: Job;
  job_owner: User;
}
