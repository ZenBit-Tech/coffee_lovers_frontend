import { FC } from 'react';
import {
  Avatar,
  DangerButton,
  ExpandableText,
  InformationSticker,
  SecondaryButton,
  SuccessButton,
} from '@freelance/components';
import { Interview, Offer, OfferStatus } from 'src/redux/types/request.types';
import { getFileUrl } from 'src/utils/api';

import { avatarSize } from './constants';
import {
  DescriptionContainer,
  JobContainer,
  JobDetailsBottom,
  JobDetailsContainer,
  JobDetailsTop,
  JobDetailsTopLeftSide,
  JobDetailsTopRightSide,
  LeftSide,
  RightSide,
  StyledJobOwnerName,
  StyledJobTitle,
  Wrapper,
} from './styles';
import useOfferInterviewCard from './useOfferInterviewCard';

interface OfferInterviewCardProps {
  item: Offer | Interview;
}

export const OfferInterviewCard: FC<OfferInterviewCardProps> = ({ item }) => {
  const {
    t,
    confirmAcceptOffer,
    confirmDeclineOffer,
    confirmDeleteInterview,
    jobClickHandler,
  } = useOfferInterviewCard(item.id);

  return (
    <Wrapper>
      <LeftSide>
        <JobContainer>
          <Avatar
            src={getFileUrl(item.job_owner.profile_image)}
            size={avatarSize}
          />
          <JobDetailsContainer>
            <JobDetailsTop>
              <JobDetailsTopLeftSide>
                <StyledJobTitle onClick={() => jobClickHandler(item.job.id)}>
                  {item.job.title}
                </StyledJobTitle>
                <StyledJobOwnerName>
                  {`${item.job_owner.first_name} ${item.job_owner.last_name}`}
                </StyledJobOwnerName>
              </JobDetailsTopLeftSide>

              <JobDetailsTopRightSide>
                <InformationSticker
                  children={t('offers.hrly_rate', {
                    rate: item.hourly_rate,
                  })}
                />
                {(item as Offer)?.status && (
                  <InformationSticker
                    success={(item as Offer).status === OfferStatus.ACCEPTED}
                    danger={(item as Offer).status === OfferStatus.DECLINED}
                    primary={(item as Offer).status === OfferStatus.PENDING}
                  >
                    {(item as Offer).status}
                  </InformationSticker>
                )}
              </JobDetailsTopRightSide>
            </JobDetailsTop>

            <JobDetailsBottom>
              {item.job.category && (
                <InformationSticker>
                  {item.job.category.name}
                </InformationSticker>
              )}

              {item.job.skills?.map(skill => (
                <InformationSticker key={skill.id}>
                  {skill.name}
                </InformationSticker>
              ))}

              {item.job?.available_time && (
                <InformationSticker>
                  {item.job.available_time}
                </InformationSticker>
              )}

              {item.job?.english_level && (
                <InformationSticker>
                  {item.job.english_level}
                </InformationSticker>
              )}
            </JobDetailsBottom>
          </JobDetailsContainer>
        </JobContainer>

        {item.job?.description && (
          <DescriptionContainer>
            <ExpandableText>{item.job.description}</ExpandableText>
          </DescriptionContainer>
        )}
      </LeftSide>

      <RightSide>
        {(item as Offer).status === OfferStatus.PENDING && (
          <>
            <SuccessButton
              onClick={() => confirmAcceptOffer(item.job.title || '')}
            >
              {t('offers.buttons.acceptOffer')}
            </SuccessButton>
            <DangerButton
              onClick={() => confirmDeclineOffer(item.job.title || '')}
            >
              {t('offers.buttons.declineOffer')}
            </DangerButton>
          </>
        )}
        {(item as Offer).status !== OfferStatus.DECLINED && (
          <SecondaryButton>{t('offers.buttons.chat')}</SecondaryButton>
        )}
        {!(item as Offer).status && (
          <DangerButton
            onClick={() => confirmDeleteInterview(item.job.title || '')}
          >
            {t('offers.buttons.deleteInterview')}
          </DangerButton>
        )}
      </RightSide>
    </Wrapper>
  );
};
