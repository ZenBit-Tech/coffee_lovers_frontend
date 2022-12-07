import { useParams } from 'react-router-dom';
import { useGetJobProposalsQuery } from 'redux/services/jobsApi';
import { GetJobProposalsResponse } from 'redux/types/jobs.types';

interface UseProposalsListResponse {
  data: GetJobProposalsResponse | undefined;
  isSuccess: boolean;
  isLoading: boolean;
}

type ProposalsListParams = {
  id: string;
};

const useProposalsList = (): UseProposalsListResponse => {
  const { id } = useParams<keyof ProposalsListParams>() as ProposalsListParams;
  const { data, isSuccess, isLoading } = useGetJobProposalsQuery(id);

  return {
    data,
    isSuccess,
    isLoading,
  };
};

export default useProposalsList;
