import {Input}  from 'antd'
import { StyledInput } from './styles';

export interface InputProps {
  placeholder?: string
}


export function DefInput(props: InputProps) {
  return (
    <StyledInput>
      <Input {...props}/>
    </StyledInput>
  );
}

export default DefInput;
