import { FC } from 'react';
import { t } from 'i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import {
  Avatar,
  DangerButton,
  routes,
  SecondaryButton,
} from '@freelance/components';
import { useOpenNotification } from '@freelance/components';
import { Contract, ContractStatus } from 'src/redux/types/contracts.types';
import { Job } from 'src/redux/types/jobs.types';
import { User } from 'src/redux/types/user.types';
import { getFileUrl } from 'src/utils/api';

import RatingModal from '../add-rating-modal';

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
  job?: Job;
}

export const HiredCard: FC<HiredCardProps> = ({
  freelancer,
  contract,
  job,
}) => {
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const { closeContractHandler, setIsModalOpen, isModalOpen } = useHiredCard(
    contract,
    freelancer,
    openNotificationWithIcon,
  );
  const navigate = useNavigate();

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
            {contextHolder}
            <SecondaryButton
              onClick={() =>
                navigate(
                  generatePath(routes.chatUser, {
                    userId: freelancer.id,
                    jobId: job?.id,
                  }),
                )
              }
            >
              {t('postedJobDetails.btns.chat')}
            </SecondaryButton>
            <DangerButton onClick={closeContractHandler}>
              {t('postedJobDetails.btns.closeContract')}
            </DangerButton>
            <RatingModal
              contract={contract}
              freelancer_id={freelancer.id}
              job_id={job?.id}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
            />
          </>
        )}
      </RightSide>
    </Wrapper>
  );
};
