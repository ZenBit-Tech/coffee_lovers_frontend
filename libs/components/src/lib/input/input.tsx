import { ReactNode } from 'react';
import { Input } from 'antd';

import { StyledInput } from './styles';

export interface InputProps {
  placeholder?: string;
  size?: 'large' | 'middle' | 'small';
  prefix?: ReactNode;
  suffix?: ReactNode;
}

export const DefInput = (props: InputProps) => {
  return (
    <StyledInput>
      <Input {...props} />
    </StyledInput>
  );
};

export default DefInput;
