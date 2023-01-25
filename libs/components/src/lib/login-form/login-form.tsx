import { useEffect } from 'react';
import { Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authEmail,
  authPassword,
  NotificationType,
  StyledInput,
  StyledPasswordInput,
  useOpenNotification,
} from '@freelance/components';
import { authTestId, routes } from '@freelance/constants';
import { useLoginUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';
import { baseTheme } from 'src/styles/theme';

import { FormWrap, StyledButton } from './styles';

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<FormValues>();
  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isError }] =
    useLoginUserMutation();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      if (data.email && data.password) {
        const email = data.email;
        const password = data.password;
        await loginUser({ email, password });
      }
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        `${t('loginPage.notificationMessage')}`,
        `${t('loginPage.notificationDescr')}`,
      );
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setUser({ access_token: loginData.access_token }));
      navigate(routes.jobs);
    }
    if (isError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        `${t('loginPage.notificationMessage')}`,
        `${t('loginPage.notificationDescr')}`,
      );
    }
  });

  return (
    <Form
      name="basic"
      wrapperCol={{ span: 22 }}
      onFinish={handleSubmit(onSubmit)}
    >
      {contextHolder}
      <FormWrap>
        <Controller
          name={authEmail}
          control={control}
          render={({ field }) => (
            <Form.Item
              rules={[
                {
                  type: 'email',
                  message: `${t('loginPage.email_error')}`,
                },
                {
                  required: true,
                  message: `${t('errors.requiredError')}`,
                },
              ]}
              hasFeedback
              {...field}
            >
              <StyledInput
                data-testid={authTestId.loginEmailField}
                size="large"
                type="email"
                id="email-field"
                placeholder={t('loginPage.loginPage_email')}
              />
            </Form.Item>
          )}
        />

        <Controller
          name={authPassword}
          control={control}
          render={({ field }) => (
            <Form.Item
              rules={[
                { required: true, message: `${t('errors.requiredError')}` },
              ]}
              hasFeedback
              {...field}
            >
              <StyledPasswordInput
                data-testid={authTestId.loginPasswordField}
                type="password"
                size="large"
                id="password-field"
                placeholder={t('loginPage.loginPage_password')}
              />
            </Form.Item>
          )}
        />

        <Form.Item>
          <StyledButton
            theme={baseTheme}
            data-testid={authTestId.loginButton}
            size="large"
            type="primary"
            block
            htmlType="submit"
          >
            {t('loginPage.loginPage_name')}
          </StyledButton>
        </Form.Item>
      </FormWrap>

      <Form.Item>
        <StyledButton
          theme={baseTheme}
          data-testid={authTestId.haveAccountButton}
          type="link"
          htmlType="button"
          onClick={() => navigate(`${routes.signup}`)}
        >
          {t('loginPage.signUp')}
        </StyledButton>
        <StyledButton
          theme={baseTheme}
          data-testid={authTestId.forgetPasswordButton}
          type="link"
          htmlType="button"
          onClick={() => navigate(`${routes.passwordreset}`)}
        >
          {t('loginPage.forgot_password')}
        </StyledButton>
      </Form.Item>
    </Form>
  );
};
