import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, JobPostForm } from '@freelance/components';

export default function JobPostPage() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar />
      <JobPostForm />
      <Link to="/">{t('description.router.toRoot')}</Link>
    </Fragment>
  );
}
