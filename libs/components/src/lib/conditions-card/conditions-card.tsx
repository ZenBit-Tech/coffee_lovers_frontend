import 'antd/dist/antd.css';
import { CardWrapper, NewCard, NewButton } from './styles';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState, useMemo, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

export function ConditionsCard(): ReactElement {
  const navigate = useNavigate();
  const [dis, setDisabled] = useState(false);
  const card = React.useRef<HTMLDivElement>(null);
  const end = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const isInViewport2 = useIsInViewport();
  useEffect(() => {
    setDisabled(!isInViewport2);
  }, [isInViewport2]);

  function useIsInViewport() {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const observer = useMemo(
      () =>
        new IntersectionObserver(([entry]) =>
          setIsIntersecting(entry.isIntersecting)
        ),
      []
    );
    useEffect(() => {
      observer.observe(end.current as HTMLElement);

      return () => {
        observer.disconnect();
      };
    }, [observer]);

    return isIntersecting;
  }

  return (
    <CardWrapper>
      <NewCard ref={card} hoverable title={t('conditions.title')}>
        <p>
          {t('conditions.text')}
          <span ref={end}></span>
        </p>
      </NewCard>
      <NewButton
        onClick={() => navigate('/signup')}
        disabled={dis}
        type="primary"
      >
        {t('conditions.accept_button')}
      </NewButton>
    </CardWrapper>
  );
}

export default ConditionsCard;
