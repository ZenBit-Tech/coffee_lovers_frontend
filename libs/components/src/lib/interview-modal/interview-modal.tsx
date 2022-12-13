import { useState } from 'react';
import { Col, Input, Row, Space } from 'antd';
import { Namespace } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@freelance/components';
import TextArea from 'antd/lib/input/TextArea';
import { useGetInvitationDetailsQuery } from 'src/redux/invitation/invitation';
import { useFindUserJobsQuery } from 'src/redux/services/jobsApi';
import { Job } from 'src/redux/types/jobs.types';

import {
  ChatListPage,
  empty,
  Endpoints,
  many,
  SendInterviewPage,
} from './constants';
import { StyledModal } from './styles';
import { StyledSelect } from './styles';
import { Conversation, Props } from './types';

export function InterviewModal(props: Props) {
  const { setOpen, open } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [page, setPage] = useState(ChatListPage);

  const { t } = useTranslation<Namespace<string>>();
  const { data: invitation } = useGetInvitationDetailsQuery({
    frId: props.freelancerId,
  });
  const { data } = useFindUserJobsQuery(props.freelancerId);
  const conversations = invitation?.data;
  const freelancer = invitation?.freelancer;

  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { control, handleSubmit, reset, register } = useForm({
    defaultValues: {
      select: null,
      rate: '',
      description: '',
    },
  });

  const onSubmit = (payload: {
    select: number | null;
    rate: number | null | string;
    description: string | null;
  }) => {
    alert(payload);
    reset({ select: null, rate: '', description: '' });
  };

  return (
    <StyledModal
      title={
        page === ChatListPage
          ? t('modalInvite.jobList')
          : t('modalInvite.invite')
      }
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      {conversations?.length > empty && page === ChatListPage ? (
        <>
          {t('modalInvite.notification', {
            ending: conversations?.length > many && 's',
            firstName: freelancer?.first_name,
            lastName: freelancer?.last_name,
          })}
          <ul>
            {conversations?.map((el: Conversation) => (
              <li>
                <a
                  href={`${process.env['NX_API_URL']}/${Endpoints.conversations}/${el.id}`}
                >
                  {t('modalInvite.jobTitle', { job: el.job.title })}
                </a>
              </li>
            ))}
          </ul>
          <br />
          <Button
            onClick={() => {
              setPage(SendInterviewPage);
            }}
          >
            {t('modalInvite.newChat')}
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Controller
              {...register('select', { required: true })}
              name="select"
              control={control}
              render={({ field }) => (
                <Row justify="start">
                  <Col span={8}>
                    <p>{t('modalInvite.choose')}</p>
                  </Col>
                  <Col span={5}>
                    <StyledSelect
                      {...field}
                      options={data?.map((el: Job) => ({
                        ...el,
                        value: el.id,
                        label: el.title,
                      }))}
                    />
                  </Col>
                </Row>
              )}
            />

            <Controller
              {...register('rate', { required: true })}
              name="rate"
              control={control}
              render={({ field }) => (
                <Row justify="start">
                  <Col span={8}>
                    <p>{t('modalInvite.rate')}</p>
                  </Col>
                  <Col span={5}>
                    <Input
                      type="number"
                      placeholder={t('modalInvite.placeholder')}
                      {...field}
                    />
                  </Col>
                </Row>
              )}
            />
            <Controller
              {...register('description', { required: true, min: 15 })}
              name="description"
              control={control}
              render={({ field }) => (
                <Row>
                  <Col span={24}>
                    <TextArea {...field} />
                  </Col>
                </Row>
              )}
            />
            <Row justify="end">
              <Space
                direction="horizontal"
                size="middle"
                style={{ display: 'flex' }}
              >
                <Col span={6}>
                  <Button height="40px" onClick={() => setPage(ChatListPage)}>
                    {t('modalInvite.back')}
                  </Button>
                </Col>
                <Col span={6}>
                  <Button htmlType="submit" height="40px">
                    {t('modalInvite.submit')}
                  </Button>
                </Col>
                <Col span={6}>
                  <Button height="40px" onClick={handleOk}>
                    {t('modalInvite.close')}
                  </Button>
                </Col>
              </Space>
            </Row>
          </Space>
        </form>
      )}
    </StyledModal>
  );
}

export default InterviewModal;
