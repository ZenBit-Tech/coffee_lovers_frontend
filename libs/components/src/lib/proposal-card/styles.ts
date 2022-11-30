import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 10px 15px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledTopLeftSide = styled.div`
  display: flex;
`;

export const StyledTopRightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div:last-child {
    margin-right: 0;
  }
`;

export const StyledBottom = styled.div`
  margin-top: 10px;
`;

export const FreelancerInfoContainer = styled.div`
  margin-left: 15px;
`;

export const StyledFreelancerName = styled.span`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const FreelancerDetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FreelancerDetail = styled.div`
  margin-right: 15px;
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 2px 8px;
  border-radius: 10px;
`;

export const StyledHourlyRate = styled.div``;

export const CoverLetterText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const CoverLetterVisibility = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 10px;
  align-self: flex-end;
  cursor: pointer;
`;