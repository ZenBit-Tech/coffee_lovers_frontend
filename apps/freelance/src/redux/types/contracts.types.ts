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
  status: ContractStatus;
  end: string;
  offer: {
    id: number;
    hourly_rate: number;
    status: OfferStatus;
    start: string;
    created_at: string;
    job: Job;
    freelancer: User;
    job_owner: User;
  };
}

export interface Contract {
  id: number;
  status: ContractStatus;
  offer: Offer;
  created_at: string;
  end: string;
}

export interface GetHiresContracts {
  totalCount: number;
  allHiredFreelancers: ContractsResponse[];
}

export interface HiresQuery {
  take?: number;
  page?: number;
}
