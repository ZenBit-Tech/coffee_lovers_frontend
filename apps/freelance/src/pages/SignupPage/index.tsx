import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '@freelance/components';
import { Button } from 'antd';

import { Wrapper } from './styles';

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Wrapper>
      <SignUpForm />
      <Button type="link" htmlType="button" onClick={goToLogin}>
        {t('loginPage.have_account')}
      </Button>
    </Wrapper>
  );
}
