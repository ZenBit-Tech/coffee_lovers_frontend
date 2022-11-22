import { Input, Select } from 'antd';
import styled from 'styled-components';

export const StyledInput = styled(Input)`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
`;

export const StyledPasswordInput = styled(Input.Password)`
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid var(--grey);
  box-shadow: 2px 2px 2px var(--grey);
`;

export const StyledSelect = styled(Select)`
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
`;
