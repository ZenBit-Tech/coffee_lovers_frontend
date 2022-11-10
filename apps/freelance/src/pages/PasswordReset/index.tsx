import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { confirmName, passwordName } from './constants';
import { Wrapper } from './styles';

type Inputs = {
  password: string
};

const PasswordReset = () => {
  const { t } = useTranslation();
  const { key } = useParams();
  const { handleSubmit, control } = useForm<Inputs>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`${key}, ${data.password}`);
    }, 1500);
  } 

  return (
    <Wrapper>
      <Form onFinish={ handleSubmit(onSubmit) }>
        <h3>{t('resetPassword.title.newPassword')}</h3>
        <Controller 
          name={passwordName}
          control={control}
          render={({ field }) =>
          <Form.Item
            rules={[
              {
                required: true,
                message: `${t('resetPassword.validation.noPassword')}`
              },
              {
                pattern: new RegExp(/(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{5,}.*$/),
                message: `${t('resetPassword.validation.passwordRegExp')}`
              },
            ]}
            hasFeedback
            {...field}
          >
            <Input.Password placeholder={t('resetPassword.placeholder.password')} />
          </Form.Item>}
        />
        <h3>{t('resetPassword.title.confirmPassword')}</h3>
        <Form.Item
          name={confirmName}
          dependencies={[passwordName]}
          rules={[
            {
              required: true,
              message: `${t('resetPassword.validation.noPasswordConfirm')}`
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(passwordName) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('resetPassword.validation.passwordNotMatch')));
              }
            })
          ]}
          hasFeedback
        >
          <Input.Password placeholder={t('resetPassword.placeholder.password')} />
        </Form.Item>
        <Form.Item>
          <Button 
            type='primary'
            htmlType='submit'
            loading={loading}
          >
            {t('resetPassword.buttonText')}
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default PasswordReset;
