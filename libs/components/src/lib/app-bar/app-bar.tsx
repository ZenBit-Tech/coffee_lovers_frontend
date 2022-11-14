import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';

import { StyledAppBar } from './styles';

/* eslint-disable-next-line */
export interface AppBarProps {}

export function AppBar(props: AppBarProps) {
  return (
    <StyledAppBar>
      <Logo />
      <Navigation />
    </StyledAppBar>
  );
}

export default AppBar;
