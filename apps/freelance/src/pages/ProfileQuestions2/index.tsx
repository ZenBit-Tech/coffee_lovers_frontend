import { useTranslation } from 'react-i18next';
import { Wrapper } from './styles';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@freelance/components';

const ProfileQuestions2 = () => {
  const { t } = useTranslation();
  const progressBarPer = 50;
  return (
    <Wrapper>
      <div>{t('description.profile p2 completion per')}</div>
      <ProgressBar percent={progressBarPer} strokeColor={'#021691'} trailColor={'#B0C4DE'}/>
      <Link to='/'>{t('description.router.toProfileQuestions2')}</Link>
    </Wrapper>
  )
}

export default ProfileQuestions2