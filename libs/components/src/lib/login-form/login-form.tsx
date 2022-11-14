import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'antd';
import { useLoginUserMutation } from 'src/redux/auth/auth-api';
import { setUser } from 'src/redux/auth/auth-slice';
import * as yup from 'yup';

import { StyledInput, StylesButton } from './styles';

import 'antd/dist/antd.css';

type FormValues = {
  email: string;
  password: string;
};

const schema: yup.SchemaOf<Partial<FormValues>> = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { data: loginData }] = useLoginUserMutation();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      if (data.email && data.password) {
        const email = data.email;
        const password = data.password;
        await loginUser({ email, password }).unwrap();
        dispatch(setUser({ access_token: loginData.access_token }));
      }
    } catch (error) {
      alert(error);
    }
  };

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
        {formState?.errors?.email && <p>{t('loginPage.email_error')}</p>}
      </Form.Item>

      <Form.Item>
        <StyledInput
          type="password"
          id="password-field"
          placeholder={t('loginPage.loginPage_password')}
          {...register('password')}
        />
        {formState?.errors?.password && <p>{t('loginPage.password_error')}</p>}
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
