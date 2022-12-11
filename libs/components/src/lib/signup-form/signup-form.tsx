import { useEffect } from 'react';
import { Button, Checkbox, Form } from 'antd';
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
import { routes } from '@freelance/constants';
import { passwordValidationRegExp } from 'src/pages/PasswordReset/constants';
import { useRegisterUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';

import { FormItem } from './styles';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreement: boolean;
};

export function SignUpForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<FormValues>();

  const [registerUser, { data: registerData, isSuccess, isError }] =
    useRegisterUserMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const password = data.password;

      if (firstName && lastName && password && email) {
        await registerUser({ email, firstName, lastName, password });
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: registerData.access_token }));
      navigate(`${routes.role}`);
    }
    if (isError) {
      alert('Something went wrong...');
    }
  }, [isSuccess, isError]);

  return (
    <Form
      name="basic"
      form={form}
      wrapperCol={{ span: 12 }}
      onFinish={handleSubmit(onSubmit)}
    >
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
