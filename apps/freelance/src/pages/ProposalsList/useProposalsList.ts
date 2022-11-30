import { useParams } from 'react-router-dom';
import { useGetJobProposalsQuery } from 'redux/services/jobsApi';
import { GetJobProposalsResponse } from 'redux/types/jobs.types';

interface UseProposalsListResponse {
  data: GetJobProposalsResponse | undefined;
  isSuccess: boolean;
  isLoading: boolean;
}

const useProposalsList = (): UseProposalsListResponse => {
  const { id } = useParams();
  const { data, isSuccess, isLoading } = useGetJobProposalsQuery(id || '');

  return {
    data,
    isSuccess,
    isLoading,
  };
};

export default useProposalsList;
