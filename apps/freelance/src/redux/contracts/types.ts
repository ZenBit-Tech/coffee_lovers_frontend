import { Offer, OfferStatus } from 'redux/types/offers.types';

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
  status: Offer;
  end: Date;
  offer: {
    id: number;
    hourly_rate: number;
    status: OfferStatus;
    start: Date;
    created_at: string;
    job: {
      id: number;
      title: string;
      description: string;
      hourly_rate: number;
      available_time: string;
      english_level: string;
      duration: number;
      duration_amount: DurationAmount;
      status: string;
      created_at: string;
    };
    freelancer: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      profile_image: string;
      available_time: Date | null;
      description: string;
      hourly_rate: number;
      position: string;
      other_experience: string;
      english_level: string;
      role: string;
    };
    job_owner: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      profile_image: string | null;
      available_time: string;
      description: string;
      hourly_rate: number;
      position: string;
      other_experience: null | string;
      english_level: string;
      role: string;
    };
  };
}
