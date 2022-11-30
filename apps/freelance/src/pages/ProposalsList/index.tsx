import { Spin } from 'antd';
import { ProposalCard } from '@freelance/components';

import {
  ListContainer,
  SpinContainer,
  StyledProjectName,
  Wrapper,
} from './styles';
import useProposalsList from './useProposalsList';

const ProposalsList = () => {
  const { data, isLoading, isSuccess } = useProposalsList();

  if (isLoading) {
    return (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    );
  }

  return (
    <Wrapper>
      {isSuccess && (
        <>
          <StyledProjectName>{data?.job.title}</StyledProjectName>
          <ListContainer>
            {data?.proposals.map(proposal => (
              <ProposalCard
                key={proposal.id}
                user={proposal.user}
                hourlyRate={proposal.hourly_rate}
                availableTime={proposal.user?.available_time}
                coverLetter={proposal.cover_letter}
              />
            ))}
          </ListContainer>
        </>
      )}
    </Wrapper>
  );
};

export default ProposalsList;
