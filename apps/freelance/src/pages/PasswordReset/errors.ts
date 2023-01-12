import { SerializedError } from '@reduxjs/toolkit';
import { ApiError } from 'redux/types/error.types';

const errorMessages: { error: string; message: string }[] = [
  { error: 'Invalid key', message: 'resetPassword.errors.invalidKey' },
];

export const getErrorMessage = (error?: ApiError | SerializedError): string => {
  let errorMessage = '';
  if (error && 'data' in error) {
    const message = error.data.message || '';
    errorMessage =
      errorMessages.find(obj => obj.error === message)?.message || '';
  }

  return errorMessage ? errorMessage : 'resetPassword.errors.unexpected';
};
