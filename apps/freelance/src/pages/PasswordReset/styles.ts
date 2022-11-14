import styled from 'styled-components';

import {
  errorColor,
  errorFontSize,
  successColor,
  successFontSize,
} from './constants';

export const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-width: 35rem;
`;

export const StyledSuccess = styled.span`
  color: ${successColor};
  font-size: ${successFontSize};
  margin-left: 10px;
`;

export const StyledError = styled.span`
  color: ${errorColor};
  font-size: ${errorFontSize};
  margin-left: 10px;
`;
