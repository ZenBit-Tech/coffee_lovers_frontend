export const passwordName = 'password';
export const confirmName = 'confirm';
export const successFontSize = '0.9rem';
export const successColor = '#28672d';
export const errorFontSize = '0.9rem';
export const errorColor = '#c93636';
export const passwordValidationRegExp = new RegExp(
  /(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{5,}.*$/,
);
export const errorMessages: { error: string; message: string }[] = [
  { error: 'User not found', message: 'resetPassword.errors.invalidKey' },
];
