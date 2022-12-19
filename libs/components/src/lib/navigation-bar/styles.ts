import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary};
  z-index: ${({ theme }) => theme.order.modal};
  display: flex;
  justify-content: space-between;
`;

export const UserContainer = styled.div`
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

export const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-left: 10px;
`;

export const BarItemsContainer = styled.div`
  display: flex;
  margin-right: 15px;
  padding: 5px 0;
`;

export const BarItem = styled.button`
  color: white;
  font-size: ${({ theme }) => theme.fontSize.medium};
  background: transparent;
  padding: 0 25px;
  position: relative;
  border-radius: 3px;
  transition: background-color 0.2s ease-in-out;

  &::after {
    content: '';
    top: 5px;
    right: -1px;
    width: 1px;
    background-color: white;
    height: 40px;
    position: absolute;
  }

  &:last-child {
    &::after {
      display: none;
    }
  }

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.colors.primary};

    &::after {
      display: none;
    }
  }
`;
