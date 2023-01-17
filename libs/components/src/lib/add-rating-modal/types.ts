import { Dispatch, SetStateAction } from 'react';
import { Contract } from 'src/redux/types/contracts.types';

export interface IRatingModal {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  freelancer_id: number;
  contract: Contract;
  job_id?: number;
}
