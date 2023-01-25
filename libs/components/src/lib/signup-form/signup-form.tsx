import { useEffect } from 'react';
import { Button, Checkbox, Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  authAgreement,
  authConfirmPassword,
  authEmail,
  authFirstName,
  authLastName,
  authPassword,
  NotificationType,
  routes,
  StyledInput,
  StyledPasswordInput,
  useOpenNotification,
} from '@freelance/components';
import { passwordValidationRegExp } from 'src/pages/PasswordReset/constants';
import { useRegisterUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';

import { formName, nameValidationRegExp } from './constants';
import { FormItem } from './styles';

type FormValues = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
};

export function SignUpForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleSubmit, getValues, control, watch, setValue } =
    useForm<FormValues>();
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();

  const [registerUser, { data: registerData, isSuccess, isError }] =
    useRegisterUserMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const first_name = data.first_name;
      const last_name = data.last_name;
      const email = data.email;
      const password = data.password;

      if (first_name && last_name && password && email) {
        await registerUser({ email, first_name, last_name, password });
      }
      sessionStorage.clear();
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        `${t('loginPage.notificationMessage')}`,
        `${t('loginPage.notificationExistsDescr')}`,
      );
    }
  };

  useFormPersist(formName, {
    watch,
    setValue,
    exclude: [authPassword, authConfirmPassword],
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: registerData.access_token }));
      navigate(`${routes.role}`);
    }
    if (isError) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        `${t('loginPage.notificationMessage')}`,
        `${t('loginPage.notificationExistsDescr')}`,
      );
    }
  }, [isSuccess, isError]);

  return (
    <Form
      name={formName}
      form={form}
      wrapperCol={{ span: 24 }}
      onFinish={handleSubmit(onSubmit)}
      fields={[
        {
          name: authEmail,
          value: getValues().email,
        },
        {
          name: authFirstName,
          value: getValues().first_name,
        },
        {
          name: authLastName,
          value: getValues().last_name,
        },
      ]}
    >
      {contextHolder}
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
              { required: true, message: `${t('errors.requiredError')}` },
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
                { required: true, message: `${t('errors.requiredError')}` },
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
            </FormItem>
          )}
        />

        <Controller
          name={authLastName}
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('errors.requiredError')}` },
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
                { required: true, message: `${t('errors.requiredError')}` },
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
