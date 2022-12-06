import { useState } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AppBar, AvatarUpload } from '@freelance/components';
import {
  mockEducationData,
  mockUserData,
  mockWorkHistoryData,
} from '@freelance/components';
import { InterviewModal } from '@freelance/components';

import * as St from './styles';

const FreelancerPageInfo = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const showModal = () => {
    setOpen(true);
  };

  return (
    <St.Wrapper>
      <AppBar />
      <St.LogoWrapper direction="vertical">
        <AvatarUpload />
        <p>
          {mockUserData.first_name} {mockUserData.last_name}
        </p>
      </St.LogoWrapper>
      <St.FreelancerInfo>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.category')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>{mockUserData.category.name}</St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.hR')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.Hr>{mockUserData.hourly_rate} $</St.Hr>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.descr')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.BigBox>{mockUserData.description}</St.BigBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.pos')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.MediuBox>{mockUserData.position}</St.MediuBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.avTime')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.MediuBox>{mockUserData.available_time}</St.MediuBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.edu')}</St.Label>
          </Col>
          <Col span={18}>
            {mockEducationData.map(el => (
              <St.FlexWrapper key={el.id}>
                <St.EduData>{el.education_descr}</St.EduData>
                <St.EduTime>{el.education_from}</St.EduTime>
                <St.WorkTime>{el.education_to}</St.WorkTime>
              </St.FlexWrapper>
            ))}
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.workH')}</St.Label>
          </Col>
          <Col span={18}>
            {mockWorkHistoryData.map(el => (
              <St.FlexWrapper key={el.id}>
                <St.WorkData>{el.work_history_descr}</St.WorkData>
                <St.WorkTime>{el.work_history_from}</St.WorkTime>
                <St.WorkTime>{el.work_history_to}</St.WorkTime>
              </St.FlexWrapper>
            ))}
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.skills_top')}</St.Label>
          </Col>
          <Col span={18}>
            <St.FlexWrapper>
              {mockUserData.skills.map(el => (
                <St.Skill key={el.id}>{el.name}</St.Skill>
              ))}
            </St.FlexWrapper>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.english_level')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>{mockUserData.english_level}</St.StCol>
          </Col>
        </Row>
      </St.FreelancerInfo>
      <InterviewModal open={open} setOpen={setOpen} />
      <St.ButtonWrapper>
        <St.StyledButton onClick={() => navigate('/')}>
          {t('description.freelancerPageInfo.sendOffer')}
        </St.StyledButton>
        <St.StyledButton onClick={showModal}>
          {t('description.freelancerPageInfo.inviteInterview')}
        </St.StyledButton>
      </St.ButtonWrapper>
    </St.Wrapper>
  );
};

export default FreelancerPageInfo;
