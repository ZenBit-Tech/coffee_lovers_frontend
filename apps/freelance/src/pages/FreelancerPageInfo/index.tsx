import { useState } from 'react';
import { Avatar, Col, Rate, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  Button,
  Empty,
  freelancerPageInfo,
  InterviewModal,
  profileQ1,
  SendOfferModal,
} from '@freelance/components';
import { formatDate } from '@utils/dates';
import {
  useGetFreelancerByIdQuery,
  useGetFreelancerRatingsByIdQuery,
} from 'redux/services/userApi';

import * as St from './styles';

const FreelancerPageInfo = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const params = useParams();
  const id = Number(params['id']);
  const [offerOpen, setOfferOpen] = useState<boolean>(false);

  const { data: userDataById, isLoading } = useGetFreelancerByIdQuery(id);
  const { data: userRatingDataById } = useGetFreelancerRatingsByIdQuery(id);
  const showModal = () => {
    setOpen(true);
  };

  return (
    <St.Wrapper isLoading={isLoading}>
      <St.LogoWrapper direction="vertical">
        <Avatar
          src={`${baseUrl}/${userDataById?.profile_image}`}
          size={profileQ1.avatarBigSize}
          icon={<UserOutlined />}
        />
        <p data-testid={freelancerPageInfo.nameSurname}>
          {userDataById?.first_name} {userDataById?.last_name}
        </p>
      </St.LogoWrapper>
      <St.FreelancerInfo>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.category')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol data-testid={freelancerPageInfo.categoryName}>
              {userDataById?.category?.name}
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.hR')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.Hr data-testid={freelancerPageInfo.hr}>
                {userDataById?.hourly_rate} $
              </St.Hr>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.descr')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.BigBox data-testid={freelancerPageInfo.desc}>
                {userDataById?.description}
              </St.BigBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.pos')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol>
              <St.MediuBox data-testid={freelancerPageInfo.pos}>
                {userDataById?.position}
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
              <St.MediuBox data-testid={freelancerPageInfo.avtime}>
                {userDataById?.available_time}
              </St.MediuBox>
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp1.edu')}</St.Label>
          </Col>
          <Col span={18}>
            {userDataById?.educations?.map(el => (
              <St.FlexWrapper data-testid={freelancerPageInfo.edu} key={el.id}>
                <St.EduData>{el.education_descr}</St.EduData>
                <St.EduTime>{el.education_from}</St.EduTime>
                <St.WorkTime>{el.education_to}</St.WorkTime>
              </St.FlexWrapper>
            ))}
          </Col>
        </Row>
        {userDataById?.workHistory && userDataById.workHistory.length > 0 && (
          <Row>
            <Col span={6}>
              <St.Label>{t('description.profileQp1.workH')}</St.Label>
            </Col>
            <Col span={18}>
              {userDataById?.workHistory?.map(el => (
                <St.FlexWrapper
                  data-testid={freelancerPageInfo.work}
                  key={el.id}
                >
                  <St.WorkData>{el.work_history_descr}</St.WorkData>
                  <St.WorkTime>{el.work_history_from}</St.WorkTime>
                  <St.WorkTime>{el.work_history_to}</St.WorkTime>
                </St.FlexWrapper>
              ))}
            </Col>
          </Row>
        )}
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.skills_top')}</St.Label>
          </Col>
          <Col span={18}>
            <St.FlexWrapper>
              {userDataById?.skills.map(el => (
                <St.Skill data-testid={freelancerPageInfo.skills} key={el.id}>
                  {el.name}
                </St.Skill>
              ))}
            </St.FlexWrapper>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.Label>{t('description.profileQp2.english_level')}</St.Label>
          </Col>
          <Col span={18}>
            <St.StCol data-testid={freelancerPageInfo.englevel}>
              {userDataById?.english_level}
            </St.StCol>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <St.ReviewLabel>{t('talent.reviews')}</St.ReviewLabel>
          </Col>
        </Row>
        {userRatingDataById?.length ? (
          userRatingDataById.map(el => (
            <St.RatingCol key={el.id}>
              <Col span={6}>
                <Avatar
                  src={`${baseUrl}/${el.job_owner?.profile_image}`}
                  size={profileQ1.avatarBigSize}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col span={12}>
                <St.JobOwnerNameRateWrapper>
                  <St.JobOwnerNameDiv>
                    {el.job_owner?.first_name} {el.job_owner?.last_name}
                  </St.JobOwnerNameDiv>
                  <Rate value={el.rating} disabled />
                </St.JobOwnerNameRateWrapper>
                <St.JobOwnerNameRateWrapper>
                  <div>{el.job.title}</div>
                  <div>{formatDate(new Date(el.created_at))}</div>
                </St.JobOwnerNameRateWrapper>
                <St.StRatingCommentBox>
                  {el.rating_comment}
                </St.StRatingCommentBox>
              </Col>
            </St.RatingCol>
          ))
        ) : (
          <Empty description={t('talent.noFeedback')} />
        )}
      </St.FreelancerInfo>
      <St.ButtonWrapper>
        <Button onClick={showModal}>
          {t('description.freelancerPageInfo.inviteInterview')}
        </Button>
      </St.ButtonWrapper>
      <InterviewModal open={open} setOpen={setOpen} {...userDataById} />
      <SendOfferModal
        open={offerOpen}
        setOpen={setOfferOpen}
        {...userDataById}
      />
    </St.Wrapper>
  );
};

export default FreelancerPageInfo;
