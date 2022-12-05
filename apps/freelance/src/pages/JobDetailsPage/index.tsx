import { useEffect, useState } from 'react';
import { Avatar, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { AppBar, ProposalModal, StyledButton } from '@freelance/components';
import { skills } from '@pages/JobDetailsPage/constants';
import { useGetProposalsQuery } from 'redux/services/jobsApi';
import { useGetUserInfoQuery } from 'redux/services/user';
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
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<Open>(false);
  const [isActive, setIsActive] = useState<Open>(false);
  const location = useLocation();
  const { data: jobData } = useGetProposalsQuery(location.state.id);
  const { data: userData } = useGetUserInfoQuery();

  useEffect(() => {
    const proposals = jobData?.proposals?.map(obj => obj.user?.email);
    setIsActive(proposals?.includes(userData?.email) ? true : false);
  });

  const showModal = () => {
    setOpenModal(true);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <AppBar />
      <Wrapper>
        <Space direction="vertical" size="middle">
          <h2>{location.state.title}</h2>
          <JobDetailsWrapper>
            <Space>
              <JobOptionsText>
                <LabelText>{t('job_details.date')}:</LabelText>
                <StyledText>{formatDate(location.state.date)}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.category')}:</LabelText>
                <StyledText>{location.state.category}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.duration')}:</LabelText>
                <StyledText>{location.state.duration}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText> {t('job_details.rate')}:</LabelText>
                <StyledText>{location.state.rate}</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.time')}:</LabelText>
                <StyledText>{location.state.time} hours</StyledText>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>
                  {t('description.profileQp2.english_level')}:
                </LabelText>
                <StyledText>{location.state.english}</StyledText>
              </JobOptionsText>
            </Space>
          </JobDetailsWrapper>
          <JobDescrText>
            <StyledText>{location.state.description}</StyledText>
          </JobDescrText>

          <LabelText>{t('job_details.skills')}</LabelText>
          <SkillsWrapper>
            {skills?.map(skill => (
              <JobSkillsText>{skill}</JobSkillsText>
            ))}
          </SkillsWrapper>

          <ButtonWrapper>
            <StyledButton disabled={isActive} onClick={showModal}>
              {t('job_details.send_proposal')}
            </StyledButton>
            {isActive && (
              <ErrorText type="danger">{t('job_details.error_msg')}</ErrorText>
            )}
          </ButtonWrapper>
        </Space>

        <LogoWrapper>
          <Avatar size={64} icon={<UserOutlined />} />
          <LabelText>{location.state.owner}</LabelText>
        </LogoWrapper>
      </Wrapper>

      <ProposalModal
        openModal={openModal}
        rate={location.state.rate}
        onCancel={onCancel}
        owner_rate={location.state.owner_rate}
        id={location.state.id}
      />
    </>
  );
}
