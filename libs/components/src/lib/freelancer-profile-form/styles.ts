import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import styled from 'styled-components';
import { MinusCircleOutlined } from '@ant-design/icons';
import { prBarStrColor } from '@freelance/components';

const { TextArea } = Input;

export const StForm = styled(Form)`
  margin-top: 30px;
  .ant-form-item {
    margin-bottom: 45px;
  }
  .ant-form-item-label > label .ant-form-item-optional {
    display: none;
  }
  @media (max-width: 770px) and (min-width: 575px) {
    .ant-form-item-label > label {
      font-size: 10px;
    }
  }
  @media (max-width: 1024px) and (min-width: 770px) {
    .ant-form-item-label > label {
      font-size: 12px;
    }
  }
`;

export const StInputNumber = styled(InputNumber)`
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
  @media (max-width: 980px) and (min-width: 575px) {
    .ant-input-number-group-addon {
      white-space: normal;
      font-size: 6px;
    }
  }
`;

export const StTextArea = styled(TextArea)`
  resize: none;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
`;

export const StFormItemDateFrom = styled(Form.Item)`
  margin-left: 100px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;

export const StFormItemWorkDateFrom = styled(Form.Item)`
  margin-left: 30px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;

export const StFormItemDateTo = styled(Form.Item)`
  margin-left: 10px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
  outline: none;
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;

export const StTextAreaWork = styled(TextArea)`
  resize: none;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
`;

export const StWorkWrapper = styled(Form.Item)`
  width: 280px;
`;

export const StFormList = styled.div`
  > .ant-form-item {
    margin-bottom: 0;
  }
`;

export const StDatePickerWork = styled(DatePicker)`
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;

export const StSubButton = styled(Button)`
  width: 100%;
  background-color: ${prBarStrColor};
`;

export const StMinusOutlined = styled(MinusCircleOutlined)`
  padding: 10px;
`;
