import { ContractStatus } from 'redux/types/contracts.types';

export const maxHiredCards = 5;
export const defaultOffset = 0;

export const contractStatusPriority = {
  [ContractStatus.ACTIVE]: 1,
  [ContractStatus.CLOSED]: 2,
};
