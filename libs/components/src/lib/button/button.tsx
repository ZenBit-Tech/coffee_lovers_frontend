import { StyledButton } from './styles';

export interface ButtonProps {
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  radius?: string;
  width?: string;
}

export function Button({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
}: ButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
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
