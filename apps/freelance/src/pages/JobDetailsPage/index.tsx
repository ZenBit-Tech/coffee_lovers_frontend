import { useEffect, useState } from 'react';
import { Avatar, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  jobDataTestId,
  ProposalModal,
  StyledButton,
  useOpenNotification,
} from '@freelance/components';
import { PageWrapper } from '@freelance/components';
import { skills } from '@pages/JobDetailsPage/constants';
import { useGetJobQuery } from 'redux/services/jobsApi';
import { useGetUserProposalsQuery } from 'redux/services/userApi';
import { useGetUserInfoQuery } from 'redux/services/userApi';
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

const JobDetailsPage = () => {
  const params = useParams();
  const id = Number(params['id']);

  const { t } = useTranslation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const [openModal, setOpenModal] = useState<Open>(false);
  const [isActive, setIsActive] = useState<Open>(false);
  const { data: userData } = useGetUserInfoQuery();
  const { data: jobData, isLoading: isJobLoading } = useGetJobQuery(id);
  const { data: userProposals, isLoading: isProposalsLoading } =
    useGetUserProposalsQuery();

  useEffect(() => {
    setIsActive(
      userProposals?.proposals?.find(item => item.job.id === id) ? true : false,
    );
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
        {contextHolder}
        <Space direction="vertical" size="middle">
          <h2 data-testid={jobDataTestId.testTitle}>{jobData?.job.title}</h2>
          <JobDetailsWrapper>
            <Space>
              <JobOptionsText>
                <LabelText>{t('job_details.date')}:</LabelText>
                <StyledText data-testid={jobDataTestId.jobDate}>
                  {jobData && formatDate(new Date(jobData.job.created_at))}
                </StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.category')}:</LabelText>
                <StyledText data-testid={jobDataTestId.jobCategory}>
                  {jobData?.job.category?.name}
                </StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.duration')}:</LabelText>
                <StyledText data-testid={jobDataTestId.jobDuration}>
                  {jobData?.job.duration_amount || t('findJobs.no_duration')}
                </StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText> {t('job_details.rate')}:</LabelText>
                <StyledText data-testid={jobDataTestId.jobRate}>
                  {jobData?.job.hourly_rate}
                </StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.time')}:</LabelText>
                <StyledText data-testid={jobDataTestId.jobTime}>
                  {jobData?.job.available_time}
                </StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>
                  {t('description.profileQp2.english_level')}:
                </LabelText>
                <StyledText data-testid={jobDataTestId.jobEnglish}>
                  {jobData?.job.english_level}
                </StyledText>
              </JobOptionsText>
            </Space>
          </JobDetailsWrapper>
          <JobDescrText>
            <StyledText data-testid={jobDataTestId.jobDescription}>
              {jobData?.job.description}
            </StyledText>
          </JobDescrText>

          <LabelText>{t('job_details.skills')}</LabelText>
          <SkillsWrapper>
            {skills?.map(skill => (
              <JobSkillsText data-testid={jobDataTestId.jobSkills}>
                {skill}
              </JobSkillsText>
            ))}
          </SkillsWrapper>

          <ButtonWrapper>
            <StyledButton
              data-testid={jobDataTestId.jobSendProposalBtn}
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
          <Avatar
            src={jobData?.job.owner.profile_image}
            size={80}
            icon={<UserOutlined />}
          />
          <LabelText data-testid={jobDataTestId.jobOwner}>
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
        openNotificationWithIcon={openNotificationWithIcon}
      />
    </PageWrapper>
  );
};

export default JobDetailsPage;
