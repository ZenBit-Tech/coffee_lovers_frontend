import { Avatar, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { AppBar } from '@freelance/components';
import { skills } from '@pages/JobDetailsPage/constants';

import {
  JobDescrText,
  JobOptionsText,
  JobSkillsText,
  LogoWrapper,
  SkillsWrapper,
  StyledButton,
} from './styles';

export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <AppBar />

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

        <StyledButton onClick={() => navigate('/')}>
          {t('job_details.send_proposal')}
        </StyledButton>
      </Space>

      <LogoWrapper direction="vertical">
        <Avatar size={64} icon={<UserOutlined />} />
        {/* <AvatarUpload /> */}
        <p>{t('job_details.owners_name')}</p>
      </LogoWrapper>
    </>
  );
}
