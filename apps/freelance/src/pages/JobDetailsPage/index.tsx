import { useEffect, useState } from 'react';
import { Avatar, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { ProposalModal, StyledButton } from '@freelance/components';
import { PageWrapper } from '@freelance/components';
import { skills } from '@pages/JobDetailsPage/constants';
import { useGetJobQuery } from 'redux/services/jobsApi';
import { useGetUserProposalsQuery } from 'redux/services/user';
import { useGetUserInfoQuery } from 'redux/services/user';
import { baseTheme } from 'src/styles/theme';
import { formatDate } from 'src/utils/dates';

import {
  ButtonWrapper,
  ErrorText,
  JobDescrText,
  JobDetailsWrapper,
  JobOptionsText,
  JobSkillsText,
  LabelText,
  LogoWrapper,
  SkillsWrapper,
  StyledText,
  Wrapper,
} from './styles';

type Open = boolean;

export default function JobDetailsPage() {
  const params = useParams();
  const id = Number(params['id']);

  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<Open>(false);
  const [isActive, setIsActive] = useState<Open>(false);
  const { data: userData } = useGetUserInfoQuery();
  const { data: jobData, isLoading: isJobLoading } = useGetJobQuery(id);
  const { data: userProposals, isLoading: isProposalsLoading } =
    useGetUserProposalsQuery();

  useEffect(() => {
    const proposals =
      userProposals &&
      Object.values(userProposals.proposals).map(item => item?.job.id);
    setIsActive(proposals?.find(item => item === id) ? true : false);
  });

  const showModal = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <PageWrapper isLoading={isJobLoading || isProposalsLoading}>
      <Wrapper>
        <Space direction="vertical" size="middle">
          <h2>{jobData?.job.title}</h2>
          <JobDetailsWrapper>
            <Space>
              <JobOptionsText>
                <LabelText>{t('job_details.date')}:</LabelText>
                <StyledText>
                  {jobData && formatDate(new Date(jobData.job.created_at))}
                </StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.category')}:</LabelText>
                <StyledText>{jobData?.job.category?.name}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.duration')}:</LabelText>
                <StyledText>{t('findJobs.no_duration')}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText> {t('job_details.rate')}:</LabelText>
                <StyledText>{jobData?.job.hourly_rate}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.time')}:</LabelText>
                <StyledText>{jobData?.job.available_time} hours</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>
                  {t('description.profileQp2.english_level')}:
                </LabelText>
                <StyledText>{jobData?.job.english_level}</StyledText>
              </JobOptionsText>
            </Space>
          </JobDetailsWrapper>
          <JobDescrText>
            <StyledText>{jobData?.job.description}</StyledText>
          </JobDescrText>

          <LabelText>{t('job_details.skills')}</LabelText>
          <SkillsWrapper>
            {skills?.map(skill => (
              <JobSkillsText>{skill}</JobSkillsText>
            ))}
          </SkillsWrapper>

          <ButtonWrapper>
            <StyledButton
              theme={baseTheme}
              disabled={isActive}
              onClick={showModal}
            >
              {t('job_details.send_proposal')}
            </StyledButton>
            {isActive && (
              <ErrorText type="danger">{t('job_details.error_msg')}</ErrorText>
            )}
          </ButtonWrapper>
        </Space>

        <LogoWrapper>
          <Avatar size={64} icon={<UserOutlined />} />
          <LabelText>
            {jobData?.job.owner.first_name} {jobData?.job.owner.last_name}
          </LabelText>
        </LogoWrapper>
      </Wrapper>

      <ProposalModal
        openModal={openModal}
        rate={jobData?.job.hourly_rate}
        onCancel={onCancel}
        freelancer_rate={userData?.hourly_rate}
        id={id}
      />
    </PageWrapper>
  );
}
