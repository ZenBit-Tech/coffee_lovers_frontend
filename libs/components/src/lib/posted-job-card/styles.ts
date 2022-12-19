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

  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TitleDescriptionContainer = styled.div``;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTitle = styled.span`
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const Description = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.colors.grey};
`;

export const ButtonsContainer = styled.div`
  display: flex;

  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const AmountButton = styled(Button)`
  width: 140px;
`;
