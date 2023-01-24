import { BellOutlined } from '@ant-design/icons';
import { AvatarUpload, NotificationsBar, roles } from '@freelance/components';
import { getFileUrl } from 'src/utils/api';

import { avatarSize } from './constants';
import {
  BarItem,
  BarItemsContainer,
  Container,
  NotificationBellContainer,
  StyledBadge,
  UserContainer,
  UserName,
  UsernameContainer,
  UserRole,
} from './styles';
import useNavigationBar from './useNavigationBar';
import useNotifications from './useNotifications';

export const NavigationBar = () => {
  const { user, links, t } = useNavigationBar();
  const { notifications, contextHolder, isOpen, clickHandler } =
    useNotifications();

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
        <NotificationBellContainer onClick={clickHandler}>
          <StyledBadge count={notifications.length}>
            <BellOutlined />
          </StyledBadge>
          {isOpen && (
            <NotificationsBar
              notifications={notifications}
              closeHandler={clickHandler}
            />
          )}
        </NotificationBellContainer>
      </BarItemsContainer>
    </Container>
  );
};
