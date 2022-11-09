
import { LoginForm } from '@freelance/components';
import { Wrapper } from './styles';

import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  
  const { t } = useTranslation();

  return (
    <Wrapper>
      <h1>{t('loginPage.loginPage_name')}</h1>
      <LoginForm />
    </Wrapper>
  );
}
