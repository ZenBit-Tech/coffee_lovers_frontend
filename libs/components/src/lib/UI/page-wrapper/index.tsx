import { FC, ReactNode } from 'react';
import { Spin } from 'antd';

import { SpinContainer, Wrapper } from './styles';

interface PageWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  className?: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({
  children,
  isLoading,
  isSuccess,
  className,
}) => {
  if (isLoading) {
    return (
      <SpinContainer>
        <Spin />
      </SpinContainer>
    );
  }

  return (
    <Wrapper className={className}>{isSuccess !== false && children}</Wrapper>
  );
};
