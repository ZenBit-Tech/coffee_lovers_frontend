import { Card, Skeleton } from 'antd';
import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

export const StyledCard = styled(Card)`
  margin-bottom: 20px;
  width: 600px;
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
