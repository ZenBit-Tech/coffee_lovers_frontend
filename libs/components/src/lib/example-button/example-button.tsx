import styled from 'styled-components';

export interface ExampleButtonProps {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  radius: string;
  width: string;
}

const StyledExampleButton = styled.button`
  color: black;
`;
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
