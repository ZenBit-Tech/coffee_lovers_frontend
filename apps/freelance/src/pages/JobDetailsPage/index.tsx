import { useState } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { AvatarUpload, JobAppBar, ProposalModal } from '@freelance/components';
import { skills } from '@pages/JobDetailsPage/constants';

import {
  JobDescrText,
  JobOptionsText,
  JobSkillsText,
  LogoWrapper,
  SkillsWrapper,
  StyledButton,
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
    <Wrapper>
      <JobAppBar />

      <Space direction="vertical" size="middle">
        <h2>{t('job_details.name')}</h2>
        <Space>
          <JobOptionsText>{t('job_details.date')}</JobOptionsText>
          <JobOptionsText>{t('job_details.category')}</JobOptionsText>
          <JobOptionsText>{t('job_details.duration')}</JobOptionsText>
          <JobOptionsText>{t('job_details.rate')}</JobOptionsText>
          <JobOptionsText>{t('job_details.time')}</JobOptionsText>
          <JobOptionsText>
            {t('description.profileQp2.english_level')}
          </JobOptionsText>
        </Space>

        <JobDescrText>{t('job_details.descr')}</JobDescrText>
        <p>{t('job_details.skills')}</p>
        <SkillsWrapper>
          {skills?.map(skill => (
            <JobSkillsText>{skill}</JobSkillsText>
          ))}
        </SkillsWrapper>

        <StyledButton onClick={showModal}>
          {t('job_details.send_proposal')}
        </StyledButton>
      </Space>

      <LogoWrapper direction="vertical">
        <AvatarUpload />
        <p>{t('job_details.owners_name')}</p>
      </LogoWrapper>
      <ProposalModal openModal={openModal} onCancel={onCancel} />
    </Wrapper>
  );
}
