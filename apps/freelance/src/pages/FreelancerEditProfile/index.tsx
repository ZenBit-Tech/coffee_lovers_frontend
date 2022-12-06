import { useTranslation } from 'react-i18next';
import {
  AppBar,
  AvatarUpload,
  FreelancerForm,
  mockEducationData,
} from '@freelance/components';
import { mockWorkHistoryData } from '@freelance/components';
import { useGetUserInfoQuery } from 'redux/services/user';

import * as St from './styles';

const FreelancerProfile = () => {
  const { t } = useTranslation();
  const { data: user, isLoading } = useGetUserInfoQuery();

  return (
    <St.Wrapper>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AppBar />
          <St.LogoWrapper direction="vertical">
            <AvatarUpload />
            <p>
              {user?.first_name} {user?.last_name}
            </p>
            <p>{user?.email}</p>
          </St.LogoWrapper>
          <FreelancerForm
            submitText={t('description.freelancerEditProfile.save')}
            user={user}
            work={mockWorkHistoryData}
            education={mockEducationData}
          />
        </>
      )}
    </St.Wrapper>
  );
};

export default FreelancerProfile;
