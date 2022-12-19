import { Select } from 'antd';
import styled from 'styled-components';
import { PageWrapper } from '@freelance/components';

export const Wrapper = styled(PageWrapper)``;

export const OfferWrapper = styled(PageWrapper)``;

export const OfferList = styled.div`
  margin-top: 15px;

  & > * {
    margin-bottom: 15px;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const StyledSelect = styled(Select)`
  width: 180px;
`;
