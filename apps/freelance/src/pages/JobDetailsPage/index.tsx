import { useEffect, useState } from 'react';
import { Avatar, Rate, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  Empty,
  jobDataTestId,
  ProposalModal,
  StyledButton,
  useOpenNotification,
} from '@freelance/components';
import { PageWrapper } from '@freelance/components';
import { jobDetailsPageConsts, skills } from '@pages/JobDetailsPage/constants';
import { useGetJobQuery } from 'redux/services/jobsApi';
import {
  useGetJobOwnerRatingsByIdQuery,
  useGetUserProposalsQuery,
} from 'redux/services/userApi';
import { useGetUserInfoQuery } from 'redux/services/userApi';
import { baseTheme } from 'src/styles/theme';
import { formatDate } from 'src/utils/dates';

import * as St from './styles';

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

  const { data: userRatingDataById } = useGetJobOwnerRatingsByIdQuery(
    jobData?.job?.owner?.id,
  );

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
      <St.Wrapper>
        {contextHolder}
        <Space direction="vertical" size="middle">
          <h2 data-testid={jobDataTestId.testTitle}>{jobData?.job.title}</h2>
          <St.JobDetailsWrapper>
            <Space>
              <St.JobOptionsText>
                <St.LabelText>{t('job_details.date')}:</St.LabelText>
                <St.StyledText data-testid={jobDataTestId.jobDate}>
                  {jobData && formatDate(new Date(jobData.job.created_at))}
                </St.StyledText>
              </St.JobOptionsText>
              <St.JobOptionsText>
                <St.LabelText>{t('job_details.category')}:</St.LabelText>
                <St.StyledText data-testid={jobDataTestId.jobCategory}>
                  {jobData?.job.category?.name}
                </St.StyledText>
              </St.JobOptionsText>
              <St.JobOptionsText>
                <St.LabelText>{t('job_details.duration')}:</St.LabelText>
                <St.StyledText data-testid={jobDataTestId.jobDuration}>
                  {jobData?.job.duration_amount || t('findJobs.no_duration')}
                </St.StyledText>
              </St.JobOptionsText>
              <St.JobOptionsText>
                <St.LabelText> {t('job_details.rate')}:</St.LabelText>
                <St.StyledText data-testid={jobDataTestId.jobRate}>
                  {jobData?.job.hourly_rate}
                </St.StyledText>
              </St.JobOptionsText>
              <St.JobOptionsText>
                <St.LabelText>{t('job_details.time')}:</St.LabelText>
                <St.StyledText data-testid={jobDataTestId.jobTime}>
                  {jobData?.job.available_time}
                </St.StyledText>
              </St.JobOptionsText>
              <St.JobOptionsText>
                <St.LabelText>
                  {t('description.profileQp2.english_level')}:
                </St.LabelText>
                <St.StyledText data-testid={jobDataTestId.jobEnglish}>
                  {jobData?.job.english_level}
                </St.StyledText>
              </St.JobOptionsText>
            </Space>
          </St.JobDetailsWrapper>
          <St.JobDescrText>
            <St.StyledText data-testid={jobDataTestId.jobDescription}>
              {jobData?.job.description}
            </St.StyledText>
          </St.JobDescrText>

          <St.LabelText>{t('job_details.skills')}</St.LabelText>
          <St.SkillsWrapper>
            {skills?.map(skill => (
              <St.JobSkillsText data-testid={jobDataTestId.jobSkills}>
                {skill}
              </St.JobSkillsText>
            ))}
          </St.SkillsWrapper>

          <St.ButtonWrapper>
            <StyledButton
              data-testid={jobDataTestId.jobSendProposalBtn}
              theme={baseTheme}
              disabled={isActive}
              onClick={showModal}
            >
              {t('job_details.send_proposal')}
            </StyledButton>
            {isActive && (
              <St.ErrorText type="danger">
                {t('job_details.error_msg')}
              </St.ErrorText>
            )}
          </St.ButtonWrapper>
        </Space>

        <St.RightColWrapper>
          <Avatar size={64} icon={<UserOutlined />} />
          <St.LabelText data-testid={jobDataTestId.jobOwner}>
            {jobData?.job.owner.first_name} {jobData?.job.owner.last_name}
          </St.LabelText>
          <St.StyledRatingWrapper>
            <St.StyledRatingBox>
              <p>
                {jobData?.job.owner.reviews_amount
                  ? jobData?.job.owner.reviews_amount
                  : jobDetailsPageConsts.noReviews}{' '}
                {jobData?.job.owner.reviews_amount ===
                jobDetailsPageConsts.oneReview
                  ? t('job_details.review')
                  : t('job_details.reviews')}
              </p>
              <p>
                {jobData?.job.owner.average_rating
                  ? `${t('job_details.rating')}  ${
                      jobData?.job.owner.average_rating
                    }`
                  : t('job_details.noRating')}
              </p>
            </St.StyledRatingBox>
            <St.StyledReviewsBox>
              {userRatingDataById?.length ? (
                userRatingDataById.map(el => (
                  <St.StyledReviewsWrapper key={el.id}>
                    <St.StyledRatingBox>
                      <St.FreelancerNameDiv>
                        {el.freelancer?.first_name} {el.freelancer?.last_name}
                      </St.FreelancerNameDiv>
                    </St.StyledRatingBox>
                    <St.StyledRatingBox>
                      <St.StyledDateWrapper>
                        {formatDate(new Date(el.created_at))}
                      </St.StyledDateWrapper>
                      <Rate value={el.rating} disabled />
                    </St.StyledRatingBox>
                    <St.StRatingCommentBox>
                      <Typography.Paragraph
                        ellipsis={{
                          rows: 5,
                          expandable: true,
                          symbol: t('textVisibility.more'),
                        }}
                      >
                        {el.rating_comment}
                      </Typography.Paragraph>
                    </St.StRatingCommentBox>
                  </St.StyledReviewsWrapper>
                ))
              ) : (
                <Empty description={t('job_details.noFeedback')} />
              )}
            </St.StyledReviewsBox>
          </St.StyledRatingWrapper>
          <St.StyledRatingWrapper></St.StyledRatingWrapper>
        </St.RightColWrapper>
      </St.Wrapper>

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
