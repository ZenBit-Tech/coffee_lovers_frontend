import { FC } from 'react';
import { ButtonProps } from 'antd';

import { StyledButton } from './styles';

export const SecondaryButton: FC<ButtonProps> = props => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
