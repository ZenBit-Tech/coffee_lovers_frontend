import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from '@freelance/components';
import { Button } from 'antd';

import { ButtonWrap, Wrapper } from './styles';

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <SignUpForm />
      <ButtonWrap>
        <Button
          type="link"
          htmlType="button"
          onClick={() => navigate('/login')}
        >
          {t('loginPage.have_account')}
        </Button>
      </ButtonWrap>
    </Wrapper>
  );
}
