import { useState } from 'react';
import { Col, DatePicker, Input, notification, Row, Space } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { Namespace } from 'i18next';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Button,
  dateType,
  todayDate,
  ValidationErrorMessage,
} from '@freelance/components';
import { NotificationType } from '@freelance/components';
import { ErrorMessage } from '@hookform/error-message';
import { usePostOfferMutation } from 'src/redux/invite/inviteApi';
import { Request } from 'src/redux/invite/types';
import { useFindUserJobsWithoutOfferQuery } from 'src/redux/services/jobsApi';
import { OffersJobs } from 'src/redux/types/withoutoffer.types.ts';

import { StyledModal, StyledSelect } from './styles';
import { Props } from './types';
import useSendOfferHook from './useSendOfferHook';

export function SendOfferModal(props: Props) {
  const { setOpen, open, hourly_rate, id, description } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();

  const { t } = useTranslation<Namespace<string>>();
  const { data } = useFindUserJobsWithoutOfferQuery({
    id,
  });
  const [postOffer, { isError, error, isSuccess }] = usePostOfferMutation();
  const {
    handleCancel,
    handleOk,
    control,
    register,
    errors,
    handleSubmit,
    openNotificationWithIcon,
  } = useSendOfferHook({
    api,
    setConfirmLoading,
    setOpen,
    hourly_rate,
    error,
    isError,
    isSuccess,
  });

  const onSubmit = async (payload: {
    select?: number | null;
    rate?: number;
    start?: Dayjs | null;
  }) => {
    try {
      const { select, rate, start } = payload;
      await postOffer({
        freelancer: id,
        jobId: select,
        data: {
          hourly_rate: rate,
          start,
          status: Request.pending,
          cover_letter: description,
        },
      });
    } catch (err) {
      openNotificationWithIcon(
        NotificationType.error,
        t('loginPage.notificationMessage'),
        t('modalInvite.offerError'),
      );
    }
  };

  return (
    <StyledModal
      title={t('modalInvite.offerTotle')}
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      {contextHolder}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle">
          <Controller
            {...register('select', { required: true })}
            name="select"
            control={control}
            render={({ field }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.choose')}</p>
                </Col>
                <Col span={6}>
                  <StyledSelect
                    {...field}
                    options={data?.map((el: OffersJobs) => ({
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
                      <ValidationErrorMessage>{message}</ValidationErrorMessage>
                    )}
                  />
                </Col>
              </Row>
            )}
          />

          <Controller
            {...register('start', { required: 'required' })}
            name="start"
            control={control}
            render={({ field: { onChange } }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.time')}</p>
                </Col>
                <Col span={6}>
                  <DatePicker
                    onChange={date => {
                      onChange(date?.isValid ? date : null);
                    }}
                    defaultValue={dayjs(todayDate, dateType)}
                    format={dateType}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="start"
                    render={({ message }) => (
                      <ValidationErrorMessage>{message}</ValidationErrorMessage>
                    )}
                  />
                </Col>
              </Row>
            )}
          />

          <Row>
            <Col span={24}>{description}</Col>
          </Row>

          <Row justify="end">
            <Space
              direction="horizontal"
              size="middle"
              style={{ display: 'flex' }}
            >
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
    </StyledModal>
  );
}

export default SendOfferModal;
