import { FC } from 'react';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { Property } from 'src/redux/types/properties.types';
import { User } from 'src/redux/types/user.types';
import { getSizedText } from 'src/utils/text';

import { avatarSize, coverLetterMaxLength } from './constants';
import {
  CoverLetterText,
  CoverLetterVisibility,
  FreelancerDetail,
  FreelancerDetailsContainer,
  FreelancerInfoContainer,
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
  user: User;
  skills: Property[];
  hourlyRate: number;
  availableTime: string;
  coverLetter: string;
}

export const ProposalCard: FC<ProposalCardProps> = ({
  user,
  skills,
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
            src={user.profile_image}
          />
          <FreelancerInfoContainer>
            <StyledFreelancerName>
              {`${user.first_name} ${user.last_name}`}
            </StyledFreelancerName>
            <FreelancerDetailsContainer>
              <FreelancerDetail>{user.position}</FreelancerDetail>
              {user.skills.map(skill => (
                <FreelancerDetail key={skill.id}>{skill.name}</FreelancerDetail>
              ))}
            </FreelancerDetailsContainer>
          </FreelancerInfoContainer>
        </StyledTopLeftSide>

        <StyledTopRightSide>
          <StyledHourlyRate>
            {t('proposalsList.hourly_rate', { rate: hourlyRate })}
          </StyledHourlyRate>
          <FreelancerDetail>{availableTime}</FreelancerDetail>
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
