import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ProgressBar } from '@freelance/components';
import {
  prBarProfileQ2Per,
  prBarStrColor,
  prBarTrailColor,
} from '@freelance/components';

import { Wrapper } from './styles';

const ProfileQuestions2 = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={prBarProfileQ2Per}
        strokeColor={prBarStrColor}
        trailColor={prBarTrailColor}
      />
      <Link to="/">{t('description.router.toProfileQuestions2')}</Link>
    </Wrapper>
  );
};

export default ProfileQuestions2;
