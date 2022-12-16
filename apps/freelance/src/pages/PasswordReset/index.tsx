import { Button, Form } from 'antd';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledPasswordInput } from '@freelance/components';

import {
  confirmName,
  passwordName,
  passwordValidationRegExp,
} from './constants';
import { getErrorMessage } from './errors';
import { StyledError, StyledInfo, StyledSuccess, Wrapper } from './styles';
import usePasswordReset from './usePasswordReset';

const PasswordReset = () => {
  const { t } = useTranslation();
  const {
    isLinkValid,
    handleSubmit,
    onSubmit,
    control,
    isLoading,
    isSuccess,
    isError,
    error,
  } = usePasswordReset();

  return (
    <Wrapper>
      {isLinkValid === true && (
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
      )}
      {isLinkValid === false && (
        <StyledInfo>{t('resetPassword.errors.invalidKey')}</StyledInfo>
      )}
    </Wrapper>
  );
};

export default PasswordReset;
