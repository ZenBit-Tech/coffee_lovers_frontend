import { FC } from 'react';
import { t } from 'i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ExpandableText,
  InformationSticker,
  routes,
} from '@freelance/components';
import { JobStatus } from 'src/redux/types/jobs.types';

import { defaultAmount } from './constants';
import {
  ButtonsContainer,
  Description,
  StatusContainer,
  StyledAction,
  StyledTitle,
  TitleContainer,
  TitleDescriptionContainer,
  Wrapper,
} from './styles';

interface PostedJobProps {
  id: number;
  title?: string;
  status?: JobStatus;
  description?: string;
  proposals?: number;
  hired?: number;
}

export const PostedJobCard: FC<PostedJobProps> = ({
  id,
  title,
  status,
  description,
  proposals,
  hired,
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <TitleDescriptionContainer>
        <TitleContainer>
          <StatusContainer>
            {status === JobStatus.PENDING && (
              <InformationSticker>
                {t('postedJobs.status.pending')}
              </InformationSticker>
            )}

            {status === JobStatus.IN_PROGRESS && (
              <InformationSticker success>
                {t('postedJobs.status.inProgress')}
              </InformationSticker>
            )}

            {status === JobStatus.FINISHED && (
              <InformationSticker primary>
                {t('postedJobs.status.finished')}
              </InformationSticker>
            )}
          </StatusContainer>
          <StyledTitle
            onClick={() => navigate(generatePath(routes.postedJob, { id }))}
          >
            {title || ''}
          </StyledTitle>
        </TitleContainer>

        <Description>
          <ExpandableText>{description}</ExpandableText>
        </Description>
      </TitleDescriptionContainer>

      {status !== JobStatus.FINISHED && (
        <ButtonsContainer>
          {status !== JobStatus.IN_PROGRESS && (
            <StyledAction
              onClick={() => navigate(generatePath(routes.jobUpdate, { id }))}
            >
              {t('postedJobs.btn.edit')}
            </StyledAction>
          )}
          <StyledAction
            onClick={() => navigate(generatePath(routes.proposalsList, { id }))}
          >
            {t('postedJobs.btn.proposals', {
              amount: proposals || defaultAmount,
            })}
          </StyledAction>
          {status !== JobStatus.PENDING && (
            <StyledAction
              onClick={() => navigate(generatePath(routes.postedJob, { id }))}
            >
              {t('postedJobs.btn.hired', { amount: hired || defaultAmount })}
            </StyledAction>
          )}
        </ButtonsContainer>
      )}
    </Wrapper>
  );
};
