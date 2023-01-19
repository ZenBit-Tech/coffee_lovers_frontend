import { Button } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px ${({ theme }) => theme.colors.primary} solid;
  border-radius: 10px;
  cursor: auto;
  width: 300px;
  max-height: 450px;
  top: 50px;
  right: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  padding: 5px;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 2px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--blue);
    border-radius: 50%;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
  border-radius: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ItemIconContainer = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ItemTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export const ItemText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ItemDate = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const ClearButton = styled(Button)`
  width: 100%;
  margin-bottom: 10px;
  margin-right: 5px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;
