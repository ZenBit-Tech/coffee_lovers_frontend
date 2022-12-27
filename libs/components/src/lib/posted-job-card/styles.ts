import { Button } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px ${({ theme }) => theme.card.borderColor} solid;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  width: 100%;
  display: flex;
  padding: 5px 10px;
  justify-content: space-between;
  align-items: center;
`;

export const TitleDescriptionContainer = styled.div``;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTitle = styled.span`
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fontSize.large};

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Description = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.grey};
  font-size: ${({ theme }) => theme.fontSize.normal};
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-left: 15px;
`;

export const AmountButton = styled(Button)`
  width: 140px;
`;

export const StyledAction = styled.span`
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  position: relative;
  padding: 0 15px;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.lightBlue};
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 1px;
    height: 25px;
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:last-child::after {
    display: none;
  }
`;

export const StatusContainer = styled.div`
  width: 100px;
`;
