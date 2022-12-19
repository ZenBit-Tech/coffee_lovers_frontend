import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { useGetJobProposalsQuery } from 'redux/services/jobsApi';
import { GetJobProposalsResponse } from 'redux/types/jobs.types';

interface UseProposalsListResponse {
  data: GetJobProposalsResponse | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  clickHandler: (id: number) => void;
}

type ProposalsListParams = {
  id: string;
};

const useProposalsList = (): UseProposalsListResponse => {
  const { id } = useParams<keyof ProposalsListParams>() as ProposalsListParams;
  const { data, isSuccess, isLoading } = useGetJobProposalsQuery(id);
  const navigate = useNavigate();

  return {
    data,
    isSuccess,
    isLoading,
    clickHandler: (id: number) =>
      navigate(routes.freelancerInfo.replace(':id', String(id))),
  };
};

export default useProposalsList;
