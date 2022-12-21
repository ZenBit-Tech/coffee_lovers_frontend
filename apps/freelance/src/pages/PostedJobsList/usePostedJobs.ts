import { useState } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { useGetPostedJobsQuery } from 'redux/services/jobsApi';
import { GetPostedJobsResponse } from 'redux/types/jobs.types';

import { defaultSortOptionValue, SortOptions } from './constants';
import { getSortPostedJobsCallback } from './utils';

interface usePostedJobsReturn {
  t: TFunction;
  postJobHandler: () => void;
  postedJobs?: GetPostedJobsResponse[];
  isJobsLoading: boolean;
  sort: SortOptions;
  changeSort: (value: SortOptions) => void;
}

const usePostedJobs = (): usePostedJobsReturn => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortOptions>(defaultSortOptionValue);
  const { data: postedJobs, isLoading: isJobsLoading } =
    useGetPostedJobsQuery();

  const changeSort = (value: SortOptions) => {
    setSort(value);
  };

  return {
    t,
    postJobHandler: () => navigate(routes.jobPost),
    postedJobs:
      postedJobs && [...postedJobs].sort(getSortPostedJobsCallback(sort)),
    isJobsLoading,
    sort,
    changeSort,
  };
};

export default usePostedJobs;
