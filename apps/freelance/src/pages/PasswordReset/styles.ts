import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

import { errorFontSize, successFontSize } from './constants';

export const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 35rem;
`;

export const StyledSuccess = styled.span`
  color: ${baseTheme.colors.success};
  font-size: ${successFontSize};
  margin-left: 10px;
`;

export const StyledError = styled.span`
  color: ${baseTheme.colors.danger};
  font-size: ${errorFontSize};
  margin-left: 10px;
`;

export const StyledInfo = styled.p`
  font-size: ${({ theme }) => theme.fontSize.large};
`;
