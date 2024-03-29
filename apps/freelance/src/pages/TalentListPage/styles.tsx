import { Pagination, Skeleton } from 'antd';
import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

export const StyledCard = styled.div`
  margin-bottom: 20px;
  width: 70%;
  border: 2px ${({ theme }) => theme.card.borderColor} solid;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  position: relative;
`;

export const StyledPagination = styled(Pagination)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  display: 'flex';
`;

export const TitleContainer = styled.div`
  display: flex;
  min-width: 50%;
  justify-content: space-between;
`;

export const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 72px;
`;

export const StyledSkeleton = styled(Skeleton)`
  width: 600px;
`;
export const StyledName = styled.p`
  font-size: ${baseTheme.fontSize.large};
  font-weight: ${baseTheme.weight.bold};
  min-width: 100%;
  margin-left: 50px;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledWhContainer = styled.p`
  font-weight: ${baseTheme.weight.bold};
`;

export const StyledInformation = styled.p`
  font-size: ${baseTheme.fontSize.large};
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 15px;
`;

export const SmallCardContainer = styled.div`
  margin-left: -20px;
  padding: 15px;
`;
export const StyledHeader = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PropertiesContainer = styled.div`
  display: flex;
  margin: 10px 15px;

  & > div {
    margin-right: 15px;
  }
`;

export const TextExContainer = styled.div`
  width: 400px;
  margin-left: 50px;
  margin-bottom: -12px;
`;

export const StyledRateBox = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const StyledRatingInfoBox = styled.div`
  font-size: ${baseTheme.fontSize.large};
  display: flex;
  position: absolute;
  top: 10px;
  right: 60px;
  > p {
    margin-right: 60px;
  }
`;
