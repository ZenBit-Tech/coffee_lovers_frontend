import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routes } from '@freelance/constants';

import { CardWrapper, NewButton, NewCard } from './styles';

export function ConditionsCard(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <CardWrapper>
      <NewCard hoverable title={t('conditions.title')}>
        <p>{t('conditions.text')}</p>
        <NewButton onClick={() => navigate(routes.signup)} type="primary">
          {t('conditions.accept_button')}
        </NewButton>
      </NewCard>
    </CardWrapper>
  );
}

export default ConditionsCard;
