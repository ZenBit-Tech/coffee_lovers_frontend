import { useTranslation } from 'react-i18next';
import { AvatarUpload, FreelancerForm, routes } from '@freelance/components';

import * as St from './styles';

const ProfileQuestions = () => {
  const { t } = useTranslation();

  return (
    <St.Wrapper>
      <St.StUserAvatarWrapper>
        <AvatarUpload />
      </St.StUserAvatarWrapper>
      <FreelancerForm
        submitText={t('description.profileQp1.finish')}
        navigation={routes.jobs}
      />
    </St.Wrapper>
  );
};

export default ProfileQuestions;
