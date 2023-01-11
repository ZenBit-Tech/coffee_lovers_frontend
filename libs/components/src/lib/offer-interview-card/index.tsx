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

import { avatarSize, idOfUndefined } from './constants';
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

interface OfferProps {
  offer: Offer;
  interview?: never;
}

interface InterviewProps {
  interview: Interview;
  offer?: never;
}

type OfferInterviewProps = OfferProps | InterviewProps;

export const OfferInterviewCard: FC<OfferInterviewProps> = ({
  offer,
  interview,
}) => {
  const {
    t,
    confirmAcceptOffer,
    confirmDeclineOffer,
    confirmDeleteInterview,
    jobClickHandler,
    startChatHandler,
  } = useOfferInterviewCard(
    offer?.id || interview?.id || idOfUndefined,
    offer?.job_owner || interview?.job_owner,
    offer?.job || interview?.job,
  );

  return (
    <Wrapper>
      <LeftSide>
        <JobContainer>
          <Avatar
            src={getFileUrl(
              offer?.job_owner.profile_image ||
                interview?.job_owner.profile_image,
            )}
            size={avatarSize}
          />
          <JobDetailsContainer>
            <JobDetailsTop>
              <JobDetailsTopLeftSide>
                <StyledJobTitle
                  onClick={() =>
                    jobClickHandler(offer?.job.id || interview?.job.id)
                  }
                >
                  {offer?.job.title || interview?.job.title}
                </StyledJobTitle>
                <StyledJobOwnerName>
                  {(offer?.job_owner.first_name ||
                    interview?.job_owner.first_name ||
                    '') +
                    ' ' +
                    (offer?.job_owner.last_name ||
                      interview?.job_owner.last_name ||
                      '')}
                </StyledJobOwnerName>
              </JobDetailsTopLeftSide>

              <JobDetailsTopRightSide>
                <InformationSticker
                  children={t('offers.hrly_rate', {
                    rate: offer?.hourly_rate || interview?.hourly_rate,
                  })}
                />
                {offer?.status && (
                  <InformationSticker
                    success={offer.status === OfferStatus.ACCEPTED}
                    danger={offer.status === OfferStatus.DECLINED}
                    primary={offer.status === OfferStatus.PENDING}
                  >
                    {offer.status}
                  </InformationSticker>
                )}
              </JobDetailsTopRightSide>
            </JobDetailsTop>

            <JobDetailsBottom>
              {(offer?.job.category || interview?.job.category) && (
                <InformationSticker>
                  {offer?.job.category?.name || interview?.job.category?.name}
                </InformationSticker>
              )}

              {offer?.job.skills?.map(skill => (
                <InformationSticker key={skill.id}>
                  {skill.name}
                </InformationSticker>
              ))}
              {interview?.job.skills?.map(interview => (
                <InformationSticker key={interview.id}>
                  {interview.name}
                </InformationSticker>
              ))}

              {(offer?.job?.available_time ||
                interview?.job?.available_time) && (
                <InformationSticker>
                  {offer?.job.available_time || interview?.job.available_time}
                </InformationSticker>
              )}

              {(offer?.job.english_level || interview?.job.english_level) && (
                <InformationSticker>
                  {offer?.job.english_level || interview?.job.english_level}
                </InformationSticker>
              )}
            </JobDetailsBottom>
          </JobDetailsContainer>
        </JobContainer>

        {(offer?.job.description || interview?.job.description) && (
          <DescriptionContainer>
            <ExpandableText>
              {offer?.job.description || interview?.job.description}
            </ExpandableText>
          </DescriptionContainer>
        )}
      </LeftSide>

      <RightSide>
        {offer && offer.status === OfferStatus.PENDING && (
          <>
            <SuccessButton
              onClick={() => confirmAcceptOffer(offer.job.title || '')}
            >
              {t('offers.buttons.acceptOffer')}
            </SuccessButton>
            <DangerButton
              onClick={() => confirmDeclineOffer(offer.job.title || '')}
            >
              {t('offers.buttons.declineOffer')}
            </DangerButton>
          </>
        )}
        {((offer && offer.status !== OfferStatus.DECLINED) || interview) && (
          <SecondaryButton onClick={startChatHandler}>
            {t('offers.buttons.chat')}
          </SecondaryButton>
        )}
        {interview && (
          <DangerButton
            onClick={() => confirmDeleteInterview(interview.job.title || '')}
          >
            {t('offers.buttons.deleteInterview')}
          </DangerButton>
        )}
      </RightSide>
    </Wrapper>
  );
};
