import { Col, Form } from 'antd';
import styled from 'styled-components';
import { PrimaryButton } from '@freelance/components';

import { colors } from './constants';

export const MessagesWrapper = styled.div`
  height: 65vh;
  overflow: auto;
  padding: 10px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--blue);
    border-radius: 50px;
    box-shadow: 2px 2px 2px var(--grey);
  }
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

export const StyledRightSide = styled(StyledLeftSide)`
  height: 80vh;
  background-color: var(--white-color);
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
`;

export const BottomWrapper = styled(HeaderContainer)`
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
  background-color: ${colors.lightGrey};
  box-shadow: 2px 2px 2px var(--grey);
  border-radius: 10px;
  padding: 10px;
`;

export const SecondUserText = styled(FirstUserText)`
  background-color: ${colors.lightBlue};
`;

export const FirstUserContainer = styled.div`
  text-align: left;
  width: 75%;
  margin: 0 0 10px 0;
`;

export const SecondUserContainer = styled(FirstUserContainer)`
  margin: 0 0 10px auto;
  text-align: right;
`;
