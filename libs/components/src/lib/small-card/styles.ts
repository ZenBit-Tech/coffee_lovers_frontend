import { Button } from 'antd';
import styled from 'styled-components';

export const StyledSmallCard = styled(Button)`
  margin-left: 20px;
  width: 120px;
  &:disabled,
  &:disabled:hover {
    background-color: white;
    color: black;
    cursor: auto;
  }
`;
