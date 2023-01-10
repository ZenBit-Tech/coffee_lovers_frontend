import { useEffect, useState } from 'react';
import { message } from 'antd';
import { t } from 'i18next';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '@freelance/constants';
import { SerializedError } from '@reduxjs/toolkit';
import {
  usePasswordResetCheckAvailabilityQuery,
  usePasswordResetMutation,
} from 'redux/services/userApi';
import { ApiError } from 'redux/types/error.types';

type Inputs = {
  password: string;
};

interface UsePasswordResetResponse {
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: (data: Inputs) => SubmitHandler<Inputs>;
  control: Control<Inputs>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: ApiError | SerializedError;
  isLinkValid?: boolean;
}

const usePasswordReset = (): UsePasswordResetResponse => {
  const [isLinkValid, setIsLinkValid] = useState<boolean | undefined>();
  const { key } = useParams();
  const { handleSubmit, control } = useForm<Inputs>();
  const { data: linkValid } = usePasswordResetCheckAvailabilityQuery(key || '');
  const [passwordReset, { isLoading, isSuccess, isError, error }] =
    usePasswordResetMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLinkValid(linkValid);
  }, [linkValid]);

  useEffect(() => {
    if (isSuccess) {
      message.success(t('resetPassword.successResetMessage'));
      navigate(routes.login);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<Inputs> = data => {
    passwordReset({ password: data.password, key: key || '' });
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    isLoading,
    isSuccess,
    isError,
    error,
    isLinkValid,
  };
};

export default usePasswordReset;
