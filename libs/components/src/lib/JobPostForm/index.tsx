import { Form, Input, Select, Typography } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { StyledButton } from '../button/styles';
import { multipleSelectOptions, options, skillsOptions } from '../constants';

import { FormContainer, StyledErrorMessage } from './styles';
import { InputsValues, schema } from './validation';

export function JobPostForm() {
  const { t } = useTranslation();
  const { Title, Text } = Typography;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<InputsValues> = data => {
    console.log(data);
  };

  return (
    <FormContainer>
      <div style={{ textAlign: 'center' }}>
        <Title>{t('job_post_page.page_name')}</Title>
        <Title level={2}>{t('job_post_page.fill_this_form')}</Title>
      </div>

      <Form onFinish={handleSubmit(onSubmit)}>
        <Controller
          name="projectName"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.project_name_label')}>
              <Input {...field} size="large" />
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
              <Input {...field} size="large" />
              {errors.about && (
                <StyledErrorMessage>{errors.about?.message}</StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="englishLevel"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.english_level_label')}>
              <Select
                {...field}
                style={{ width: '100%' }}
                size="large"
                defaultValue={t('Required level')}
                options={options}
              />
              {errors.englishLevel && (
                <StyledErrorMessage>
                  {errors.englishLevel?.message}
                </StyledErrorMessage>
              )}
            </Form.Item>
          )}
        />

        <Controller
          name="jobCategory"
          control={control}
          render={({ field }) => (
            <Form.Item label={t('job_post_page.job_category_label')}>
              <Select
                {...field}
                size="large"
                showSearch
                placeholder="Search to Select"
                style={{ width: '100%' }}
                options={multipleSelectOptions}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.value ?? '').includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.value ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.value ?? '').toLowerCase())
                }
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
              <Select
                {...field}
                mode="tags"
                size="large"
                style={{ width: '100%' }}
                options={skillsOptions}
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

        <StyledButton type="submit" style={{ margin: '0 auto 0' }}>
          {t('general.submit')}
        </StyledButton>
      </Form>
    </FormContainer>
  );
}
export default JobPostForm;
