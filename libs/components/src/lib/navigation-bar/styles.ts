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
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

export const UsernameContainer = styled.div`
  margin-left: 10px;
`;

export const UserName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const UserRole = styled.div`
  font-size: ${({ theme }) => theme.fontSize.small};
  color: ${({ theme }) => theme.colors.grey};
`;

export const BarItemsContainer = styled.div`
  display: flex;
  margin-right: 15px;
  padding: 5px 0;
`;

export const BarItem = styled.button`
  color: ${({ theme }) => theme.colors.white};
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
    background-color: ${({ theme }) => theme.colors.white};
    height: 40px;
    position: absolute;
  }

  &:last-child {
    &::after {
      display: none;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};

    &::after {
      display: none;
    }
  }
`;
