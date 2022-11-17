import { useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { passwordValidationRegExp } from 'src/pages/PasswordReset/constants';
import { useRegisterUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';

import { FormItem } from './styles';

import 'antd/dist/antd.css';

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
      alert(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: registerData.access_token }));
      navigate('/role');
    }
    if (isError) {
      alert('Something went wrong...');
    }
  }, [isSuccess, isError]);

  return (
    <Form
      name="basic"
      form={form}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Form.Item
            rules={[
              { required: true, message: `${t('loginPage.email_error')}` },
            ]}
            hasFeedback
            {...field}
          >
            <Input
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
          name="firstName"
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('loginPage.name_error')}` },
              ]}
              hasFeedback
              {...field}
            >
              <Input
                size="large"
                type="firstName"
                id="firstName-field"
                placeholder={t('loginPage.first_name')}
              />
            </FormItem>
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <FormItem
              rules={[
                { required: true, message: `${t('loginPage.name_error')}` },
              ]}
              hasFeedback
              {...field}
            >
              <Input
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
          name="password"
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
              <Input.Password
                size="large"
                type="password"
                id="password-field"
                placeholder={t('loginPage.loginPage_password')}
              />
            </FormItem>
          )}
        />

        <Controller
          name="confirmPassword"
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
              <Input.Password
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
        name="agreement"
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
          <a href="/signup">{t('loginPage.terms')}</a>
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
