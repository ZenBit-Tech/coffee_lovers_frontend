import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AppBar, Button } from '@freelance/components';

export default function OwnerProfilePage() {
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar />
      <Link to="job-post">
        <Button>{t('job_post_page.post_a_job')}</Button>
      </Link>
      <Link to="/">{t('description.router.toRoot')}</Link>
    </Fragment>
  );
}
