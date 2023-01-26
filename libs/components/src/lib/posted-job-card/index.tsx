import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  ExpandableText,
  InformationSticker,
  routes,
} from '@freelance/components';
import { postedJobsTestId } from '@freelance/constants';
import { JobStatus } from 'src/redux/types/jobs.types';
import { baseTheme } from 'src/styles/theme';

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
  'data-testid'?: string;
}

export const PostedJobCard: FC<PostedJobProps> = ({
  id,
  title,
  status,
  description,
  proposals,
  hired,
  ...props
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Wrapper theme={baseTheme} {...props}>
      <TitleDescriptionContainer>
        <TitleContainer>
          <StatusContainer>
            {status === JobStatus.PENDING && (
              <InformationSticker
                data-testid={postedJobsTestId.postedJobCardStatus}
              >
                {t('postedJobs.status.pending')}
              </InformationSticker>
            )}

            {status === JobStatus.IN_PROGRESS && (
              <InformationSticker
                success
                data-testid={postedJobsTestId.postedJobCardStatus}
              >
                {t('postedJobs.status.inProgress')}
              </InformationSticker>
            )}

            {status === JobStatus.FINISHED && (
              <InformationSticker
                primary
                data-testid={postedJobsTestId.postedJobCardStatus}
              >
                {t('postedJobs.status.finished')}
              </InformationSticker>
            )}
          </StatusContainer>
          <StyledTitle
            onClick={() => navigate(generatePath(routes.postedJob, { id }))}
            theme={baseTheme}
            data-testid={postedJobsTestId.postedJobCardTitle}
          >
            {title || ''}
          </StyledTitle>
        </TitleContainer>

        <Description theme={baseTheme}>
          <ExpandableText
            data-testid={postedJobsTestId.postedJobCardDescription}
          >
            {description}
          </ExpandableText>
        </Description>
      </TitleDescriptionContainer>

      {status !== JobStatus.FINISHED && (
        <ButtonsContainer>
          {status !== JobStatus.IN_PROGRESS && (
            <StyledAction
              onClick={() => navigate(generatePath(routes.jobUpdate, { id }))}
              theme={baseTheme}
            >
              {t('postedJobs.btn.edit')}
            </StyledAction>
          )}
          <StyledAction
            onClick={() => navigate(generatePath(routes.proposalsList, { id }))}
            theme={baseTheme}
            data-testid={postedJobsTestId.postedJobCardProposals}
          >
            {t('postedJobs.btn.proposals', {
              amount: proposals || defaultAmount,
            })}
          </StyledAction>
          {status !== JobStatus.PENDING && (
            <StyledAction
              onClick={() => navigate(generatePath(routes.postedJob, { id }))}
              theme={baseTheme}
              data-testid={postedJobsTestId.postedJobCardHired}
            >
              {t('postedJobs.btn.hired', { amount: hired || defaultAmount })}
            </StyledAction>
          )}
        </ButtonsContainer>
      )}
    </Wrapper>
  );
};
