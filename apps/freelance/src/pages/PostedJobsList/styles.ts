import { Select } from 'antd';
import styled from 'styled-components';
import { PageWrapper, PrimaryButton } from '@freelance/components';

export const Wrapper = styled(PageWrapper)``;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const PageTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export const PostJobButton = styled(PrimaryButton)`
  height: 50px;
  width: 120px;
`;

export const StyledSelect = styled(Select)`
  width: 140px;
`;

export const JobListContainer = styled.div`
  margin-top: 15px;

  & > * {
    margin-bottom: 10px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;
