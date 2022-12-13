import { useState } from 'react';
import { Col, DatePicker, Form, Input, Row, Space } from 'antd';
import dayjs from 'dayjs';
import { Namespace } from 'i18next';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button } from '@freelance/components';
import TextArea from 'antd/lib/input/TextArea';
import { useFindUserJobsWithoutOfferQuery } from 'src/redux/services/jobsApi';
import { Job } from 'src/redux/types/jobs.types';

import { dateType, descrLength, todayDate } from './constants';
import { StyledModal, StyledSelect } from './styles';
import { Props } from './types';

export function SendOfferModal(props: Props) {
  const { setOpen, open, freelancerId, rate } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const { t } = useTranslation<Namespace<string>>();
  const { data } = useFindUserJobsWithoutOfferQuery({
    id: freelancerId,
  });

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const { control, handleSubmit, reset, register } = useForm({
    defaultValues: {
      select: null,
      rate: '',
      start: '',
      description: '',
    },
  });

  const onSubmit = async (payload: {
    select?: number | null;
    rate?: number | null | string;
    start?: string;
    description?: string | null;
  }) => {
    alert(payload);
    reset({ select: null, rate: '', description: '' });
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
                  <Form.Item {...field}>
                    <StyledSelect
                      options={data?.map((el: Job) => ({
                        ...el,
                        value: el.id,
                        label: el.title,
                      }))}
                    />
                  </Form.Item>
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
                <Col span={6}>
                  <Form.Item {...field}>
                    <Input
                      defaultValue={rate}
                      type="number"
                      placeholder={t('modalInvite.placeholder')}
                      {...field}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          />

          <Controller
            {...register('start', { required: true })}
            name="start"
            control={control}
            render={({ field }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.time')}</p>
                </Col>
                <Col span={6}>
                  <Form.Item {...field}>
                    <DatePicker
                      defaultValue={dayjs(todayDate, dateType)}
                      picker="date"
                    />
                  </Form.Item>
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
                  <Form.Item {...field}>
                    <TextArea />
                  </Form.Item>
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
