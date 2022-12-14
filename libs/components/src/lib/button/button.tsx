import { baseTheme } from 'src/styles/theme';

import { StyledButton } from './styles';

export interface ButtonProps {
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  radius?: string;
  width?: string;
  htmlType?: 'button' | 'submit' | 'reset';
}

export function Button({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  htmlType,
}: ButtonProps) {
  return (
    <StyledButton
      htmlType={htmlType}
      onClick={onClick}
      theme={baseTheme}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
    >
      {children}
    </StyledButton>
  );
}

export default Button;
