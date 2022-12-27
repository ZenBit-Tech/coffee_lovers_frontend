import { useParams } from 'react-router-dom';
import { useGetPostedJobDetailsQuery } from 'redux/services/jobsApi';
import { GetPostedJobDetailsResponse } from 'redux/types/jobs.types';

interface UsePostedJobDetailReturn {
  details?: GetPostedJobDetailsResponse;
  isLoading: boolean;
}

const usePostedJobDetail = (): UsePostedJobDetailReturn => {
  const { id } = useParams();
  const { data: details, isLoading } = useGetPostedJobDetailsQuery(id || '');

  return {
    details,
    isLoading,
  };
};

export default usePostedJobDetail;
