import { SmallCardProps } from './model';
import { StyledSmallCard } from './styles';
export function SmallCard(props: SmallCardProps) {
  return <StyledSmallCard disabled>{props.text}</StyledSmallCard>;
}

export default SmallCard;
