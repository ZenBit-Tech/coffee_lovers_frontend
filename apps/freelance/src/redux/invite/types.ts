export interface PostRequest {
  data: {
    status?: Request;
    hourly_rate?: number;
    start?: Date | string;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}

export enum Request {
  pending = 'Pending',
  accepted = 'Accepted',
  declined = 'Declined',
}
