import { FC } from 'react';
import { SearchProps } from 'antd/es/input';

import { StyledInputSearch } from './styles';

export const InputSearch: FC<SearchProps> = props => {
  return <StyledInputSearch {...props} />;
};
