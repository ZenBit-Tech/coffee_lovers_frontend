import { ReactElement } from 'react';
import { Button, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  authTestId,
  GoogleLoginButton,
  routes,
  SignUpForm,
} from '@freelance/components';
import { baseTheme } from 'src/styles/theme';

import { ButtonWrap, Wrapper } from './styles';

const SignupPage = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Row justify="space-around">
        <Col span={12}>
          <SignUpForm />
          <ButtonWrap theme={baseTheme}>
            <Button
              data-testid={authTestId.toLogin}
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
};

export default SignupPage;
