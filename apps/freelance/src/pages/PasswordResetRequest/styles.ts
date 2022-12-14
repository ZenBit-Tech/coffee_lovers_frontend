import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

import { errorFontSize, infoFontSize } from './constants';

export const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 35rem;
`;

export const StyledInfo = styled.p`
  font-size: ${infoFontSize};
`;

export const StyledEmail = styled.p`
  align-self: center;
  font-size: ${infoFontSize};
`;

export const StyledError = styled.span`
  color: ${baseTheme.colors.danger};
  font-size: ${errorFontSize};
  margin-left: 10px;
`;
