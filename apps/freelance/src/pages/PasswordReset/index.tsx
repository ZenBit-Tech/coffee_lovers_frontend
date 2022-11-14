import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { usePasswordResetMutation } from 'redux/services/user';

import {
  confirmName,
  errorMessages,
  passwordName,
  passwordValidationRegExp,
} from './constants';
import { StyledError, StyledSuccess, Wrapper } from './styles';

type Inputs = {
  password: string;
};

const PasswordReset = () => {
  const { t } = useTranslation();
  const { key } = useParams();
  const { handleSubmit, control } = useForm<Inputs>();
  const [passwordReset, { isLoading, isSuccess, isError, error }] =
    usePasswordResetMutation();

  const onSubmit: SubmitHandler<Inputs> = data => {
    passwordReset({ password: data.password, key: key || '' });
  };

  return (
    <Wrapper>
      <Form onFinish={handleSubmit(onSubmit)}>
        <h3>{t('resetPassword.title.newPassword')}</h3>
        <Controller
          name={passwordName}
          control={control}
          render={({ field }) => (
            <Form.Item
              rules={[
                {
                  required: true,
                  message: `${t('resetPassword.validation.noPassword')}`,
                },
                {
                  pattern: passwordValidationRegExp,
                  message: `${t('resetPassword.validation.passwordRegExp')}`,
                },
              ]}
              hasFeedback
              {...field}
            >
              <Input.Password
                placeholder={t('resetPassword.placeholder.password')}
              />
            </Form.Item>
          )}
        />
        <h3>{t('resetPassword.title.confirmPassword')}</h3>
        <Form.Item
          name={confirmName}
          dependencies={[passwordName]}
          rules={[
            {
              required: true,
              message: `${t('resetPassword.validation.noPasswordConfirm')}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(passwordName) === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error(t('resetPassword.validation.passwordNotMatch')),
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder={t('resetPassword.placeholder.password')}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('resetPassword.buttonText')}
          </Button>
          {isError && (
            <StyledError>
              {t(
                errorMessages.find(
                  obj =>
                    obj.error ===
                    JSON.parse(JSON.stringify(error))?.data?.message,
                )?.message || 'resetPassword.errors.unexpected',
              )}
            </StyledError>
          )}
          {isSuccess && (
            <StyledSuccess>
              {t('resetPassword.successResetMessage')}
            </StyledSuccess>
          )}
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default PasswordReset;
