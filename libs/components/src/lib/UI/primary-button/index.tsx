import { FC } from 'react';
import { ButtonProps } from 'antd';
import { baseTheme } from 'src/styles/theme';

import { StyledButton } from './styles';

export const PrimaryButton: FC<ButtonProps> = props => {
  return (
    <StyledButton theme={baseTheme} type="primary" {...props}>
      {props.children}
    </StyledButton>
  );
};
