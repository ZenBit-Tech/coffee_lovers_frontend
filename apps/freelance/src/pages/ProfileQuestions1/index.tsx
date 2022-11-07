import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();


  return (
    <>
      <div>20% completed</div>
      <Link to='/profile-questions-2'>{t('toProfileQuestions2')}</Link>
    </>
  )
}

export default ProfileQuestions1