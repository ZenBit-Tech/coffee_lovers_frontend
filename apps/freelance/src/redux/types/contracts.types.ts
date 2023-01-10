import { Job } from './jobs.types';
import { Offer, OfferStatus } from './request.types';
import { User } from './user.types';

export enum ContractStatus {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
}

export interface ContractsResponse {
  id: number;
  created_at: string;
  status: Offer;
  end: Date;
  offer: {
    id: number;
    hourly_rate: number;
    status: OfferStatus;
    start: Date;
    created_at: string;
    job: Job;
    freelancer: User;
    job_owner: User;
  };
}
