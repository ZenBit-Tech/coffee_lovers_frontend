import styled from 'styled-components';
import { Button } from 'antd';


export const StyledExampleButton = styled.button`
  color: black;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border-color: grey;

  :hover{
    border-color: #3944BC;
  }

  :focus{
    outline: none;
    border-color: #3944BC;
  }
`;

export const StylesButton = styled(Button)`
border-radius: 5px;

:hover{
  background-color: #3944BC;
}
`;