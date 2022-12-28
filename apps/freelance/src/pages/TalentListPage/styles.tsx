import { Card, Pagination, Rate, Skeleton } from 'antd';
import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
  width: 70%;
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
  min-width: 39%;
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
  font-size: ${baseTheme.fontSize.medium};
  margin-left: 20px;
`;

export const StyledInformation = styled.p`
  font-size: ${baseTheme.fontSize.large};
`;

export const StyledCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const SmallCardContainer = styled.div`
  margin-left: -20px;
`;
export const StyledHeader = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledRate = styled(Rate)`
  margin-left: auto;
`;
