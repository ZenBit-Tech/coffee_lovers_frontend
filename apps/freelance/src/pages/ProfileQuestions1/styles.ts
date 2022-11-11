import { DatePicker, Form, Input } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

export const Wrapper = styled.div`
  padding: 50px 50px 5px 50px;
`;

export const StTextArea = styled(TextArea)`
  resize: none;
`;

export const StFormItemDateFrom = styled(Form.Item)`
  margin-left: 100px;
`;
export const StFormItemDateTo = styled(Form.Item)`
  margin-left: 10px;
`;

export const StTextAreaWork = styled(TextArea)`
  resize: none;
  width: 270px;
`;

export const StDatePickerWork = styled(DatePicker)`
  margin-left: 10px;
`;
