import styled from 'styled-components';

export const Title = styled.h1``;

export const Title1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: ${({ theme }) => theme.weight.regular};
`;

export const Title2 = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
`;
