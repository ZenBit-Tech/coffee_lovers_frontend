export const passwordName = 'password';
export const confirmName = 'confirm';
export const passwordValidationRegExp = new RegExp(
  /(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{5,}.*$/,
);
