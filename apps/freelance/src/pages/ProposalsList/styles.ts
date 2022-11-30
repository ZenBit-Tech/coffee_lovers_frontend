import styled from 'styled-components';

export const Wrapper = styled.div``;

export const ListContainer = styled.div`
  & > div {
    margin-bottom: 20px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

export const StyledProjectName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  margin-bottom: 10px;
`;
