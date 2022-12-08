import { Form, InputNumber } from 'antd';
import styled from 'styled-components';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';

import { itemFontSize } from './constants';

interface WrapperProps {
  visibility: boolean;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const Wrapper = styled.div<WrapperProps>`
  display: ${props => (props.visibility ? 'flex' : 'none')};
  position: absolute;
  top: ${props => (props.top ? props.top : 'none')};
  left: ${props => (props.left ? props.left : 'none')};
  right: ${props => (props.right ? props.right : 'none')};
  bottom: ${props => (props.bottom ? props.bottom : 'none')};
  flex-direction: column;
  border: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  border-radius: 3px;
  width: 300px;
  height: 415px;
  padding-top: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => theme.order.modal};
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-height: 380px;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;

export const ItemContainer = styled.div`
  margin-top: 15px;

  & > div {
    width: 100%;
  }
`;

export const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div:last-child {
    width: 60%;
  }
`;

export const StyledTitle = styled.p`
  text-align: center;
`;

export const StyledFilterTitle = styled.p`
  font-size: ${itemFontSize};
`;

export const StyledClose = styled(CloseOutlined)`
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
`;

export const HourlyRateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const StyledFormItem = styled(Form.Item)`
  margin-bottom: 0px;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`;

export const StyledMinusOutlined = styled(MinusOutlined)`
  margin: 0 20px;
`;
