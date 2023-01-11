import { t } from 'i18next';
import { Empty, ProposalCard } from '@freelance/components';

import { ListContainer, StyledProjectName, Wrapper } from './styles';
import useProposalsList from './useProposalsList';

const ProposalsList = () => {
  const { data, isLoading, isSuccess, clickHandler } = useProposalsList();

  return (
    <Wrapper isLoading={isLoading} isSuccess={isSuccess}>
      <StyledProjectName>{data?.job.title}</StyledProjectName>
      <ListContainer>
        {data?.proposals.map(proposal => (
          <ProposalCard
            onClick={() => clickHandler(proposal.user?.id)}
            key={proposal.id}
            user={proposal.user}
            hourlyRate={proposal.hourly_rate}
            availableTime={proposal.user?.available_time}
            coverLetter={proposal.cover_letter}
          />
        ))}
      </ListContainer>
      {!data?.proposals.length && (
        <Empty description={t('proposalsList.empty_placeholder')} />
      )}
    </Wrapper>
  );
};

export default ProposalsList;
