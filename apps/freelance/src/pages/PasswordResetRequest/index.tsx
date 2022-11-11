import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';

import { emailName } from './constants';
import { StyledEmail, StyledInfo, Wrapper } from './styles';

type Inputs = {
  email: string;
};

const PasswordResetRequest = () => {
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const onSubmit: SubmitHandler<Inputs> = data => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmail(data.email);
    }, 1500);
  };

  return (
    <Wrapper>
      {!email && (
        <Form onFinish={handleSubmit(onSubmit)}>
          <h3>{t('resetPassword.title.passwordReset')}</h3>
          <Controller
            name={emailName}
            control={control}
            render={({ field }) => (
              <Form.Item
                rules={[
                  {
                    type: 'email',
                    message: `${t('resetPassword.validation.emailError')}`,
                  },
                  {
                    required: true,
                    message: `${t('resetPassword.validation.emailError')}`,
                  },
                ]}
                {...field}
              >
                <Input placeholder={t('resetPassword.placeholder.email')} />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              {t('resetPassword.buttonText')}
            </Button>
          </Form.Item>
        </Form>
      )}
      {email && (
        <>
          <StyledInfo>{t('resetPassword.sentText')}</StyledInfo>
          <StyledEmail>{email}</StyledEmail>
        </>
      )}
    </Wrapper>
  );
};

export default PasswordResetRequest;
