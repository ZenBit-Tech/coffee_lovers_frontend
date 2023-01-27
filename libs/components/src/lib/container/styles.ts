import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.media.small}) {
    width: ${({ theme }) => theme.media.small};
  }

  @media screen and (min-width: ${({ theme }) => theme.media.medium}) {
    width: ${({ theme }) => theme.media.medium};
  }

  @media screen and (min-width: ${({ theme }) => theme.media.large}) {
    padding-left: 40px;
    padding-right: 40px;
    width: ${({ theme }) => theme.media.large};
  }
`;
