import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { SomeElement } from '@freelance/components';

import { Title, Wrapper } from './styles';

export default function OwnerProfilePage() {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Title>{t('description.router.owner.title')}</Title>
      <SomeElement />
      <Link to="/">{t('router.toRoot')}</Link>
    </Wrapper>
  );
}
