import styled from 'styled-components';

export const Container = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 2px 10px;
  border-radius: 10px;
`;
