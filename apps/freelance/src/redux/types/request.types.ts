import { type Dayjs } from 'dayjs';

import { Job } from './jobs.types';
import { User } from './user.types';

export enum OfferStatus {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  PENDING = 'Pending',
}

export enum RequestType {
  PROPOSAL = 'Proposal',
  INTERVIEW = 'Interview',
}

export interface Offer {
  id: number;
  job: Job;
  job_owner: User;
  freelancer: User;
  hourly_rate: number;
  status: OfferStatus;
  created_at: string;
  start: string;
}

export interface Interview {
  id: number;
  job: Job;
  job_owner: User;
  hourly_rate: number;
  created_at: string;
}

export interface PostRequest {
  data: {
    type?: RequestType;
    hourly_rate: number | string;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}

export interface PostOffer {
  data: {
    hourly_rate: number | string;
    start?: Dayjs | null | string;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}
