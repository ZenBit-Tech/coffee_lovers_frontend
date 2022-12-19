import { Button } from 'antd';
import styled from 'styled-components';

export const StyledButton = styled(Button)`
  border-color: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.danger};
`;
