import { Avatar } from '@freelance/components';
import { getFileUrl } from 'src/utils/api';

import {
  BarItem,
  BarItemsContainer,
  Container,
  UserContainer,
  UserName,
} from './styles';
import useNavigationBar from './useNavigationBar';

export const NavigationBar = () => {
  const { user, links } = useNavigationBar();

  return (
    <Container>
      <UserContainer>
        <Avatar src={getFileUrl(user?.profile_image)} />
        <UserName>{`${user?.first_name || ''} ${
          user?.last_name || ''
        }`}</UserName>
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
