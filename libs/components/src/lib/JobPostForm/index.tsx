import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Select } from 'antd';

import Icon from '../assets/Icon';
import { StyledButton } from '../button/styles';

import { multipleSelectOption, options } from './constant';
import {
  FormContainer,
  FormTitle,
  Input,
  InputContainer,
  StyledErrorMessage,
  WrapperSelect,
} from './styles';
import { InputsValues, schema } from './validation';

export function ErrorMessage() {
  const { t } = useTranslation();

  return <StyledErrorMessage>{t('validation.required')}</StyledErrorMessage>;
}

export function JobPostForm() {
  const { t } = useTranslation();
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
      <FormTitle>{t('job_post_page.page_name')}</FormTitle>
      <p>{t('job_post_page.fill_this_form')}</p>

      <Form onFinish={handleSubmit(onSubmit)}>
        <InputContainer>
          <Icon id={'#account'} />

          <Controller
            name="projectName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="projectName-field"
                placeholder={t('job_post_page.project_name_placeholder')}
                type="text"
              />
            )}
          />
        </InputContainer>
        {errors.projectName && <ErrorMessage />}

        <InputContainer>
          <Icon id={'#password'} />
          <Controller
            name="about"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...field}
                id="about-field"
                placeholder={t('job_post_page.about_placeholder')}
                type="text"
              />
            )}
          />
        </InputContainer>
        {errors.about && <ErrorMessage />}

        <WrapperSelect>
          <Controller
            name="englishLevel"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                style={{ width: '100%' }}
                defaultValue={t('job_post_page.english_level')}
                options={options}
              />
            )}
          />
        </WrapperSelect>
        {errors.englishLevel && <ErrorMessage />}

        <WrapperSelect>
          <Controller
            name="jobCategory"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder={t('job_post_page.job_category_placeholder')}
                options={multipleSelectOption}
              />
            )}
          />
          {errors.jobCategory && <ErrorMessage />}
        </WrapperSelect>

        <StyledButton type="submit" style={{ margin: '0 auto 0' }}>
          {t('general.submit')}
        </StyledButton>
      </Form>
    </FormContainer>
  );
}
export default JobPostForm;
