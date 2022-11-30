import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AvatarUpload, JobAppBar } from '@freelance/components';

import * as St from './styles';

const FreelancerPageInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <St.Wrapper>
      <JobAppBar />
      <St.LogoWrapper direction="vertical">
        <AvatarUpload />
        <p>{t('job_details.owners_name')}</p>
      </St.LogoWrapper>
      <St.FreelancerInfo>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.category')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>{t('description.freelancerPageInfo.category')}</St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.hR')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.Hr>{t('description.freelancerPageInfo.hR')} $</St.Hr>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.descr')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.BigBox>{t('description.freelancerPageInfo.descr')}</St.BigBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.pos')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.MediuBox>
                {t('description.freelancerPageInfo.pos')}
              </St.MediuBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.avTime')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.MediuBox>
                {t('description.freelancerPageInfo.avTime')}
              </St.MediuBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.edu')}</St.Label>
          </Col>
          <Col span={18}>
            <St.FlexWrapper>
              <St.EduData>{t('description.freelancerPageInfo.edu')}</St.EduData>
              <St.EduTime>
                {t('description.freelancerPageInfo.eduFrom')}
              </St.EduTime>
              <St.WorkTime>
                {t('description.freelancerPageInfo.eduTo')}
              </St.WorkTime>
            </St.FlexWrapper>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.workH')}</St.Label>
          </Col>
          <Col span={18}>
            <St.FlexWrapper>
              <St.WorkData>
                {t('description.freelancerPageInfo.workH')}
              </St.WorkData>
              <St.WorkTime>
                {t('description.freelancerPageInfo.workFrom')}
              </St.WorkTime>
              <St.WorkTime>
                {t('description.freelancerPageInfo.workTo')}
              </St.WorkTime>
            </St.FlexWrapper>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.skills_top')}</St.Label>
          </Col>
          <Col span={18}>
            <St.FlexWrapper>
              <St.Skill>
                {t('description.freelancerPageInfo.JavaScript')}
              </St.Skill>
              <St.Skill>{t('description.freelancerPageInfo.HTML')}</St.Skill>
              <St.Skill>{t('description.freelancerPageInfo.CSS')}</St.Skill>
            </St.FlexWrapper>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.english_level')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              {t('description.freelancerPageInfo.english_level')}
            </St.StCol>
          </Col>
        </Row>
      </St.FreelancerInfo>
      <St.ButtonOfferWrapper>
        <St.StyledButton onClick={() => navigate('/')}>
          {t('description.freelancerPageInfo.sendOffer')}
        </St.StyledButton>
      </St.ButtonOfferWrapper>
      <St.ButtonInviteWrapper>
        <St.StyledButton onClick={() => navigate('/')}>
          {t('description.freelancerPageInfo.inviteInterview')}
        </St.StyledButton>
      </St.ButtonInviteWrapper>
    </St.Wrapper>
  );
};

export default FreelancerPageInfo;
