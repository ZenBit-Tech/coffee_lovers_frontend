import { Button, Form } from 'antd';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { StyledPasswordInput } from '@freelance/components';
import { usePasswordResetMutation } from 'redux/services/user';

import {
  confirmName,
  passwordName,
  passwordValidationRegExp,
} from './constants';
import { getErrorMessage } from './errors';
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
              <StyledPasswordInput
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
          <StyledPasswordInput
            placeholder={t('resetPassword.placeholder.password')}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {t('resetPassword.buttonText')}
          </Button>
          {isError && <StyledError>{t(getErrorMessage(error))}</StyledError>}
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
