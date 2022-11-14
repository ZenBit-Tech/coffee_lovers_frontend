import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Form, Row } from 'antd';
import { useRegisterUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';
import * as yup from 'yup';

import { StyledInput, StylesButton } from '../login-form/styles';

import 'antd/dist/antd.css';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

const schema: yup.SchemaOf<Partial<FormValues>> = yup.object({
  email: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

export function SignUpForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [registerUser, { data: registerData }] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const password = data.password;

      if (password !== data.confirmPassword) {
        alert("Passwords don't match");
      }
      if (firstName && lastName && password && email) {
        await registerUser({ email, firstName, lastName, password });
        dispatch(setUser({ access_token: registerData.access_token }));
        navigate('/owner-profile');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form
      name="basic"
      form={form}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Row gutter={[16, 32]}>
        <Col span={12}>
          <StyledInput
            type="email"
            id="email-field"
            placeholder={t('loginPage.loginPage_email')}
            {...register('email')}
          />
          {formState?.errors?.email && <p>{t('loginPage.email_error')}</p>}
        </Col>

        <Col className="gutter-row" offset={12} pull={12} span={6}>
          <StyledInput
            type="firstName"
            id="firstName-field"
            placeholder={t('loginPage.first_name')}
            {...register('firstName')}
          />
          {formState?.errors?.firstName && <p>{t('loginPage.email_error')}</p>}
        </Col>

        <Col className="gutter-row" pull={12} span={6}>
          <StyledInput
            type="lastName"
            id="lastName-field"
            placeholder={t('loginPage.last_name')}
            {...register('lastName')}
          />
          {formState?.errors?.lastName && <p>{t('loginPage.email_error')}</p>}
        </Col>

        <Col offset={12} pull={12} span={6}>
          <StyledInput
            type="password"
            id="password-field"
            placeholder={t('loginPage.loginPage_password')}
            {...register('password')}
          />
          {formState?.errors?.password && (
            <p>{t('loginPage.password_error')}</p>
          )}
        </Col>

        <Col pull={12} span={6}>
          <StyledInput
            type="password"
            id="confirmPassword-field"
            placeholder={t('loginPage.confirm_password')}
            {...register('confirmPassword')}
          />
        </Col>

        <Col span={12}>
          <StylesButton size="large" type="primary" block htmlType="submit">
            {t('loginPage.signUp')}
          </StylesButton>
        </Col>
      </Row>
    </Form>
  );
}
