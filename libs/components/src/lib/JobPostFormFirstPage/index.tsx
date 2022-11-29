import { Form, Typography } from 'antd';
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

import { InputsValues, schema } from '../constants';

import { StyledErrorMessage } from './styles';

const { Title, Text } = Typography;

export function JobPostFormFirstPage() {
  const { categories, skills, getOptionsForSelectWithId } = useProperties();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsValues>({
    resolver: yupResolver(schema),
  });

  const onSubmitFirstPage: SubmitHandler<InputsValues> = async data => {
    navigate('/owner-profile/job-post-second-page');
    console.log(data);
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Title>{t('job_post_page.page_name')}</Title>
        <Title level={2}>{t('job_post_page.fill_this_form')}</Title>
      </div>

      <Form onFinish={handleSubmit(onSubmitFirstPage)} wrapperCol={{ span: 8 }}>
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
                placeholder="Search to Select"
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
        <Form.Item>
          <StyledButton htmlType="submit">{t('general.continue')}</StyledButton>
        </Form.Item>
      </Form>
    </>
  );
}
