import { Dispatch, SetStateAction } from 'react';
import { Contract } from 'src/redux/types/contracts.types';

export interface IRatingModal {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  contract: Contract;
  freelancer_id?: number;
  job_owner_id?: number;
  job_id?: number;
}
