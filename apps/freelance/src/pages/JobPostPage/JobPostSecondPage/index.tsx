import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, JobPostFormSecondPage } from '@freelance/components';

export function JobPostSecondPage() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar />
      <JobPostFormSecondPage />
      <Link to="/">{t('description.router.toRoot')}</Link>
    </Fragment>
  );
}
