import { Job } from 'redux/types/jobs.types';

import { jobStatusPriority, SortOptions } from './constants';

export const getSortPostedJobsCallback = (
  sort: SortOptions,
): ((a: Job, b: Job) => number) => {
  switch (sort) {
    default:
      return (a: Job, b: Job) => {
        return jobStatusPriority[a.status] - jobStatusPriority[b.status];
      };
  }
};
