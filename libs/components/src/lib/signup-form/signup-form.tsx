import * as React from 'react';
import * as yup from 'yup';
import { Form, Col, Row } from 'antd';
import "antd/dist/antd.css";
import { useTranslation } from 'react-i18next';
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { StyledInput, StylesButton } from '../login-form/styles';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const schema: yup.SchemaOf<Partial<FormValues>> = yup.object({
  email: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
});

export function SignUpForm() {

  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    form.resetFields();
    alert(JSON.stringify(data));
  }
    
  return (
    <Form
      name="basic"
      form={form}
      wrapperCol={{ span: 8 }}
      onFinish={handleSubmit(onSubmit)}
    >
      <Row gutter={[16, 32]}>
        <Col span={12} >
          <StyledInput
            type="email"
            id="email-field"
            placeholder={t('loginPage.loginPage_email')}
            {...register("email")}
          />
          {formState?.errors?.email && (<p>{t('loginPage.email_error')}</p>)}
        </Col>

        <Col className="gutter-row" offset={12} pull={12} span={6}>
          <StyledInput
            type="firstName"
            id="firstName-field"
            placeholder={t('loginPage.first_name')}
            {...register("firstName")}
          />
          {formState?.errors?.firstName && (<p>{t('loginPage.email_error')}</p>)}
        </Col>
        
        <Col className="gutter-row" pull={12}  span={6}>
          <StyledInput
            type="lastName"
            id="lastName-field"
            placeholder={t('loginPage.last_name')}
            {...register("lastName")}
        />
         {formState?.errors?.lastName && (<p>{t('loginPage.email_error')}</p>)}
        </Col> 

        <Col offset={12} pull={12} span={6}>
          <StyledInput
            type="password"
            id="password-field"
            placeholder={t('loginPage.loginPage_password')}
            {...register("password")}
          />
          {formState?.errors?.password && (<p>{t('loginPage.password_error')}</p>)}
        </Col>

        <Col pull={12} span={6}>
          <StyledInput
            type="password"
            id="confirmPassword-field"
            placeholder={t('loginPage.confirm_password')}
          />
        </Col>

        <Col span={12} >
          <StylesButton size='large' type='primary' block htmlType="submit" >
            {t('loginPage.signUp')}
          </StylesButton >
        </Col>
        
      </Row> 
    </Form>
  );
}