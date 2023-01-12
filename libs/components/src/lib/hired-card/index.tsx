import { FC } from 'react';
import { t } from 'i18next';
import { Avatar, DangerButton, SecondaryButton } from '@freelance/components';
import { Contract, ContractStatus } from 'src/redux/types/contracts.types';
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
import useHiredCard from './useHiredCard';

interface HiredCardProps {
  freelancer: User;
  contract: Contract;
}

export const HiredCard: FC<HiredCardProps> = ({ freelancer, contract }) => {
  const { closeContractHandler } = useHiredCard(contract, freelancer);

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
          active={contract.status === ContractStatus.ACTIVE}
          closed={contract.status === ContractStatus.CLOSED}
        >
          {contract.status}
        </StyledStatus>
        {contract.status === ContractStatus.ACTIVE && (
          <>
            <SecondaryButton>{t('postedJobDetails.btns.chat')}</SecondaryButton>
            <DangerButton onClick={closeContractHandler}>
              {t('postedJobDetails.btns.closeContract')}
            </DangerButton>
          </>
        )}
      </RightSide>
    </Wrapper>
  );
};
