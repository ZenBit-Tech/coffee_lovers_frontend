import styled from 'styled-components';
import { PageWrapper, PrimaryButton } from '@freelance/components';

export const Wrapper = styled(PageWrapper)``;

export const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  margin-top: 15px;
  margin-bottom: 10px;
`;
export const InformationContainer = styled.div`
  display: flex;

  & > * {
    margin-right: 10px;
    margin-bottom: 15px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;
export const DescriptionContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSize.normal};
  border: 1px ${({ theme }) => theme.colors.grey} solid;
  padding: 5px 10px;
  border-radius: 5px;
`;

export const HiresTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-top: 15px;
  margin-bottom: 10px;
`;

export const HiresContainer = styled.div`
  & > div {
    margin-bottom: 10px;
  }
`;

export const StopHiringButton = styled(PrimaryButton)`
  height: 40px;
  margin-top: 15px;
`;
