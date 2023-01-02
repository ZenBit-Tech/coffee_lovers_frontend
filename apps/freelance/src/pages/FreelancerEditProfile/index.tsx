import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { baseUrl, freelancerProfile, profileQ1 } from '@freelance/components';
import { AvatarUpload, FreelancerForm } from '@freelance/components';
import {
  useGetUserEducationInfoQuery,
  useGetUserInfoQuery,
  useGetUserWorkInfoQuery,
} from 'redux/services/user';
import { baseTheme } from 'src/styles/theme';

import * as St from './styles';

const FreelancerProfile = () => {
  const { t } = useTranslation();
  const { data: user, isLoading: isLoadingUser } = useGetUserInfoQuery();
  const { data: work, isLoading: isLoadingWork } = useGetUserWorkInfoQuery();
  const { data: education, isLoading: isLoadingEdu } =
    useGetUserEducationInfoQuery();

  return (
    <St.Wrapper isLoading={isLoadingUser || isLoadingWork || isLoadingEdu}>
      <St.LogoWrapper theme={baseTheme} direction="vertical">
        {user?.profile_image ? (
          <Avatar
            src={`${baseUrl}/${user?.profile_image}`}
            size={profileQ1.avatarBigSize}
            icon={<UserOutlined />}
          />
        ) : (
          <AvatarUpload />
        )}
        <p data-testid={freelancerProfile.profileImage}>
          {user?.first_name} {user?.last_name}
        </p>
        <p data-testid={freelancerProfile.email}>{user?.email}</p>
      </St.LogoWrapper>
      <FreelancerForm
        submitText={t('description.freelancerEditProfile.save')}
        user={user}
        work={work}
        education={education}
      />
    </St.Wrapper>
  );
};

export default FreelancerProfile;
