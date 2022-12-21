import { TFunction } from 'i18next';
import { JobStatus } from 'redux/types/jobs.types';

export enum SortOptions {
  STATUS = 'status',
  TITLE = 'title',
  PROPOSALS = 'proposals',
}

export enum SortResult {
  POSITIVE = 1,
  NEGATIVE = -1,
  EQUALS = 0,
}

export const jobStatusPriority = {
  [JobStatus.PENDING]: 1,
  [JobStatus.IN_PROGRESS]: 2,
  [JobStatus.FINISHED]: 3,
};

export const getSortOptions = (t: TFunction) => {
  return [
    { value: SortOptions.STATUS, label: t('postedJobs.sortOptions.status') },
    { value: SortOptions.TITLE, label: t('postedJobs.sortOptions.title') },
    {
      value: SortOptions.PROPOSALS,
      label: t('postedJobs.sortOptions.proposals'),
    },
  ];
};

export const defaultSortOptionValue = SortOptions.STATUS;
export const finishedJobProposalsCount = 0;
