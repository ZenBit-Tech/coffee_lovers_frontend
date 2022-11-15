import Logo from '../logo';
import Navigation from '../navigation';

import { StyledAppBar } from './styles';

export function AppBar() {
  return (
    <StyledAppBar>
      <Logo />
      <Navigation />
    </StyledAppBar>
  );
}

export default AppBar;
