import styled from 'styled-components';

export const Wrapper = styled.div`
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 10px 15px;
  border-radius: 5px;
  display: flex;

  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LeftSide = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const RightSide = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  & > * {
    margin-bottom: 10px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const JobContainer = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

export const DescriptionContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const JobDetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

export const JobDetailsTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const JobDetailsTopLeftSide = styled.div``;

export const JobDetailsTopRightSide = styled.div`
  & > * {
    margin-bottom: 10px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const JobDetailsBottom = styled.div`
  display: flex;

  & > * {
    margin-right: 15px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

export const StyledJobTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const StyledJobOwnerName = styled.div`
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
