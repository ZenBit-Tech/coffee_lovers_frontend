import styled from 'styled-components';
import { PageWrapper, Pagination } from '@freelance/components';

export const Wrapper = styled(PageWrapper)`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 40px;
  position: relative;
`;

export const PageBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  position: sticky;
  top: ${({ theme }) => theme.sizes.navigationBar.height};
  z-index: 10;
  margin-bottom: 15px;
`;

export const ListContainer = styled.div`
  margin-top: 10px;

  & > div {
    margin-bottom: 15px;
  }
`;

export const PageBarRightSideContainer = styled.div`
  display: flex;

  & > *:first-child {
    margin-right: 15px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;

  & > div:first-child {
    font-size: ${({ theme }) => theme.fontSize.extraLarge};
    font-weight: ${({ theme }) => theme.weight.bold};
  }

  & > div:last-child {
    margin-left: 10px;
    font-size: ${({ theme }) => theme.fontSize.extraLarge};
    color: ${({ theme }) => theme.colors.grey};
    font-weight: ${({ theme }) => theme.weight.medium};
  }
`;

export const StyledPagination = styled(Pagination)`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
  background-color: ${({ theme }) => theme.colors.white};
`;
