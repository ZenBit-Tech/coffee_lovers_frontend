import { Job } from 'src/redux/types/jobs.types';

export interface Props {
  open: boolean;
  setOpen: (op: boolean) => void;
  freelancerId?: number;
  rate?: number;
}

export interface Conversation {
  id: number;
  job: Job;
}
