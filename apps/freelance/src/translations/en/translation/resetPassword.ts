export default {
  resetPassword: {
    title: {
      passwordReset: 'Password reset',
      newPassword: 'Enter new password',
      confirmPassword: 'Confirm password',
    },
    placeholder: {
      email: 'Email',
      password: 'Password',
    },
    validation: {
      emailError: 'Please enter a valid Email',
      noPassword: 'Please input your password!',
      noPasswordConfirm: 'Please confirm your password!',
      passwordNotMatch: 'Password do not match',
      passwordRegExp:
        'password must contain more than 4 symbols, uppercase (A-Z) and lowercase (a-z) letters',
    },
    buttonText: 'Continue',
    sentText:
      'Instructions for changing the password have been sent to the mail',
    errors: {
      userNotFound: 'User with this email not found',
      invalidKey: 'Invalid reset password link',
      unexpected: 'Unexpected error. Please try again later',
    },
    successResetMessage: 'Password has been changed',
  },
};
