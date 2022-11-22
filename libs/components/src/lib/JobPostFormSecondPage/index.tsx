import { Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledButton, StyledInput, StyledSelect } from '@freelance/components';
import { yupResolver } from '@hookform/resolvers/yup';
import useProperties from 'src/hooks/useProperties';

import {
  durationOptions,
  InputsValuesSecondPage,
  schemaSecondPage,
} from '../constants';

import { StyledErrorMessage } from './styles';

export function JobPostFormSecondPage() {
  const { t } = useTranslation();
  const {
    englishLevels,

    getOptionsForSelectString,
  } = useProperties();

  const {
    control: controlForSecondPage,
    handleSubmit: handleSubmitForSecondPage,
    formState: { errors },
  } = useForm<InputsValuesSecondPage>({
    resolver: yupResolver(schemaSecondPage),
  });

  const onSubmitSecondPage: SubmitHandler<InputsValuesSecondPage> = data => {
    console.log(data);
  };

  return (
    <Form
      onFinish={handleSubmitForSecondPage(onSubmitSecondPage)}
      wrapperCol={{ span: 8 }}
    >
      <Controller
        name="englishLevel"
        control={controlForSecondPage}
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
      <Controller
        name="durationAmount"
        control={controlForSecondPage}
        render={({ field }) => (
          <Form.Item label={t('job_post_page.duration')}>
            <StyledInput
              {...field}
              size="large"
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
        control={controlForSecondPage}
        render={({ field }) => (
          <Form.Item>
            <StyledSelect
              {...field}
              style={{ width: '100%' }}
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

      <Form.Item>
        <StyledButton size="large" type="primary" htmlType="submit">
          {t('general.submit')}
        </StyledButton>
      </Form.Item>
    </Form>
  );
}
