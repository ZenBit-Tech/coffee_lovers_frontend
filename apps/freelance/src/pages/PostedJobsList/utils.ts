import { GetPostedJobsResponse } from 'redux/types/jobs.types';

import { jobStatusPriority, SortOptions } from './constants';

export const getSortPostedJobsCallback = (
  sort: SortOptions,
): ((a: GetPostedJobsResponse, b: GetPostedJobsResponse) => number) => {
  switch (sort) {
    default:
      return (a: GetPostedJobsResponse, b: GetPostedJobsResponse) => {
        return jobStatusPriority[a.status] - jobStatusPriority[b.status];
      };
  }
};
