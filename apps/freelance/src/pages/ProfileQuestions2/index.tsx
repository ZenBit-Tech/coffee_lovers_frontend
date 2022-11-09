import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ProgressBar } from '@freelance/components';
import { prBarProfileQ2Per } from '@freelance/components';
import { Wrapper } from './styles';

const ProfileQuestions2 = () => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <div>{t('description.profile p2 completion per')}</div>
      <ProgressBar
        percent={prBarProfileQ2Per}
        strokeColor={'#021691'}
        trailColor={'#B0C4DE'}
      />
      <Link to="/">{t('description.router.toProfileQuestions2')}</Link>
    </Wrapper>
  );
};

export default ProfileQuestions2;
