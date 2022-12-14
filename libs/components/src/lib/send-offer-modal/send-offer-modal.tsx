import { useState } from 'react';
import { Col, DatePicker, Input, Row, Space } from 'antd';
import { Namespace } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@freelance/components';
import TextArea from 'antd/lib/input/TextArea';
import { usePostOfferMutation } from 'src/redux/invite/inviteApi';
import { Request } from 'src/redux/invite/types';
import { useFindUserJobsWithoutOfferQuery } from 'src/redux/services/jobsApi';
import { Job } from 'src/redux/types/jobs.types';

import { descrLength } from './constants';
import { StyledModal, StyledSelect } from './styles';
import { Props } from './types';

export function SendOfferModal(props: Props) {
  const { setOpen, open, freelancerId, rate } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const { t } = useTranslation<Namespace<string>>();
  const { data } = useFindUserJobsWithoutOfferQuery({
    id: freelancerId,
  });
  const [postOffer] = usePostOfferMutation();
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
      rate: rate,
      start: '',
      description: '',
    },
  });

  const onSubmit = async (payload: {
    select?: number | null;
    rate?: number;
    start?: string | Date;
    description?: string | null;
  }) => {
    const { select, rate, start, description } = payload;
    postOffer({
      freelancer: freelancerId,
      jobId: select,
      data: {
        hourly_rate: rate,
        cover_letter: description,
        start,
        type: Request.proposal,
      },
    });
    reset({ select: null, rate: rate, description: '' });
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
            render={({ field: { onChange, name, value } }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.rate')}</p>
                </Col>
                <Col span={6}>
                  <Input
                    onChange={e => {
                      onChange(parseInt(e.target.value, 10));
                    }}
                    defaultValue={rate}
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
            render={({ field: { onChange, name, value } }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.time')}</p>
                </Col>
                <Col span={6}>
                  <DatePicker
                    onChange={date => {
                      onChange(date?.isValid ? date : '');
                    }}
                    format={'MM/DD/YYYY'}
                  />
                </Col>
              </Row>
            )}
          />

          <Controller
            {...register('description', { required: true, min: descrLength })}
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
