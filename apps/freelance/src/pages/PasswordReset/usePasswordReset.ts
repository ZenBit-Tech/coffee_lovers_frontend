import { useEffect, useState } from 'react';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { SerializedError } from '@reduxjs/toolkit';
import {
  usePasswordResetCheckAvailabilityQuery,
  usePasswordResetMutation,
} from 'redux/services/user';
import { UserError } from 'redux/types/user.types';

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
  error?: UserError | SerializedError;
  isLinkValid?: boolean;
}

const usePasswordReset = (): UsePasswordResetResponse => {
  const [isLinkValid, setIsLinkValid] = useState<boolean | undefined>();
  const { key } = useParams();
  const { handleSubmit, control } = useForm<Inputs>();
  const { data: linkValid } = usePasswordResetCheckAvailabilityQuery(key || '');
  const [passwordReset, { isLoading, isSuccess, isError, error }] =
    usePasswordResetMutation();

  useEffect(() => {
    setIsLinkValid(linkValid);
  }, [linkValid]);

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
