import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes, SignUpForm } from '@freelance/components';

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
          onClick={() => navigate(`${routes.login}`)}
        >
          {t('loginPage.have_account')}
        </Button>
      </ButtonWrap>
    </Wrapper>
  );
}
