import { ContractStatus } from 'redux/types/contracts.types';
import { Job } from 'redux/types/jobs.types';
import { OfferStatus } from 'redux/types/request.types';
import { User } from 'redux/types/user.types';

export interface Error {
  data: {
    message: string;
    statusCode: number;
    error: string;
  };
  status: number;
}

export enum DurationAmount {
  MONTH = 'Month',
  WEEK = 'Week',
}

export interface ContractsResponse {
  id: number;
  created_at: string;
  status: ContractStatus;
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
