import { FC } from 'react';
import { Avatar, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { User } from 'src/redux/types/user.types';
import { getFileUrl } from 'src/utils/api';
import { getSizedText } from 'src/utils/text';

import { avatarSize, coverLetterMaxLength } from './constants';
import {
  CoverLetterText,
  CoverLetterVisibility,
  FreelancerDetail,
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
import useProposalCard from './useProposalCard';

interface ProposalCardProps {
  user: User | undefined;
  hourlyRate: number;
  availableTime: string | undefined;
  coverLetter: string;
}

export const ProposalCard: FC<ProposalCardProps> = ({
  user,
  hourlyRate,
  availableTime,
  coverLetter,
}) => {
  const { t } = useTranslation();
  const { coverLetterVisibility, coverLetterVisibilityHandler } =
    useProposalCard();

  return (
    <Wrapper>
      <StyledTop>
        <StyledTopLeftSide>
          <Avatar
            icon={<UserOutlined />}
            size={avatarSize}
            src={getFileUrl(user?.profile_image)}
          />
          <FreelancerInfoContainer>
            <StyledFreelancerName>
              {`${user?.first_name} ${user?.last_name}`}
            </StyledFreelancerName>
            <FreelancerDetailsContainer>
              {user?.position && (
                <FreelancerDetail>{user?.position}</FreelancerDetail>
              )}
              {user?.skills?.map(skill => (
                <FreelancerDetail key={skill.id}>{skill.name}</FreelancerDetail>
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
              <FreelancerDetail>{availableTime}</FreelancerDetail>
            )}
          </HourlyRateContainer>
          <Button>{t('proposalsList.start_chat')}</Button>
        </StyledTopRightSide>
      </StyledTop>

      <StyledBottom>
        <CoverLetterText>
          <div>
            {coverLetterVisibility
              ? coverLetter
              : getSizedText(coverLetter, coverLetterMaxLength)}
          </div>
          {coverLetter.length > coverLetterMaxLength && (
            <CoverLetterVisibility onClick={coverLetterVisibilityHandler}>
              {t(
                coverLetterVisibility
                  ? 'textVisibility.hide'
                  : 'textVisibility.show',
              )}
            </CoverLetterVisibility>
          )}
        </CoverLetterText>
      </StyledBottom>
    </Wrapper>
  );
};
