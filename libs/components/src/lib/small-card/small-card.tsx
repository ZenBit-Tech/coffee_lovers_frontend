import { ReactElement } from 'react';

import { SmallCardProps } from './model';
import { StyledSmallCard } from './styles';

export function SmallCard(props: SmallCardProps): ReactElement {
  return <StyledSmallCard disabled>{props.text}</StyledSmallCard>;
}

export default SmallCard;
