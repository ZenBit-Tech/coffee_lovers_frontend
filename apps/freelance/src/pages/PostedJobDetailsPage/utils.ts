import { HireItem } from 'redux/types/jobs.types';

import { contractStatusPriority, maxHiredCards } from './constants';

const getHiresSortCallback = (): ((a: HireItem, b: HireItem) => number) => {
  return (a: HireItem, b: HireItem) => {
    if (
      contractStatusPriority[a.contract.status] ===
      contractStatusPriority[b.contract.status]
    ) {
      return (
        new Date(b.contract.created_at).getTime() -
        new Date(a.contract.created_at).getTime()
      );
    }

    return (
      contractStatusPriority[a.contract.status] -
      contractStatusPriority[b.contract.status]
    );
  };
};

const getSearchedHires = (hires: HireItem[], search?: string): HireItem[] => {
  if (search) {
    return hires.filter(
      item =>
        `${item.freelancer.first_name} ${item.freelancer.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item?.freelancer?.position
          ?.toLowerCase()
          .includes(search.toLowerCase()),
    );
  }

  return hires;
};

export const setHiresPagination = (
  hires: HireItem[],
  offset: number,
): HireItem[] => {
  if (hires.length > maxHiredCards) {
    return hires.slice(offset, offset + maxHiredCards);
  }

  return hires;
};

export const getProccesedHires = (
  hires: HireItem[],
  search?: string,
): HireItem[] => {
  return getSearchedHires([...hires].sort(getHiresSortCallback()), search);
};
