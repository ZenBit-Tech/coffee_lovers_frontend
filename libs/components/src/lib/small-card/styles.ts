import { Button } from 'antd';
import styled from 'styled-components';

export const StyledSmallCard = styled(Button)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 20px;
  width: auto;
  &:disabled,
  &:disabled:hover {
    background-color: white;
    color: black;
    cursor: auto;
  }
`;
