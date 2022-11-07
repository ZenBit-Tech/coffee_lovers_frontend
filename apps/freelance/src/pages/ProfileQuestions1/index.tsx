import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@freelance/components';
import { Wrapper } from './styles';

const ProfileQuestions1 = () => {
  const { t } = useTranslation();


  return (
    <Wrapper>
      <div>{t('description.profile p1 completion per')}</div>
      <ProgressBar percent={20} strokeColor={'#021691'} trailColor={'#B0C4DE'}/>
      <Link to='/profile-questions-2'>{t('router.toProfileQuestions2')}</Link>
    </Wrapper>
  )
}

export default ProfileQuestions1