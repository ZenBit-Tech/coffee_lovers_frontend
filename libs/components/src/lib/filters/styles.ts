import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

import { itemFontSize } from './constants';

interface WrapperProps {
  visibility: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  display: ${props => (props.visibility ? 'flex' : 'none')};
  position: absolute;
  flex-direction: column;
  border: 1px ${({ theme }) => theme.colors.lightGrey} solid;
  border-radius: 3px;
  width: 300px;
  height: 415px;
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
