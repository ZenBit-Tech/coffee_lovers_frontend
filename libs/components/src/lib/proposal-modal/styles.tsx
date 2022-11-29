import { Form, Input, InputNumber } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

export const StyledForm = styled(Form)`
  padding: 30px 15px 20px 15px;
`;

export const StyledNumInput = styled(InputNumber)`
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
`;

export const StyledTextArea = styled(TextArea)`
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
`;

export const RateWrapper = styled(Form.Item)`
  display: flex;
  max-width: 280px;
  margin-top: 15px;

  label {
    font-weight: 500;
  }
`;

export const StyledText = styled.p`
  margin-bottom: 10px;
  font-weight: 500;
`;
