import { Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { StyledButton, Text, Title, Wrapper } from './styles';

export default function ExampleRootPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Space direction="vertical" size="middle">
        <Title>{t('loginPage.welcome')}</Title>
        <Text>{t('loginPage.title')}</Text>
        <StyledButton size="large" block onClick={() => navigate('/login')}>
          {t('loginPage.loginPage_name')}
        </StyledButton>
      </Space>
    </Wrapper>
  );
}
