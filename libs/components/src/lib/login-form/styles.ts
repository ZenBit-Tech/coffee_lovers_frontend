import { Button } from 'antd';
import styled from 'styled-components';

export const StyledExampleButton = styled.button`
  color: black;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border-color: var(--grey);

  :hover,
  :focus {
    outline: none;
    border-color: var(--blue);
  }
`;

export const StylesButton = styled(Button)`
  border-radius: 5px;

  :hover {
    background-color: var(--blue);
  }
`;
