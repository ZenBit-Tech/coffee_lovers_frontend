import { FC } from 'react';
import { ButtonProps } from 'antd';

import { StyledButton } from './styles';

export const PrimaryButton: FC<ButtonProps> = props => {
  return (
    <StyledButton type="primary" {...props}>
      {props.children}
    </StyledButton>
  );
};
