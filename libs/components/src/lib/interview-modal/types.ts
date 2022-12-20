import { Job } from 'src/redux/types/jobs.types';

export interface Props {
  open: boolean;
  setOpen: (op: boolean) => void;
  description?: string;
  hourly_rate?: number;
  id?: number;
}

export interface Conversation {
  id: number;
  job: Job;
}
