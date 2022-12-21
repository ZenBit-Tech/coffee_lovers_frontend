import { useEffect } from 'react';
import { Button, Checkbox, Form, notification } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledInput, StyledPasswordInput } from '@freelance/components';
import {
  authAgreement,
  authConfirmPassword,
  authEmail,
  authFirstName,
  authLastName,
  authPassword,
} from '@freelance/components';
import { authError, routes } from '@freelance/constants';
import { passwordValidationRegExp } from 'src/pages/PasswordReset/constants';
import { useRegisterUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';

import { FormItem } from './styles';

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
};

type NotificationType = 'error';

export function SignUpForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<FormValues>();

  const [registerUser, { data: registerData, isSuccess, isError }] =
    useRegisterUserMutation();
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: `${t('loginPage.notificationMessage')}`,
      description: `${t('loginPage.notificationExistsDescr')}`,
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const first_name = data.first_name;
      const last_name = data.last_name;
      const email = data.email;
      const password = data.password;

      if (first_name && last_name && password && email) {
        await registerUser({ email, first_name, last_name, password });
      }
    } catch (error) {
      openNotificationWithIcon(authError);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: registerData.access_token }));
      navigate(`${routes.role}`);
    }
    if (isError) {
      openNotificationWithIcon(authError);
    }
  }, [isSuccess, isError]);

  return (
    <Form
      name="basic"
      form={form}
      wrapperCol={{ span: 12 }}
      onFinish={handleSubmit(onSubmit)}
    >
      {contextHolder}
      <Controller
        name={authEmail}
        control={control}
        render={({ field }) => (
          <Form.Item
            rules={[
              { required: true, message: `${t('loginPage.email_error')}` },
            ]}
            hasFeedback
            {...field}
          >
            <StyledInput
              size="large"
              type="email"
              id="email-field"
              placeholder={t('loginPage.loginPage_email')}
            />
          </Form.Item>
        )}
      />

      <Form.Item>
        <Controller
          name={authFirstName}
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('loginPage.name_error')}` },
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
            </FormItem>
          )}
        />

        <Controller
          name={authLastName}
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('loginPage.name_error')}` },
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
            </FormItem>
          )}
        />
      </Form.Item>

      <Form.Item>
        <Controller
          name={authPassword}
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('loginPage.password_error')}` },
                {
                  pattern: passwordValidationRegExp,
                  message: `${t('resetPassword.validation.passwordRegExp')}`,
                },
              ]}
              hasFeedback
              {...field}
            >
              <StyledPasswordInput
                size="large"
                type="password"
                id="password-field"
                placeholder={t('loginPage.loginPage_password')}
              />
            </FormItem>
          )}
        />

        <Controller
          name={authConfirmPassword}
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('loginPage.match_error')}` },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(`${t('loginPage.match_error')}`),
                    );
                  },
                }),
              ]}
              hasFeedback
              {...field}
            >
              <StyledPasswordInput
                size="large"
                type="password"
                id="confirmPassword-field"
                placeholder={t('loginPage.loginPage_password')}
              />
            </FormItem>
          )}
        />
      </Form.Item>

      <Form.Item
        name={authAgreement}
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(`${t('loginPage.agreement_error')}`),
                  ),
          },
        ]}
      >
        <Checkbox>
          {t('loginPage.terms_agree')}{' '}
          <a href={routes.conditions}>{t('loginPage.terms')}</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button size="large" type="primary" block htmlType="submit">
          {t('loginPage.signUp')}
        </Button>
      </Form.Item>
    </Form>
  );
}
