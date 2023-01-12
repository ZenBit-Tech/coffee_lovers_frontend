import { FC } from 'react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  Avatar,
  ExpandableText,
  InformationSticker,
  routes,
} from '@freelance/components';
import { Job } from 'src/redux/types/jobs.types';
import { User } from 'src/redux/types/user.types';
import { getFileUrl } from 'src/utils/api';

import { avatarSize } from './constants';
import {
  CoverLetterText,
  FreelancerDetailsContainer,
  FreelancerInfoContainer,
  HourlyRateContainer,
  StyledBottom,
  StyledFreelancerName,
  StyledHourlyRate,
  StyledTop,
  StyledTopLeftSide,
  StyledTopRightSide,
  Wrapper,
} from './styles';

interface ProposalCardProps {
  onClick?: () => void;
  user?: User;
  job?: Job;
  hourlyRate: number;
  availableTime?: string;
  coverLetter: string;
}

export const ProposalCard: FC<ProposalCardProps> = ({
  onClick,
  user,
  job,
  hourlyRate,
  availableTime,
  coverLetter,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledTop>
        <StyledTopLeftSide>
          <Avatar size={avatarSize} src={getFileUrl(user?.profile_image)} />
          <FreelancerInfoContainer>
            <StyledFreelancerName onClick={onClick}>
              {`${user?.first_name} ${user?.last_name}`}
            </StyledFreelancerName>
            <FreelancerDetailsContainer>
              {user?.position && (
                <InformationSticker>{user?.position}</InformationSticker>
              )}
              {user?.skills?.map(skill => (
                <InformationSticker key={skill.id}>
                  {skill.name}
                </InformationSticker>
              ))}
            </FreelancerDetailsContainer>
          </FreelancerInfoContainer>
        </StyledTopLeftSide>

        <StyledTopRightSide>
          <HourlyRateContainer>
            <StyledHourlyRate>
              {t('proposalsList.hourly_rate', { rate: hourlyRate })}
            </StyledHourlyRate>
            {availableTime && (
              <InformationSticker>{availableTime}</InformationSticker>
            )}
          </HourlyRateContainer>
          <Button
            onClick={() =>
              navigate(
                generatePath(routes.chatUser, {
                  userId: user?.id,
                  jobId: job?.id,
                }),
              )
            }
          >
            {t('proposalsList.start_chat')}
          </Button>
        </StyledTopRightSide>
      </StyledTop>

      <StyledBottom>
        {coverLetter && (
          <CoverLetterText>
            <ExpandableText>{coverLetter}</ExpandableText>
          </CoverLetterText>
        )}
      </StyledBottom>
    </Wrapper>
  );
};
