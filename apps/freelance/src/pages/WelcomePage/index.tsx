import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CardWrapper } from '@freelance/components';

import { CenterCard } from './styles';
import { H2 } from './styles';

import 'antd/dist/antd.css';

const WelcomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="site-card-border-less-wrapper">
      <CardWrapper>
        <CenterCard hoverable>
          <H2>{t('welcomePage.welcome')}</H2>
          <H2>{t('welcomePage.fill')}</H2>
          <Button onClick={() => navigate('/freelancer')} type="primary">
            {t('welcomePage.button')}
          </Button>
        </CenterCard>
      </CardWrapper>
    </div>
  );
};

export default WelcomePage;
