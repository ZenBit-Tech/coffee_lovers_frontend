import { Form, Space, Typography } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  StyledButton,
  StyledInput,
  StyledSelect,
  StyledTextArea,
} from '@freelance/components';
import { yupResolver } from '@hookform/resolvers/yup';
import useProperties from 'src/hooks/useProperties';
import { usePostJobsMutation } from 'src/redux/job-post/job-post';

import { durationOptions, InputsValues, schema } from '../constants';

import {
  ButtonWrapper,
  FormWrapper,
  StyledErrorMessage,
  TitleWrapper,
} from './styles';

const { Title, Text } = Typography;

export function JobPostForm() {
  const {
    categories,
    skills,
    englishLevels,

    getOptionsForSelectWithId,
    getOptionsForSelectString,
  } = useProperties();
  const navigate = useNavigate();
  const [PostJob] = usePostJobsMutation();

  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmitFirstPage: SubmitHandler<InputsValues> = async data => {
    navigate('/talent-list');
    console.log(data);

    try {
      await PostJob({
        title: 'Landing page',
        description: 'I need create landing page',
        hourly_rate: 14,
        available_time: 45,
        category: 4,
        english_level: 'Upper-Intermediate',
        skills: [4, 5, 3],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <Form onFinish={handleSubmit(onSubmitFirstPage)}>
        <Form.Item>
          <TitleWrapper>
            <Title level={2}>{t('job_post_page.form_title')}</Title>
          </TitleWrapper>
        </Form.Item>
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.project_name_label')}>
              <StyledInput {...field} size="large" />
              {errors.projectName && (
                <StyledErrorMessage>
                  {errors.projectName?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="about"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.about_label')}>
              <StyledTextArea
                {...field}
                allowClear
                size="large"
                placeholder="maxLength is 250"
                maxLength={250}
                autoSize={true}
              />
              {errors.about && (
                <StyledErrorMessage>{errors.about?.message}</StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="jobCategory"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.job_category_label')}>
              <StyledSelect
                {...field}
                size="large"
                showSearch
                placeholder="Select to search"
                style={{ width: '100%' }}
                options={getOptionsForSelectWithId(categories)}
              />
              {errors.jobCategory && (
                <StyledErrorMessage>
                  {errors.jobCategory?.message}
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
          name="englishLevel"
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
              {errors.englishLevel && (
                <StyledErrorMessage>
                  {errors.englishLevel?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />
        <Space>
          <Controller
            name="durationAmount"
            control={control}
            render={({ field }) => (
              <Form.Item label={t('job_post_page.duration')}>
                <StyledInput
                  {...field}
                  style={{ width: '100%' }}
                  placeholder={t('job_post_page.duration_amount_placeholder')}
                />
                {errors.durationAmount && (
                  <StyledErrorMessage>
                    {errors.durationAmount?.message}
                  </StyledErrorMessage>
                )}
              </Form.Item>
            )}
          />
          <Controller
            name="duration"
            control={control}
            render={({ field }) => (
              <Form.Item>
                <StyledSelect
                  {...field}
                  style={{ width: '145%' }}
                  size="large"
                  defaultValue={t('job_post_page.duration_placeholder')}
                  options={durationOptions}
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

        <Form.Item>
          <ButtonWrapper>
            <StyledButton htmlType="submit">{t('general.submit')}</StyledButton>
          </ButtonWrapper>
        </Form.Item>
      </Form>
    </FormWrapper>
  );
}
