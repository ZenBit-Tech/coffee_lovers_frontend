import { FC } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import {
  InformationSticker,
  PrimaryButton,
  routes,
} from '@freelance/components';
import { JobStatus } from 'src/redux/types/jobs.types';

import { defaultAmount } from './constants';
import {
  AmountButton,
  ButtonsContainer,
  Description,
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
          {status === JobStatus.PENDING && (
            <InformationSticker>
              {t('postedJobs.status.pending')}
            </InformationSticker>
          )}

          {status === JobStatus.IN_PROGRESS && (
            <InformationSticker>
              {t('postedJobs.status.inProgress')}
            </InformationSticker>
          )}

          {status === JobStatus.FINISHED && (
            <InformationSticker>
              {t('postedJobs.status.finished')}
            </InformationSticker>
          )}
          <StyledTitle>{title || ''}</StyledTitle>
        </TitleContainer>

        <Description>{description}</Description>
      </TitleDescriptionContainer>

      <ButtonsContainer>
        <PrimaryButton>{t('postedJobs.btn.edit')}</PrimaryButton>
        <AmountButton
          onClick={() =>
            navigate(routes.proposalsList.replace(':id', String(id)))
          }
        >
          {t('postedJobs.btn.proposals', {
            amount: proposals || defaultAmount,
          })}
        </AmountButton>
        <AmountButton>
          {t('postedJobs.btn.hired', { amount: hired || defaultAmount })}
        </AmountButton>
      </ButtonsContainer>
    </Wrapper>
  );
};
