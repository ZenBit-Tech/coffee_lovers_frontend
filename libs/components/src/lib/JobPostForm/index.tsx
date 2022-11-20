import { useState } from 'react';
import { Button, Form, Input, Select, Typography } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { StyledButton } from '../button/styles';
import {
  durationOptions,
  englishOptions,
  multipleSelectOptions,
  skillsOptions,
} from '../constants';

import { StyledErrorMessage } from './styles';
import {
  InputsValues,
  InputsValuesSecondPage,
  schema,
  schemaSecondPage,
} from './validation';

export function JobPostForm() {
  const [firstPage, setFirstPage] = useState(true);
  const { t } = useTranslation();
  const { Title, Text } = Typography;
  const { TextArea } = Input;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsValues>({
    resolver: yupResolver(schema),
  });

  const {
    control: controlForSecondPage,
    handleSubmit: handleSubmitForSecondPage,
    formState,
  } = useForm<InputsValuesSecondPage>({
    resolver: yupResolver(schemaSecondPage),
  });

  const onSubmitFirstPage: SubmitHandler<InputsValues> = data => {
    console.log(data);
    setFirstPage(false);
  };

  const onSubmitSecondPage: SubmitHandler<InputsValuesSecondPage> = data => {
    console.log(data);
  };

  return (
    <>
      {firstPage && (
        <>
          <div style={{ textAlign: 'center' }}>
            <Title>{t('job_post_page.page_name')}</Title>
            <Title level={2}>{t('job_post_page.fill_this_form')}</Title>
          </div>

          <Form
            onFinish={handleSubmit(onSubmitFirstPage)}
            wrapperCol={{ span: 8 }}
          >
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
                  <TextArea
                    {...field}
                    allowClear
                    size="large"
                    placeholder="maxLength is 250"
                    maxLength={250}
                    autoSize={true}
                  />
                  {errors.about && (
                    <StyledErrorMessage>
                      {errors.about?.message}
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
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                style={{ margin: '0 auto 0' }}
              >
                {t('general.submit')}
              </Button>
            </Form.Item>
            <Form.Item>
              <StyledButton type="submit" style={{ margin: '0 auto 0' }}>
                {t('general.submit')}
              </StyledButton>
            </Form.Item>
          </Form>
        </>
      )}
      {!firstPage && (
        <Form
          onFinish={handleSubmitForSecondPage(onSubmitSecondPage)}
          wrapperCol={{ span: 8 }}
        >
          <Controller
            name="englishLevel"
            control={controlForSecondPage}
            render={({ field }) => (
              <Form.Item label={t('job_post_page.english_level_label')}>
                <Select
                  {...field}
                  style={{ width: '100%' }}
                  size="large"
                  defaultValue={t('job_post_page.english_level_placeholder')}
                  options={englishOptions}
                />
                {formState.errors.englishLevel && (
                  <StyledErrorMessage>
                    {formState.errors.englishLevel?.message}
                  </StyledErrorMessage>
                )}
              </Form.Item>
            )}
          />
          <Controller
            name="durationAmount"
            control={controlForSecondPage}
            render={({ field }) => (
              <Form.Item label={t('job_post_page.duration')}>
                <Input
                  {...field}
                  size="large"
                  placeholder={t('job_post_page.duration_amount_placeholder')}
                />
                {formState.errors.durationAmount && (
                  <StyledErrorMessage>
                    {formState.errors.durationAmount?.message}
                  </StyledErrorMessage>
                )}
              </Form.Item>
            )}
          />
          <Controller
            name="duration"
            control={controlForSecondPage}
            render={({ field }) => (
              <Form.Item>
                <Select
                  {...field}
                  style={{ width: '100%' }}
                  size="large"
                  defaultValue={t('job_post_page.duration_placeholder')}
                  options={durationOptions}
                />
                {formState.errors.duration && (
                  <StyledErrorMessage>
                    {formState.errors.duration?.message}
                  </StyledErrorMessage>
                )}
              </Form.Item>
            )}
          />

          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              style={{ margin: '0 auto 0' }}
            >
              {t('general.submit')}
            </Button>
          </Form.Item>
          <Form.Item>
            <StyledButton type="submit" style={{ margin: '0 auto 0' }}>
              {t('general.submit')}
            </StyledButton>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
export default JobPostForm;
