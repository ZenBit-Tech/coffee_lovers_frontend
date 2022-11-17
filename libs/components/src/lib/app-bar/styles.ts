import styled from 'styled-components';

export const StyledAppBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ theme }) => theme.sizes.header.minHeight};

  border-bottom: 2.5px solid rgba(20, 94, 103, 0.05);
`;
