import styled from 'styled-components';

export const DecoratedLink = styled.li`
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
