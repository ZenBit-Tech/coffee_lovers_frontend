import { useState } from 'react';
import { Avatar, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { AppBar, ProposalModal, StyledButton } from '@freelance/components';
import { projectDetails, skills } from '@pages/JobDetailsPage/constants';

import {
  JobDescrText,
  JobDetailsWrapper,
  JobOptionsText,
  JobSkillsText,
  LabelText,
  LogoWrapper,
  SkillsWrapper,
  Text,
  Wrapper,
} from './styles';

type Open = boolean;

export default function JobDetailsPage() {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState<Open>(false);

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
          <h2>{projectDetails.name}</h2>
          <JobDetailsWrapper>
            <Space>
              <JobOptionsText>
                <LabelText>{t('job_details.date')}:</LabelText>
                <Text>{projectDetails.date}</Text>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.category')}:</LabelText>
                <Text>{projectDetails.category}</Text>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.duration')}:</LabelText>
                <Text>{projectDetails.duration}</Text>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText> {t('job_details.rate')}:</LabelText>
                <Text>{projectDetails.rate}</Text>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>{t('job_details.time')}:</LabelText>
                <Text>{projectDetails.availableTime}</Text>
              </JobOptionsText>
              <JobOptionsText>
                <LabelText>
                  {t('description.profileQp2.english_level')}:
                </LabelText>
                <Text>{projectDetails.englishLevel}</Text>
              </JobOptionsText>
            </Space>
          </JobDetailsWrapper>
          <JobDescrText>
            <Text>{projectDetails.discription}</Text>
          </JobDescrText>

          <LabelText>{t('job_details.skills')}</LabelText>
          <SkillsWrapper>
            {skills?.map(skill => (
              <JobSkillsText>{skill}</JobSkillsText>
            ))}
          </SkillsWrapper>

          <StyledButton onClick={showModal}>
            {t('job_details.send_proposal')}
          </StyledButton>
        </Space>

        <LogoWrapper>
          <Avatar size={64} icon={<UserOutlined />} />
          <LabelText>{projectDetails.jobOwnerName}</LabelText>
        </LogoWrapper>
      </Wrapper>

      <ProposalModal openModal={openModal} onCancel={onCancel} />
    </>
  );
}
