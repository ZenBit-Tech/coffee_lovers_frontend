import { baseTheme } from 'src/styles/theme';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem;
`;

export const UploadField = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: ${baseTheme.colors.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    border: 1px ${baseTheme.colors.primary} dashed;
  }
`;
