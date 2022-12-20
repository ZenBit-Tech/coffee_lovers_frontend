import { TFunction } from 'i18next';
import { JobStatus } from 'redux/types/jobs.types';

export enum SortOptions {
  STATUS = 'status',
}

export const jobStatusPriority = {
  [JobStatus.PENDING]: 1,
  [JobStatus.IN_PROGRESS]: 2,
  [JobStatus.FINISHED]: 3,
};

export const getSortOptions = (t: TFunction) => {
  return [
    { value: SortOptions.STATUS, label: t('postedJobs.sortOptions.status') },
  ];
};

export const defaultSortOptionValue = SortOptions.STATUS;
