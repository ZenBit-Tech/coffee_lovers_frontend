import { useEffect } from 'react';
import { Button, Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledInput, StyledPasswordInput } from '@freelance/components';
import { roles, routes } from '@freelance/components';
import { useLoginUserMutation } from 'src/redux/auth/auth-api';
import { setRole } from 'src/redux/auth/auth-slice';
import { setUser } from 'src/redux/auth/auth-slice';
import { useLazyGetUserInfoQuery } from 'src/redux/services/user';

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
  const [getUserInfo, { data: userData, isSuccess: isUserSuccess }] =
    useLazyGetUserInfoQuery();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      if (data.email && data.password) {
        const email = data.email;
        const password = data.password;
        await loginUser({ email, password });
        await getUserInfo();
      }
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (isLoginSuccess && isUserSuccess) {
      dispatch(setUser({ access_token: loginData.access_token }));
      userData && dispatch(setRole({ role: userData.role }));

      navigate(
        userData?.role === roles.freelancer
          ? routes.freelancerProfile
          : routes.jobOwnerDashboard,
      );
    }
    if (isError) {
      alert('Something went wrong...');
    }
  });

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
          onClick={() => navigate(`${routes.signup}`)}
        >
          {t('loginPage.signUp')}
        </Button>
        <Button
          type="link"
          htmlType="button"
          onClick={() => navigate(`${routes.passwordreset}`)}
        >
          {t('loginPage.forgot_password')}
        </Button>
      </Form.Item>
    </Form>
  );
};
