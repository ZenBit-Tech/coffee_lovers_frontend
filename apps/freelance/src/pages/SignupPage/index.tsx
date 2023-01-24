import { Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GoogleLoginButton, routes, SignUpForm } from '@freelance/components';

import { ButtonWrap, Wrapper } from './styles';

export default function SignupPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Row justify="space-around">
        <Col span={12}>
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
        </Col>
        <Col span={6}>
          <GoogleLoginButton> {t('loginPage.googlesignup')}</GoogleLoginButton>
        </Col>
      </Row>
    </Wrapper>
  );
}
