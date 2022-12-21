export interface PostRequest {
  data: {
    type: Request;
    hourly_rate: number;
    job_id: number;
    cover_letter: string;
  };
  freelancer: number;
}

enum Request {
  'Proposal',
  'Interview',
}
