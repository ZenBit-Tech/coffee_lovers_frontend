import { GetPostedJobsResponse, JobStatus } from 'redux/types/jobs.types';

import {
  finishedJobProposalsCount,
  jobStatusPriority,
  SortOptions,
  SortResult,
} from './constants';

const sortByTitleCallback = (
  a: GetPostedJobsResponse,
  b: GetPostedJobsResponse,
) => {
  if (a.title > b.title) return SortResult.POSITIVE;
  if (a.title < b.title) return SortResult.NEGATIVE;

  return SortResult.EQUALS;
};

const sortByStatusCallback = (
  a: GetPostedJobsResponse,
  b: GetPostedJobsResponse,
) => {
  if (jobStatusPriority[a.status] === jobStatusPriority[b.status])
    return sortByTitleCallback(a, b);

  return jobStatusPriority[a.status] - jobStatusPriority[b.status];
};

export const getSortPostedJobsCallback = (
  sort: SortOptions,
): ((a: GetPostedJobsResponse, b: GetPostedJobsResponse) => number) => {
  switch (sort) {
    case SortOptions.TITLE:
      return sortByTitleCallback;

    case SortOptions.PROPOSALS:
      return (a: GetPostedJobsResponse, b: GetPostedJobsResponse) => {
        const aCount =
          a.status === JobStatus.FINISHED
            ? finishedJobProposalsCount
            : a.proposalsCount;
        const bCount =
          b.status === JobStatus.FINISHED
            ? finishedJobProposalsCount
            : b.proposalsCount;

        if (aCount === bCount) return sortByStatusCallback(a, b);

        return bCount - aCount;
      };

    default:
      return sortByStatusCallback;
  }
};
