import { useTranslation } from 'react-i18next';
import {
  AvatarUpload,
  FreelancerForm,
  prBarStrColor,
  prBarTrailColor,
  profileQ1,
  ProgressBar,
  routes,
} from '@freelance/components';

import * as St from './styles';

const ProfileQuestions = () => {
  const { t } = useTranslation();

  return (
    <St.Wrapper>
      <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={profileQ1.prBarProfileQ1Per}
        strokeColor={prBarStrColor}
        trailColor={prBarTrailColor}
      />
      <St.StUserAvatarWrapper>
        <AvatarUpload />
      </St.StUserAvatarWrapper>
      <FreelancerForm
        submitText={t('description.profileQp1.finish')}
        navigation={routes.findJobs}
      />
    </St.Wrapper>
  );
};

export default ProfileQuestions;
