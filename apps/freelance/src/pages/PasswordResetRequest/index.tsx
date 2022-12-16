import { Button, Form } from 'antd';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyledInput } from '@freelance/components';
import { getErrorMessage } from '@pages/PasswordReset/errors';

import { emailName } from './constants';
import { StyledEmail, StyledError, StyledInfo, Wrapper } from './styles';
import usePasswordResetRequest from './userPasswordResetRequest';

const PasswordResetRequest = () => {
  const { t } = useTranslation();
  const {
    handleSubmit,
    onSubmit,
    control,
    email,
    isLoading,
    isError,
    error,
    isSuccess,
  } = usePasswordResetRequest();

  return (
    <Wrapper>
      {!isSuccess && (
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
                <StyledInput
                  placeholder={t('resetPassword.placeholder.email')}
                />
              </Form.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {t('resetPassword.buttonText')}
            </Button>
            {isError && <StyledError>{t(getErrorMessage(error))}</StyledError>}
          </Form.Item>
        </Form>
      )}
      {isSuccess && (
        <>
          <StyledInfo>{t('resetPassword.sentText')}</StyledInfo>
          <StyledEmail>{email}</StyledEmail>
        </>
      )}
    </Wrapper>
  );
};

export default PasswordResetRequest;
