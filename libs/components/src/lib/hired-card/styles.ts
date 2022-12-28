import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 10px 15px;
  border-radius: 5px;
  justify-content: space-between;
`;

export const LeftSide = styled.div`
  display: flex;
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: 10px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const FreelancerContainer = styled.div`
  display: flex;
`;

export const FreelancerInfo = styled.div`
  margin-left: 10px;
`;

export const FreelacerName = styled.p`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const FreelacerPosition = styled.p`
  font-size: ${({ theme }) => theme.fontSize.small};
`;

interface StyledStatusProps {
  active?: boolean;
  closed?: boolean;
}

export const StyledStatus = styled.div<StyledStatusProps>`
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${props => (props.active ? ({ theme }) => theme.colors.success : '')};
  color: ${props => (props.closed ? ({ theme }) => theme.colors.danger : '')};
`;
