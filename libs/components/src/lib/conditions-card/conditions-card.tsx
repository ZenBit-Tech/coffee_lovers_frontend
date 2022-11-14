import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { CardWrapper, NewButton, NewCard } from './styles';

import 'antd/dist/antd.css';

export function ConditionsCard(): ReactElement {
  const navigate = useNavigate();
  const [dis, setDisabled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setDisabled(true);
  }, []);

  function handleScroll(element: HTMLElement) {
    if (element.scrollTop + element.clientHeight === element.scrollHeight) {
      setDisabled(false);
    }
  }

  return (
    <CardWrapper>
      <NewCard
        onScroll={e => handleScroll(e.target as HTMLElement)}
        hoverable
        title={t('conditions.title')}
      >
        <p>{t('conditions.text')}</p>
      </NewCard>
      <NewButton
        onClick={() => navigate('/login')}
        disabled={dis}
        type="primary"
      >
        {t('conditions.accept_button')}
      </NewButton>
    </CardWrapper>
  );
}

export default ConditionsCard;
