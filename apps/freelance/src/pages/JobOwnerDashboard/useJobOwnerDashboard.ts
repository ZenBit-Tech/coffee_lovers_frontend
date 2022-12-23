import { useEffect, useState } from 'react';
import { useGetPostedJobsQuery } from 'redux/services/jobsApi';
import { useGetUserInfoQuery } from 'redux/services/user';
import { GetPostedJobsResponse } from 'redux/types/jobs.types';
import { User } from 'redux/types/user.types';

import { defaultAmountOfJobs } from './constants';

interface UseJobOwnerDashboardReturn {
  user?: User;
  jobList?: GetPostedJobsResponse[];
  isShowAllJobs: boolean;
  jobsListSizeHandler: () => void;
  isLoading: boolean;
}

const useJobOwnerDashboard = (): UseJobOwnerDashboardReturn => {
  const [jobList, setJobList] = useState<GetPostedJobsResponse[]>();
  const [isShowAllJobs, setIsShowAllJobs] = useState<boolean>(false);
  const { data: user, isLoading: userLoading } = useGetUserInfoQuery();
  const { data: list, isLoading: listLoading } = useGetPostedJobsQuery();

  useEffect(() => {
    setSizedJobList();
  }, [list]);

  const jobsListSizeHandler = (): void => {
    setSizedJobList();
    setIsShowAllJobs(prev => !prev);
  };

  const setSizedJobList = (): void => {
    if (list) {
      setJobList(isShowAllJobs ? list.slice(0, defaultAmountOfJobs) : list);
    }
  };

  return {
    user,
    jobList,
    isShowAllJobs,
    jobsListSizeHandler,
    isLoading: listLoading || userLoading,
  };
};

export default useJobOwnerDashboard;
