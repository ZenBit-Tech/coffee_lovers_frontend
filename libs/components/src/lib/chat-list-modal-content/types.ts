import { Dispatch, SetStateAction } from 'react';
import { Job } from 'src/redux/types/jobs.types';
import { User } from 'src/redux/types/user.types';

export interface Props {
  invitation: {
    data: Conversation[];
    freelancer: User;
  };
  setPage: Dispatch<SetStateAction<string>>;
}
export interface Conversation {
  id: number;
  job: Job;
}
