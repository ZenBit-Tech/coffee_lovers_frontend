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
