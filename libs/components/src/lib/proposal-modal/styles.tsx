import { Form, Input, InputNumber } from 'antd';
import styled from 'styled-components';
import { baseTheme } from 'src/styles/theme';

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
  max-width: 310px;
  margin-top: 15px;

  label {
    font-size: ${baseTheme.fontSize.large};
  }
`;

export const StyledText = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  font-size: ${baseTheme.fontSize.large};
`;
