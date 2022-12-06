import { FC, ReactNode } from 'react';
import { Spin } from 'antd';

import { SpinContainer, Wrapper } from './styles';

interface PageWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  isLoading,
  isSuccess,
}) => {
  if (isLoading) {
    return (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    );
  }

  return <Wrapper>{isSuccess !== false && children}</Wrapper>;
};
