import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Form, Row, Space, Typography } from 'antd';
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
  agreement: boolean;
};

const { Text, Link } = Typography;

const schema: yup.SchemaOf<Partial<FormValues>> = yup.object({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
  agreement: yup.bool().oneOf([true]),
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
          {formState?.errors.confirmPassword && (
            <Text type="danger">{t('loginPage.match_error')}</Text>
          )}
        </Col>

        <Col>
          <Space direction="vertical">
            <Space>
              <input type="checkbox" value="true" {...register('agreement')} />
              <Text>{t('loginPage.terms_agree')}</Text>
              <Link>{t('loginPage.terms')}</Link>
            </Space>
            {formState?.errors.agreement && (
              <Text type="danger">{t('loginPage.agreement_error')}</Text>
            )}

            <StylesButton size="large" type="primary" block htmlType="submit">
              {t('loginPage.signUp')}
            </StylesButton>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
