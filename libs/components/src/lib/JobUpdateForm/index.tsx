import { Fragment, useEffect, useState } from 'react';
import { Form, Space, Typography } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  description,
  GetJobResponse,
  hourly_rate,
  jobUpdateSchema,
  JobUpdateValues,
  routes,
  StyledButton,
  StyledInput,
  StyledInputNumber,
  StyledTextArea,
  title,
} from '@freelance/components';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useGetJobQuery,
  useUpdateJobMutation,
} from 'src/redux/job-post/job-post';

import {
  ButtonWrapper,
  FormWrapper,
  PropertiesWrapper,
  StyledErrorMessage,
  TitleWrapper,
} from './styles';

const { Title, Text } = Typography;

export const JobUpdateForm = () => {
  const [job, setJob] = useState<GetJobResponse>();
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

  const [updateJob] = useUpdateJobMutation();
  const { data, isLoading } = useGetJobQuery(jobId);

  useEffect(() => {
    const awd = () => {
      setJob(data?.job);
    };
    awd();
  }, [data, job]);

  const jobUpdateOnSubmit: SubmitHandler<JobUpdateValues> = async data => {
    try {
      const JobUpdateData = { id: jobId, ...data };
      await updateJob(JobUpdateData);
      navigate(routes.talents);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <Fragment>
      {isLoading && <p>Loading</p>}
      {job && (
        <FormWrapper>
          <Form onFinish={jobUpdateHandleSubmit(jobUpdateOnSubmit)}>
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
                    maxLength={250}
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
                      {errors.hourly_rate?.message}
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
    </Fragment>
  );
};
