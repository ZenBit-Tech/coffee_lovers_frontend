
import { LoginForm } from '@freelance/components';
import { Wrapper} from './styles';

import { useTranslation } from 'react-i18next';

export default function LoginPagePage() {
  const { t } = useTranslation();
 


  return (
    <Wrapper>
      <h1>{t('loginPage.signUp')}</h1>
      <LoginForm />
    </Wrapper>
  );
}
