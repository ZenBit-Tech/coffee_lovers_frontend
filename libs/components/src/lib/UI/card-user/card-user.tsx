import { baseTheme } from 'src/styles/theme';

import { StyledCard } from './styles';
import { Children } from './types';

export const StyledCardReusable = (props: Children) => {
  return <StyledCard theme={baseTheme}>{props.children}</StyledCard>;
};
