import { StyledExampleButton } from './styles';

export interface ExampleButtonProps {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  /* eslint-disable-next-line */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  radius: string;
  width: string;
}

export function ExampleButton({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
}: ExampleButtonProps) {
  return (
    <StyledExampleButton
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
    </StyledExampleButton>
  );
}

export default ExampleButton;
