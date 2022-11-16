import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, Col, Form, Row, Space, Typography } from 'antd';
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

const { Text, Link } = Typography;

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

  const [registerUser, { data: registerData, isSuccess, isError }] =
    useRegisterUserMutation();

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
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ access_token: registerData.access_token }));
      navigate('/owner-profile');
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
      <Row gutter={[16, 32]}>
        <Col span={12}>
          <StyledInput
            type="email"
            id="email-field"
            placeholder={t('loginPage.loginPage_email')}
            {...register('email')}
          />
          {formState?.errors?.email && (
            <Text type="danger">{t('loginPage.email_error')}</Text>
          )}
        </Col>

        <Col className="gutter-row" offset={12} pull={12} span={6}>
          <StyledInput
            type="firstName"
            id="firstName-field"
            placeholder={t('loginPage.first_name')}
            {...register('firstName')}
          />
          {formState?.errors?.firstName && (
            <Text type="danger">{t('loginPage.email_error')}</Text>
          )}
        </Col>

        <Col className="gutter-row" pull={12} span={6}>
          <StyledInput
            type="lastName"
            id="lastName-field"
            placeholder={t('loginPage.last_name')}
            {...register('lastName')}
          />
          {formState?.errors?.lastName && (
            <Text type="danger">{t('loginPage.email_error')}</Text>
          )}
        </Col>

        <Col offset={12} pull={12} span={6}>
          <StyledInput
            type="password"
            id="password-field"
            placeholder={t('loginPage.loginPage_password')}
            {...register('password')}
          />
          {formState?.errors?.password && (
            <Text type="danger">{t('loginPage.password_error')}</Text>
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

        <Col>
          <Space direction="vertical">
            <Space>
              <Checkbox type="checkbox" />
              <Text>{t('loginPage.terms_agree')}</Text>
              <Link href="#">{t('loginPage.terms')}</Link>
            </Space>

            <StylesButton size="large" type="primary" block htmlType="submit">
              {t('loginPage.signUp')}
            </StylesButton>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
