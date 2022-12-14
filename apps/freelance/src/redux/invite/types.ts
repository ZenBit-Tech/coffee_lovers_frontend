export interface PostRequest {
  data: {
    type?: Request;
    hourly_rate?: number;
    start?: Date | string;
    cover_letter?: string | null;
  };
  freelancer?: number;
  jobId?: number | null;
}

export enum Request {
  proposal = 'Proposal',
  interview = 'Interview',
}
