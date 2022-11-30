import { ProposalCard } from '@freelance/components';

import { mockProjectName, mockProposals } from './constants';
import { ListContainer, StyledProjectName, Wrapper } from './styles';

const ProposalsList = () => {
  return (
    <Wrapper>
      <StyledProjectName>{mockProjectName}</StyledProjectName>
      <ListContainer>
        {mockProposals.map(proposal => (
          <ProposalCard
            key={proposal.id}
            user={proposal.user}
            hourlyRate={proposal.hourly_rate}
            availableTime={proposal.available_time}
            coverLetter={proposal.cover_letter}
          />
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default ProposalsList;
