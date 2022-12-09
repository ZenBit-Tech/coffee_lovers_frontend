import { FC } from 'react';
import { PaginationProps } from 'antd';

import { StyledPagination } from './styles';

export const Pagination: FC<PaginationProps> = props => {
  return <StyledPagination {...props} />;
};
