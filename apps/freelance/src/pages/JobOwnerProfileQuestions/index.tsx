import { useEffect } from 'react';
import { Button, Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  authFirstName,
  authLastName,
  nameValidationRegExp,
  NotificationType,
  routes,
  StyledInput,
  useOpenNotification,
} from '@freelance/components';
import { Wrapper } from '@pages/SignupPage/styles';
import { useUpdateUserInfoMutation } from 'redux/services/userApi';

type FormValues = {
  first_name: string;
  last_name: string;
};

function JobOwnerProfileQuestions() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormValues>();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();

  const [updateUser, { isSuccess, isError }] = useUpdateUserInfoMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const first_name = data.first_name;
      const last_name = data.last_name;

      if (first_name && last_name) {
        await updateUser({ first_name, last_name });
      }
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        `${t('loginPage.notificationMessage')}`,
        `${t('loginPage.notificationWrongDescr')}`,
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`${routes.jobs}`);
    }
    if (isError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        `${t('loginPage.notificationMessage')}`,
        `${t('loginPage.notificationWrongDescr')}`,
      );
    }
  }, [isSuccess, isError]);

  return (
    <Wrapper>
      <Form
        name="basic"
        form={form}
        wrapperCol={{ span: 12 }}
        onFinish={handleSubmit(onSubmit)}
      >
        {contextHolder}
        <Form.Item>
          <Controller
            name={authFirstName}
            control={control}
            render={({ field }) => (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: `${t('errors.requiredError')}`,
                  },
                  {
                    pattern: nameValidationRegExp,
                    message: `${t('loginPage.onlyLettersError')}`,
                  },
                ]}
                hasFeedback
                {...field}
              >
                <StyledInput
                  size="large"
                  type="firstName"
                  id="firstName-field"
                  placeholder={t('loginPage.first_name')}
                />
              </Form.Item>
            )}
          />

          <Controller
            name={authLastName}
            control={control}
            render={({ field }) => (
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: `${t('errors.requiredError')}`,
                  },
                  {
                    pattern: nameValidationRegExp,
                    message: `${t('loginPage.onlyLettersError')}`,
                  },
                ]}
                hasFeedback
                {...field}
              >
                <StyledInput
                  size="large"
                  type="lastName"
                  id="lastName-field"
                  placeholder={t('loginPage.last_name')}
                />
              </Form.Item>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" block htmlType="submit">
            {t('loginPage.signUp')}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

export default JobOwnerProfileQuestions;
