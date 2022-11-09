import styled from 'styled-components';
import { Button } from 'antd';
import { color } from 'libs/components/styles/styles';

export const StyledExampleButton = styled.button`
  color: black;
  cursor: pointer;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border-color: ${color.grey};

  :hover{
    border-color: ${color.blue};
  }

  :focus{
    outline: none;
    border-color: ${color.blue};
  }
`;

export const StylesButton = styled(Button)`
border-radius: 5px;

:hover{
  background-color: ${color.blue};
}
`;