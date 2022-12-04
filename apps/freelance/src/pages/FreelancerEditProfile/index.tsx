import { useTranslation } from 'react-i18next';
import { AppBar, AvatarUpload, FreelancerForm } from '@freelance/components';
import { mockUserData } from '@freelance/components';

import * as St from './styles';
const FreelancerProfile = () => {
  const { t } = useTranslation();
  return (
    <St.Wrapper>
      <AppBar />
      <St.LogoWrapper direction="vertical">
        <AvatarUpload />
        <p>
          {mockUserData.first_name} {mockUserData.last_name}
        </p>
        <p>{mockUserData.email}</p>
      </St.LogoWrapper>
      <FreelancerForm
        submitText={t('description.freelancerEditProfile.save')}
        user={mockUserData}
      />
    </St.Wrapper>
  );
};

export default FreelancerProfile;
