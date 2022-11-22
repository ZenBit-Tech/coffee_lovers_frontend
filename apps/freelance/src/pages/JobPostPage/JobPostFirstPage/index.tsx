import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, JobPostFormFirstPage } from '@freelance/components';

export function JobPostFirstPage() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar />
      <JobPostFormFirstPage />
      <Link to="/">{t('description.router.toRoot')}</Link>
    </Fragment>
  );
}
