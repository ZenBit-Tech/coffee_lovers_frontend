import { useEffect } from 'react';
import { Button, Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';

import { StyledInput, StyledPasswordInput } from '../input/styles';

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm<FormValues>();
  const [loginUser, { data: loginData, isSuccess, isError }] =
    useLoginUserMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      if (data.email && data.password) {
        const email = data.email;
        const password = data.password;
        await loginUser({ email, password }).unwrap();
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: loginData.access_token }));
      navigate('/jobownerdashboard');
    }
    if (isError) {
      alert('Something went wrong...');
    }
  }, [isSuccess, isError]);

  return (
    <Form
      name="basic"
      wrapperCol={{ span: 12 }}
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
            <StyledInput
              size="large"
              type="email"
              id="email-field"
              placeholder={t('loginPage.loginPage_email')}
            />
          </Form.Item>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Item
            rules={[
              { required: true, message: `${t('loginPage.password_error')}` },
            ]}
            hasFeedback
            {...field}
          >
            <StyledPasswordInput
              type="password"
              size="large"
              id="password-field"
              placeholder={t('loginPage.loginPage_password')}
            />
          </Form.Item>
        )}
      />

      <Form.Item>
        <Button size="large" type="primary" block htmlType="submit">
          {t('loginPage.loginPage_name')}
        </Button>
      </Form.Item>

      <Form.Item>
        <Button
          type="link"
          htmlType="button"
          onClick={() => navigate('/signup')}
        >
          {t('loginPage.signUp')}
        </Button>
        <Button
          type="link"
          htmlType="button"
          onClick={() => navigate('/passwordreset')}
        >
          {t('loginPage.forgot_password')}
        </Button>
      </Form.Item>
    </Form>
  );
};
