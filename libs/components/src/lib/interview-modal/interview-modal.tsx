import { useState } from 'react';
import { Col, Input, notification, Row, Typography } from 'antd';
import { Namespace } from 'i18next';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, ChatListModalContent } from '@freelance/components';
import { ErrorMessage } from '@hookform/error-message';
import UseModalOpenHook from 'src/hooks/useModalOpen';
import { useGetInvitationDetailsQuery } from 'src/redux/services/invitationApi';
import { useGetJobQuery } from 'src/redux/services/jobsApi';
import { useFindUserJobsWithoutInviteQuery } from 'src/redux/services/requestApi';
import { OffersJobs } from 'src/redux/types/withoutoffer.types.ts';

import { ChatListPage } from './constants';
import { StyledModal, StyledSelect, StyledSpace } from './styles';
import { Props } from './types';
import useInterviewModalHook from './useInterviewModalHook';

export function InterviewModal(props: Props) {
  const { setOpen, open, description, hourly_rate, id } = props;
  const { Text } = Typography;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [page, setPage] = useState<string>(ChatListPage);
  const [jobId, setJobId] = useState<null | number>(null);

  const [api, contextHolder] = notification.useNotification();
  const { data: selectedJob } = useGetJobQuery(jobId);
  const { t } = useTranslation<Namespace<string>>();
  const { data: invitation } = useGetInvitationDetailsQuery({
    frId: id,
  });
  const { data } = useFindUserJobsWithoutInviteQuery({
    id,
  });
  const { handleCancel, handleOk } = UseModalOpenHook({
    setOpen,
    setConfirmLoading,
  });

  const { control, register, handleSubmit, errors, onSubmit } =
    useInterviewModalHook({
      id,
      setJobId,
      api,
      description,
      hourly_rate,
    });

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
      {page === ChatListPage ? (
        <ChatListModalContent invitation={invitation} setPage={setPage} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {contextHolder}
          <StyledSpace direction="vertical" size="middle">
            <Controller
              {...register('select', {
                required: t('modalInvite.required') || '',
              })}
              name="select"
              control={control}
              render={({ field }) => (
                <Row justify="start">
                  <Col span={10}>
                    <p>{t('modalInvite.choose')}</p>
                  </Col>
                  <Col span={14}>
                    <StyledSelect
                      {...field}
                      options={data
                        ?.filter(
                          (el: OffersJobs) =>
                            el.count === 0 && el.conversationCount === 0,
                        )
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
              {...register('rate', {
                required: t('modalInvite.required') || '',
              })}
              name="rate"
              control={control}
              render={({ field }) => (
                <Row justify="start">
                  <Col span={10}>
                    <p>{t('modalInvite.rate')}</p>
                  </Col>
                  <Col span={14}>
                    <Input
                      type="number"
                      placeholder={t('modalInvite.placeholder')}
                      {...field}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="rate"
                      render={({ message }) => (
                        <Text type="danger">{message}</Text>
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
                <Col span={6}>{selectedJob?.job.description}</Col>
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
