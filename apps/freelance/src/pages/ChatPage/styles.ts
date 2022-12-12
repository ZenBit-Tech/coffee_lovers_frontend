import { Col } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 50px;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const StyledLeftSide = styled(Col)`
  padding: 20px;
  background-color: var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 5px;
  width: 300px;
`;

export const StyledRightSide = styled(Col)`
  padding: 20px 10px 20px 10px;
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 10px;
  width: 300px;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  width: 95%;
  position: absolute;
  bottom: 10px;
`;
