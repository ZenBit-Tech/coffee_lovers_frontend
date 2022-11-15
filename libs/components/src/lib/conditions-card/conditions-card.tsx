import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CardWrapper, NewButton, NewCard } from './styles';

import 'antd/dist/antd.css';

export function ConditionsCard(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <CardWrapper>
      <NewCard hoverable title={t('conditions.title')}>
        <p>{t('conditions.text')}</p>
        <NewButton onClick={() => navigate('/login')} type="primary">
          {t('conditions.accept_button')}
        </NewButton>
      </NewCard>
    </CardWrapper>
  );
}

export default ConditionsCard;
