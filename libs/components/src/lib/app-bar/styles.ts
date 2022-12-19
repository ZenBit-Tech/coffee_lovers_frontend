import styled from 'styled-components';

export const StyledAppBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ theme }) => theme.sizes.header.minHeight};

  position: fixed;
  z-index: ${({ theme }) => theme.order.modal};
  background-color: white;
  width: ${({ theme }) => theme.sizes.container.width};
  top: 0;

  border-bottom: 2.5px solid rgba(20, 94, 103, 0.05);
`;
