import { useState } from 'react';
import { Col, Form, Input, Modal, Row, Space } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextArea from 'antd/lib/input/TextArea';
import { useFindUserJobsQuery } from 'src/redux/services/jobsApi';
import { Job } from 'src/redux/types/jobs.types';

import Button from '../button/button';

import { StyledSelect } from './styles';

export function InterviewModal(props: {
  open: boolean;
  setOpen: (op: boolean) => void;
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data } = useFindUserJobsQuery();
  const { open, setOpen } = props;
  const { t } = useTranslation();

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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      select: null,
      rate: 0,
      description: '',
    },
  });
  const onSubmit = async (payload: {
    select: number | null | undefined;
    rate: number;
    description: string;
  }) => {
    console.log(payload);
  };

  return (
    <Modal
      title="Title"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Controller
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
            name="rate"
            control={control}
            render={({ field }) => (
              <Row justify="start">
                <Col span={8}>
                  <p>{t('modalInvite.rate')}</p>
                </Col>
                <Col span={5}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: `$required`,
                        type: 'number',
                      },
                    ]}
                    hasFeedback
                    {...field}
                  >
                    <Input
                      type="number"
                      placeholder={t('modalInvite.placeholder')}
                    />
                  </Form.Item>
                </Col>
              </Row>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Row>
                <Col span={24}>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: `$required`,
                        type: 'string',
                      },
                    ]}
                    hasFeedback
                    {...field}
                  >
                    <TextArea />
                  </Form.Item>
                </Col>
              </Row>
            )}
          />
          <Row justify="end">
            <Col span={6}>
              <Button htmlType="submit" height="40px" onClick={handleOk}>
                {t('modalInvite.submit')}
              </Button>
            </Col>
          </Row>
        </Space>
      </form>
    </Modal>
  );
}

export default InterviewModal;
