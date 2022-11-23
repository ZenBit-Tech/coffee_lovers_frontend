import { Button, Space } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  height: ${({ theme }) => theme.sizes.button.height};
  min-width: ${({ theme }) => theme.sizes.button.width};
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.fontSize.normal};
  outline: 0;
  border: none;
  border-radius: 8px;

  color: white;
  box-shadow: 0px 3px 5px -3px rgba(66, 75, 178, 0.36);
  background-color: ${({ theme }) => theme.colors.button.bg};

  transition: var(--animation-cubic-bezier);

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }
`;

export const ButtonsWrapper = styled(Space)`
  display: flex;
  justify-content: end;
  margin-bottom: 50px;
`;
