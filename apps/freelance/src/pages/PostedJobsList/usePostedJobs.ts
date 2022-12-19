import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { useGetPostedJobsQuery } from 'redux/services/jobsApi';
import { GetPostedJobsResponse } from 'redux/types/jobs.types';

interface usePostedJobsReturn {
  t: TFunction;
  postJobHandler: () => void;
  postedJobs?: GetPostedJobsResponse[];
  isJobsLoading: boolean;
}

const usePostedJobs = (): usePostedJobsReturn => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: postedJobs, isLoading: isJobsLoading } =
    useGetPostedJobsQuery();

  return {
    t,
    postJobHandler: () => navigate(routes.jobPost),
    postedJobs,
    isJobsLoading,
  };
};

export default usePostedJobs;
