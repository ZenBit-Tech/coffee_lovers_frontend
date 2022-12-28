import { Job } from './jobs.types';
import { User } from './user.types';

export enum OfferStatus {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  PENDING = 'Pending',
}

export interface Offer {
  id: number;
  job: Job;
  job_owner: User;
  freelancer: User;
  hourly_rate: number;
  status: OfferStatus;
  created_at: string;
}

export interface Interview {
  id: number;
  job: Job;
  job_owner: User;
  hourly_rate: number;
}
