import { Pagination } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const PageBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
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
  align-self: center;
`;
