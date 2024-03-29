import { useState } from 'react';
import {
  Control,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { SerializedError } from '@reduxjs/toolkit';
import { usePasswordResetRequestMutation } from 'redux/services/userApi';
import { ApiError } from 'redux/types/error.types';

type Inputs = {
  email: string;
};

interface UsePasswordResetRequestResponse {
  handleSubmit: UseFormHandleSubmit<Inputs>;
  onSubmit: (data: Inputs) => SubmitHandler<Inputs>;
  control: Control<Inputs>;
  email: string;
  isLoading: boolean;
  isError: boolean;
  error?: ApiError | SerializedError;
  isSuccess: boolean;
}

const usePasswordResetRequest = (): UsePasswordResetRequestResponse => {
  const { handleSubmit, control } = useForm<Inputs>();
  const [email, setEmail] = useState<string>('');
  const [passwordResetRequest, { isLoading, isSuccess, isError, error }] =
    usePasswordResetRequestMutation();

  const onSubmit: SubmitHandler<Inputs> = data => {
    setEmail(data.email);
    passwordResetRequest(data.email);
  };

  return {
    handleSubmit,
    onSubmit,
    control,
    email,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};

export default usePasswordResetRequest;
