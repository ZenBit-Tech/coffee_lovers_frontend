import * as React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import "antd/dist/antd.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'apps/freelance/src/redux/auth/auth-slice';

import { StyledInput, StylesButton } from './styles';

type FormValues = {
  email: string;
  password: string;
};

const schema: yup.SchemaOf<Partial<FormValues>> = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

export function LoginForm() {

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {

    form.resetFields();
    dispatch(setUser({
      email: data.email,
      id: data.password,
    }));
    navigate('/');
  }
    
  const goToSignup = () => {
    navigate('/signup')
  }

  return (
    <Form
      name="basic"
      form={form}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Form.Item>
        <StyledInput
          type="email"
          id="email-field"
          placeholder={t('loginPage.loginPage_email')}
          {...register("email")}
        />
         {formState?.errors?.email && (<p>{t('loginPage.email_error')}</p>)}

      </Form.Item>
     
      <Form.Item>
        <StyledInput
          type="password"
          id="password-field"
          placeholder={t('loginPage.loginPage_password')}
          {...register("password")}
        />
        {formState?.errors?.password && (<p>{t('loginPage.password_error')}</p>)}

      </Form.Item>
      
      <Form.Item>
        <StylesButton size='large' type='primary' block htmlType="submit" >
          {t('loginPage.loginPage_name')}
        </StylesButton >
      </Form.Item>
      
      <Form.Item>
        <Button type='link' htmlType="button" onClick={goToSignup}>{t('loginPage.signUp')}</Button >
        <Button type='link' htmlType="button">{t('loginPage.forgot_password')}</Button >
      </Form.Item>
    </Form>
  );
}
