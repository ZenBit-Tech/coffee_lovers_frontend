import { type Dayjs } from 'dayjs';

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
    start?: Dayjs | null;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}
