import { Form, Space, Typography } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  InputsValues,
  routes,
  schema,
  StyledButton,
  StyledInput,
  StyledInputNumber,
  StyledSelect,
  StyledTextArea,
} from '@freelance/components';
import { yupResolver } from '@hookform/resolvers/yup';
import useProperties from 'src/hooks/useProperties';
import { usePostJobMutation } from 'src/redux/services/jobsApi';
import { baseTheme } from 'src/styles/theme';

import {
  ButtonWrapper,
  FormWrapper,
  StyledErrorMessage,
  TitleWrapper,
} from './styles';

const { Title, Text } = Typography;
export function JobPostForm() {
  const {
    availableTime,
    englishLevels,
    durationAmount,

    categories,
    skills,

    getOptionsForSelectWithId,
    getOptionsForSelectString,
  } = useProperties();

  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsValues>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [postJob] = usePostJobMutation();

  const onSubmit: SubmitHandler<InputsValues> = async data => {
    try {
      await postJob(data);
      navigate(routes.talents);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <FormWrapper>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item>
          <TitleWrapper>
            <Title level={2}>{t('job_post_page.form_title')}</Title>
          </TitleWrapper>
        </Form.Item>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.title_label')}>
              <StyledInput
                {...field}
                size="large"
                placeholder={t('job_post_page.title_label_placeholder')}
              />
              {errors.title && (
                <StyledErrorMessage>{errors.title?.message}</StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.description_label')}>
              <StyledTextArea
                {...field}
                allowClear
                size="large"
                placeholder={t('job_post_page.description_label_placeholder')}
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
          name="hourly_rate"
          control={control}
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

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.category_label')}>
              <StyledSelect
                {...field}
                size="large"
                showSearch
                placeholder={t('job_post_page.select_to_search')}
                style={{ width: '100%' }}
                options={getOptionsForSelectWithId(categories)}
              />
              {errors.category && (
                <StyledErrorMessage>
                  {errors.category?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.skills_label')}>
              <Text>{t('job_post_page.skills_label_minimize')}</Text>
              <StyledSelect
                {...field}
                mode="multiple"
                size="large"
                style={{ width: '100%' }}
                options={getOptionsForSelectWithId(skills)}
                placeholder={t('job_post_page.skills_placeholder')}
                tokenSeparators={[',']}
              />

              {errors.skills && (
                <StyledErrorMessage>
                  {errors.skills?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="english_level"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.english_level_label')}>
              <StyledSelect
                {...field}
                style={{ width: '100%' }}
                size="large"
                defaultValue={t('job_post_page.english_level_placeholder')}
                options={getOptionsForSelectString(englishLevels)}
              />
              {errors.english_level && (
                <StyledErrorMessage>
                  {errors.english_level?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />
        <Space>
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('job_post_page.duration')}>
                <StyledInput
                  {...field}
                  style={{ width: '100%' }}
                  placeholder={t('job_post_page.duration_amount_placeholder')}
                />
                {errors.duration_amount && (
                  <StyledErrorMessage>
                    {errors.duration_amount?.message}
                  </StyledErrorMessage>
                )}
              </Form.Item>
            )}
          />
          <Controller
            name="duration_amount"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <StyledSelect
                  {...field}
                  style={{ width: '220%' }}
                  size="large"
                  defaultValue={t('job_post_page.duration_placeholder')}
                  options={getOptionsForSelectString(durationAmount)}
                />
                {errors.duration && (
                  <StyledErrorMessage>
                    {errors.duration?.message}
                  </StyledErrorMessage>
                )}
              </Form.Item>
            )}
          />
        </Space>

        <Controller
          name="available_time"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.available_time')}>
              <StyledSelect
                {...field}
                size="large"
                showSearch
                placeholder={t('job_post_page.available_time_placeholder')}
                allowClear
                style={{ width: '100%' }}
                options={getOptionsForSelectString(availableTime)}
              />
              {errors.available_time && (
                <StyledErrorMessage>
                  {errors.available_time?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Form.Item>
          <ButtonWrapper>
            <StyledButton theme={baseTheme} htmlType="submit">
              {t('general.submit')}
            </StyledButton>
          </ButtonWrapper>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}
