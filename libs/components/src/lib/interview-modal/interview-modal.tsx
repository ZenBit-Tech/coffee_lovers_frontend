import { useEffect, useState } from 'react';
import { Col, Input, notification, Row } from 'antd';
import { Namespace } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, ValidationErrorMessage } from '@freelance/components';
import { NotificationType } from '@freelance/components';
import { ErrorMessage } from '@hookform/error-message';
import { useGetInvitationDetailsQuery } from 'src/redux/invitation/invitation';
import { usePostRequestMutation } from 'src/redux/invite/inviteApi';
import { Invite } from 'src/redux/invite/types';
import {
  useFindUserJobsWithoutInviteQuery,
  useGetJobQuery,
} from 'src/redux/services/jobsApi';

import { ChatListPage, empty, many, SendInterviewPage } from './constants';
import useInterviewModalHook from './interview-hook';
import { StyledModal, StyledSelect, StyledSpace } from './styles';
import { Conversation, Props } from './types';

export function InterviewModal(props: Props) {
  const { setOpen, open, description, hourly_rate, id, refetchOffers } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [page, setPage] = useState<string>(ChatListPage);
  const [jobId, setJobId] = useState<null | number>(null);

  const [api, contextHolder] = notification.useNotification();
  const { data: selectedJob } = useGetJobQuery(jobId);
  const { t } = useTranslation<Namespace<string>>();
  const { data: invitation } = useGetInvitationDetailsQuery({
    frId: id,
  });
  const [postRequest, { isError, error, isSuccess }] = usePostRequestMutation();
  const { data, refetch } = useFindUserJobsWithoutInviteQuery({
    id,
  });
  const { handleCancel, handleOk, openNotificationWithIcon } =
    useInterviewModalHook({
      api,
      setConfirmLoading,
      setOpen,
    });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      select: null,
      rate: hourly_rate,
    },
  });

  useEffect(() => {
    if (isError) {
      openNotificationWithIcon(
        NotificationType.error,
        t('loginPage.notificationMessage'),
        t('modalInvite.requestError'),
      );
    }
    if (isSuccess) {
      openNotificationWithIcon(
        NotificationType.success,
        t('modalInvite.requestSuccessHeader'),
        t('modalInvite.requestSuccess'),
      );
      reset({ select: null, rate: hourly_rate });
    }
  }, [error, isError, isSuccess]);

  const conversations = invitation?.data;
  const freelancer = invitation?.freelancer;

  const onSubmit = async (payload: {
    select: number | null;
    rate?: number;
  }) => {
    try {
      await postRequest({
        freelancer: id,
        jobId: payload.select,
        data: {
          hourly_rate: payload.rate,
          type: Invite.INTERVIEW,
          cover_letter: description,
        },
      });
      setJobId(null);
      refetch();
      refetchOffers();
    } catch (err) {
      openNotificationWithIcon(
        NotificationType.error,
        t('loginPage.notificationMessage'),
        t('modalInvite.requestError'),
      );
    }
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
            {conversations?.map((item: Conversation) => (
              <>
                <a key={item.id} href="/">
                  {t('modalInvite.jobTitle', { job: item.job.title })}
                </a>
                <br />
              </>
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
          {contextHolder}
          <StyledSpace direction="vertical" size="middle">
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
                      options={data
                        ?.filter(el => el.count === 0)
                        .map((el: { id: number; title: string }) => ({
                          ...el,
                          value: el.id,
                          label: el.title,
                        }))}
                      onChange={id => {
                        setJobId(id as number);
                        field.onChange(id);
                      }}
                    />
                  </Col>
                </Row>
              )}
            />

            <Controller
              {...register('rate', { required: 'required' })}
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
                    <ErrorMessage
                      errors={errors}
                      name="rate"
                      render={({ message }) => (
                        <ValidationErrorMessage>
                          {message}
                        </ValidationErrorMessage>
                      )}
                    />
                  </Col>
                </Row>
              )}
            />

            {jobId && (
              <Row>
                <Col span={8}>
                  <p>{t('modalInvite.description')}</p>
                </Col>
                <Col span={5}>{selectedJob?.job.description}</Col>
              </Row>
            )}

            <Row justify="end">
              <StyledSpace direction="horizontal" size="middle">
                <Col span={6}>
                  <Button onClick={() => setPage(ChatListPage)}>
                    {t('modalInvite.back')}
                  </Button>
                </Col>
                <Col span={6}>
                  <Button htmlType="submit">{t('modalInvite.submit')}</Button>
                </Col>
                <Col span={6}>
                  <Button onClick={handleOk}>{t('modalInvite.close')}</Button>
                </Col>
              </StyledSpace>
            </Row>
          </StyledSpace>
        </form>
      )}
    </StyledModal>
  );
}

export default InterviewModal;
