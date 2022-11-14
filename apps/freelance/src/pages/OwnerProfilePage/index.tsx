import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar } from '@freelance/components';

export default function OwnerProfilePage() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar />
      <Link to="/">{t('description.router.toRoot')}</Link>
    </Fragment>
  );
}
