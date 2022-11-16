import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Typography } from 'antd';
import { useLoginUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';
import * as yup from 'yup';

import { StyledInput, StylesButton } from './styles';

import 'antd/dist/antd.css';

type FormValues = {
  email: string;
  password: string;
};

const { Text } = Typography;

const schema: yup.SchemaOf<Partial<FormValues>> = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { data: loginData, isSuccess, isError }] =
    useLoginUserMutation();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

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
      navigate('/owner-profile');
    }
    if (isError) {
      alert('Something went wrong...');
    }
  }, [isSuccess, isError]);

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <Form
      name="basic"
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Form.Item>
        <StyledInput
          type="email"
          id="email-field"
          placeholder={t('loginPage.loginPage_email')}
          {...register('email')}
        />
        {formState?.errors?.email && (
          <Text type="danger">{t('loginPage.email_error')}</Text>
        )}
      </Form.Item>

      <Form.Item>
        <StyledInput
          type="password"
          id="password-field"
          placeholder={t('loginPage.loginPage_password')}
          {...register('password')}
        />
        {formState?.errors?.password && (
          <Text type="danger">{t('loginPage.password_error')}</Text>
        )}
      </Form.Item>

      <Form.Item>
        <StylesButton size="large" type="primary" block htmlType="submit">
          {t('loginPage.loginPage_name')}
        </StylesButton>
      </Form.Item>

      <Form.Item>
        <Button type="link" htmlType="button" onClick={goToSignup}>
          {t('loginPage.signUp')}
        </Button>
        <Button type="link" htmlType="button">
          {t('loginPage.forgot_password')}
        </Button>
      </Form.Item>
    </Form>
  );
};
