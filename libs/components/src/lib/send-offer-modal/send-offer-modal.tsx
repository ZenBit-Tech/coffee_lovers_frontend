import { useState } from 'react';
import { Col, DatePicker, Input, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { Namespace } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, dateType, todayDate } from '@freelance/components';
import { usePostOfferMutation } from 'src/redux/invite/inviteApi';
import { Request } from 'src/redux/invite/types';
import { useFindUserJobsWithoutOfferQuery } from 'src/redux/services/jobsApi';
import { OffersJobs } from 'src/redux/types/withoutoffer.types.ts';

import { StyledModal, StyledSelect } from './styles';
import { Props } from './types';

export function SendOfferModal(props: Props) {
  const { setOpen, open, hourly_rate, id, description } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const { t } = useTranslation<Namespace<string>>();
  const { data } = useFindUserJobsWithoutOfferQuery({
    id,
  });
  const [postOffer] = usePostOfferMutation();
  const withoutOffer = data?.filter(el => el.offersCount === 0);

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
      rate: hourly_rate,
      start: '',
    },
  });

  const onSubmit = (payload: {
    select?: number | null;
    rate?: number;
    start?: string | Date;
  }) => {
    const { select, rate, start } = payload;
    postOffer({
      freelancer: id,
      jobId: select,
      data: {
        hourly_rate: rate,
        start,
        status: Request.pending,
        cover_letter: description,
      },
    });
    reset({ select: null, rate: rate });
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
                <Col span={6}>
                  <StyledSelect
                    {...field}
                    options={withoutOffer?.map((el: OffersJobs) => ({
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
            render={({ field: { onChange } }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.rate')}</p>
                </Col>
                <Col span={6}>
                  <Input
                    onChange={e => {
                      onChange(parseInt(e.target.value));
                    }}
                    defaultValue={hourly_rate}
                    type="number"
                    placeholder={t('modalInvite.placeholder')}
                  />
                </Col>
              </Row>
            )}
          />

          <Controller
            control={control}
            name="start"
            render={({ field: { onChange } }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.time')}</p>
                </Col>
                <Col span={6}>
                  <DatePicker
                    defaultValue={dayjs(todayDate, dateType)}
                    onChange={date => {
                      onChange(date?.isValid ? date : '');
                    }}
                    format={dateType}
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
