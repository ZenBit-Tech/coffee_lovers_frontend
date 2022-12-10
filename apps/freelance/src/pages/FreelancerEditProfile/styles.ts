import { Space } from 'antd';
import styled from 'styled-components';
import { PageWrapper } from '@freelance/components';

export const Wrapper = styled(PageWrapper)`
  padding: 50px 50px 5px 50px;
`;

export const LogoWrapper = styled(Space)`
  display: flex;
  align-items: flex-end;
  margin-top: 5px;
  margin-right: 50px;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
`;
