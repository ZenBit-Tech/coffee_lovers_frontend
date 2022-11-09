
import { SignUpForm } from '@freelance/components';
import { Wrapper} from './styles';
import { Button } from 'antd';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login')
  }
  return (
    <Wrapper>
      <h1>{t('loginPage.signUp')}</h1>
      <SignUpForm />
       <Button type='link' htmlType="button" onClick={goToLogin}>{t('loginPage.have_account')}</Button >
    </Wrapper>
  );
}
