import { AvatarUpload, roles } from '@freelance/components';
import { getFileUrl } from 'src/utils/api';

import { avatarSize } from './constants';
import {
  BarItem,
  BarItemsContainer,
  Container,
  UserContainer,
  UserName,
  UsernameContainer,
  UserRole,
} from './styles';
import useNavigationBar from './useNavigationBar';
import useNotifications from './useNotifications';

export const NavigationBar = () => {
  const { user, links, t } = useNavigationBar();
  const { contextHolder } = useNotifications();

  return (
    <Container>
      {contextHolder}
      <UserContainer>
        <AvatarUpload
          src={getFileUrl(user?.profile_image)}
          hideUploadText={true}
          size={avatarSize}
        />
        <UsernameContainer>
          <UserName>{`${user?.first_name || ''} ${
            user?.last_name || ''
          }`}</UserName>
          <UserRole>
            {user?.role === roles.freelancer && t('app_bar.roles.freelancer')}
            {user?.role === roles.jobOwner && t('app_bar.roles.jobOwner')}
            {(user?.role === roles.visitor || !user?.role) &&
              t('app_bar.roles.visitor')}
          </UserRole>
        </UsernameContainer>
      </UserContainer>
      <BarItemsContainer>
        {links.map(link => (
          <BarItem key={link.text} onClick={link.action}>
            {link.text}
          </BarItem>
        ))}
      </BarItemsContainer>
    </Container>
  );
};
