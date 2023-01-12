import { ContractsResponse } from 'redux/contracts/types';

import { Offer } from './request.types';

export enum ContractStatus {
  ACTIVE = 'Active',
  CLOSED = 'Closed',
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
