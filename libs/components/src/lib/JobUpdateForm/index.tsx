import { useEffect, useState } from 'react';
import { Form, Space, Typography } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  description,
  hourly_rate,
  jobUpdateSchema,
  JobUpdateValues,
  NotificationType,
  openNotificationWithIcon,
  PageWrapper,
  routes,
  StyledButton,
  StyledInput,
  StyledInputNumber,
  StyledTextArea,
  title,
} from '@freelance/components';
import { jobDescriptionMaxLength } from '@freelance/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetJobQuery,
  useUpdateJobMutation,
} from 'src/redux/services/jobsApi';
import { Job } from 'src/redux/types/jobs.types';

import {
  ButtonWrapper,
  FormWrapper,
  PropertiesWrapper,
  StyledErrorMessage,
  TitleWrapper,
} from './styles';

const { Title, Text } = Typography;

export const JobUpdateForm = () => {
  const [job, setJob] = useState<Job>();
  const { t } = useTranslation();

  const params = useParams();
  const jobId = Number(params?.['id']);

  const {
    control: jobUpdateControl,
    handleSubmit: jobUpdateHandleSubmit,
    formState: { errors },
  } = useForm<JobUpdateValues>({
    resolver: yupResolver(jobUpdateSchema),
  });

  const navigate = useNavigate();

  const [
    updateJob,
    { isSuccess: isUpdateJobSuccess, isError: isUpdateJobError },
  ] = useUpdateJobMutation();
  const { data, isLoading } = useGetJobQuery(jobId);
  const [isFormChanged, setIsFormChanged] = useState<boolean>(false);

  useEffect(() => {
    const awd = () => {
      setJob(data?.job);
    };
    awd();
  }, [data, job]);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      event.returnValue = '';
    };
    if (isFormChanged) {
      window.addEventListener('beforeunload', handler);
    }

    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [isFormChanged]);

  const jobUpdateOnSubmit: SubmitHandler<JobUpdateValues> = async data => {
    try {
      const JobUpdateData = { id: jobId, ...data };
      await updateJob(JobUpdateData);
      setIsFormChanged(false);
      navigate(routes.jobs);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    isUpdateJobSuccess &&
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        t('job_post_page.success'),
        t('job_post_page.successEditMessage'),
      );
    isUpdateJobError &&
      openNotificationWithIcon(
        NotificationType.ERROR,
        t('description.profileQp1.notifFailed'),
        t('description.profileQp1.notifFailedMsg'),
      );
  }, [isUpdateJobSuccess, isUpdateJobError]);

  return (
    <PageWrapper isLoading={isLoading}>
      {job && (
        <FormWrapper>
          <Form
            onFinish={jobUpdateHandleSubmit(jobUpdateOnSubmit)}
            onChange={() => {
              setIsFormChanged(true);
            }}
          >
            <Form.Item>
              <TitleWrapper>
                <Title level={2}>{t('job_post_page.update_title')}</Title>
              </TitleWrapper>
            </Form.Item>
            <Controller
              name={title}
              control={jobUpdateControl}
              defaultValue={job?.title}
              render={({ field }) => (
                <Form.Item label={t('job_post_page.title_label')}>
                  <StyledInput
                    {...field}
                    size="large"
                    placeholder={t('job_post_page.title_label_placeholder')}
                  />
                  {errors.title && (
                    <StyledErrorMessage>
                      {errors.title?.message}
                    </StyledErrorMessage>
                  )}
                </Form.Item>
              )}
            />
            <Controller
              name={description}
              control={jobUpdateControl}
              defaultValue={job?.description}
              render={({ field }) => (
                <Form.Item label={t('job_post_page.description_label')}>
                  <StyledTextArea
                    {...field}
                    allowClear
                    size="large"
                    placeholder={t(
                      'job_post_page.description_label_placeholder',
                    )}
                    maxLength={jobDescriptionMaxLength}
                    autoSize={true}
                  />
                  {errors.description && (
                    <StyledErrorMessage>
                      {errors.description?.message}
                    </StyledErrorMessage>
                  )}
                </Form.Item>
              )}
            />
            <Controller
              name={hourly_rate}
              control={jobUpdateControl}
              defaultValue={job?.hourly_rate}
              render={({ field }) => (
                <Form.Item label={t('job_post_page.hourly_rate')}>
                  <StyledInputNumber
                    {...field}
                    prefix={t('description.profileQp1.hRPrefix')}
                    addonAfter={t('description.profileQp1.hRSuffix')}
                    style={{ width: '100%' }}
                    min={1}
                  />
                  {errors.hourly_rate && (
                    <StyledErrorMessage>
                      {t('errors.requiredError')}
                    </StyledErrorMessage>
                  )}
                </Form.Item>
              )}
            />
            <PropertiesWrapper>
              <Text>
                {t('job_post_page.category_label')}: {job?.category?.name}
              </Text>
            </PropertiesWrapper>

            <PropertiesWrapper>
              <Text>
                {t('job_post_page.english_level_label')}: {job?.english_level}
              </Text>
            </PropertiesWrapper>

            <Space>
              <PropertiesWrapper>
                <Text>
                  {t('job_post_page.duration')}: {job?.duration}
                </Text>
              </PropertiesWrapper>
              <PropertiesWrapper>
                <Text>
                  {t('job_post_page.duration_placeholder')}:{' '}
                  {job?.duration_amount}
                </Text>
              </PropertiesWrapper>
            </Space>
            <PropertiesWrapper>
              <Text>
                {t('job_post_page.available_time')}: {job?.available_time}
              </Text>
            </PropertiesWrapper>

            <Form.Item>
              <ButtonWrapper>
                <StyledButton htmlType="submit">
                  {t('general.submit')}
                </StyledButton>
              </ButtonWrapper>
            </Form.Item>
          </Form>
        </FormWrapper>
      )}
    </PageWrapper>
  );
};
