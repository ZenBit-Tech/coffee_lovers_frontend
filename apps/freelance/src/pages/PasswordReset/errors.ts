import { SerializedError } from '@reduxjs/toolkit';
import { UserError } from 'redux/types/user.types';

const errorMessages: { error: string; message: string }[] = [
  { error: 'Invalid key', message: 'resetPassword.errors.invalidKey' },
];

export const getErrorMessage = (
  error?: UserError | SerializedError,
): string => {
  let errorMessage = '';
  if (error && 'data' in error) {
    const message = error.data.message || '';
    errorMessage =
      errorMessages.find(obj => obj.error === message)?.message || '';
  }

  return errorMessage ? errorMessage : 'resetPassword.errors.unexpected';
};
