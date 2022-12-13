import { Col, Form } from 'antd';
import styled from 'styled-components';
import { PrimaryButton } from '@freelance/components';

import { colors } from './constants';

export const MessagesWrapper = styled.div`
  height: 65vh;
  overflow: auto;
  padding: 10px;
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
  height: 80vh;
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

export const StyledFormItem = styled(Form.Item)`
  width: 85%;
`;

export const StyledButton = styled(PrimaryButton)`
  height: 45px;
  width: 100px;
`;

export const FirstUserText = styled.p`
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 10px;
  background-color: ${colors.lightGrey};
  padding: 10px;
`;

export const FirstUserContainer = styled.div`
  text-align: left;
  width: 75%;
  margin-bottom: 10px;
`;

export const SecondUserText = styled.p`
  background-color: ${colors.lightBlue};
  padding: 10px;
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 10px;
`;

export const SecondUserContainer = styled.div`
  margin: 0 0 10px auto;
  text-align: right;
  width: 75%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
