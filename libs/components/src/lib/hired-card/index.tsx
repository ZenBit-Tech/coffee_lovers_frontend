import { FC } from 'react';
import { t } from 'i18next';
import { Avatar, DangerButton, SecondaryButton } from '@freelance/components';
import { ContractStatus } from 'src/redux/types/contracts.types';
import { User } from 'src/redux/types/user.types';
import { getFileUrl } from 'src/utils/api';

import {
  FreelacerName,
  FreelacerPosition,
  FreelancerContainer,
  FreelancerInfo,
  LeftSide,
  RightSide,
  StyledStatus,
  Wrapper,
} from './styles';

interface HiredCardProps {
  freelancer: User;
  status: ContractStatus;
}

export const HiredCard: FC<HiredCardProps> = ({ freelancer, status }) => {
  return (
    <Wrapper>
      <LeftSide>
        <FreelancerContainer>
          <Avatar src={getFileUrl(freelancer.profile_image)} />
          <FreelancerInfo>
            <FreelacerName>{`${freelancer.first_name} ${freelancer.last_name}`}</FreelacerName>
            <FreelacerPosition>{freelancer.position}</FreelacerPosition>
          </FreelancerInfo>
        </FreelancerContainer>
      </LeftSide>

      <RightSide>
        <StyledStatus
          active={status === ContractStatus.ACTIVE}
          closed={status === ContractStatus.CLOSED}
        >
          {status}
        </StyledStatus>
        {status === ContractStatus.ACTIVE && (
          <>
            <SecondaryButton>{t('postedJobDetails.btns.chat')}</SecondaryButton>
            <DangerButton>
              {t('postedJobDetails.btns.closeContract')}
            </DangerButton>
          </>
        )}
      </RightSide>
    </Wrapper>
  );
};
