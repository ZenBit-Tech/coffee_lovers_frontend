import { UserOutlined } from '@ant-design/icons';
import { prBarStrColor } from '@freelance/components';
import { Button, DatePicker, Form, Input, InputNumber } from 'antd';
import styled from 'styled-components';

const { TextArea } = Input;

export const Wrapper = styled.div`
  padding: 50px 50px 5px 50px;
  flex: 0 0 100%;
  max-width: 100%;
`;

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
  @media (max-width: 980px) and (min-width: 575px) {
    .ant-input-number-group-addon {
      white-space: normal;
      font-size: 6px;
    }
  }
`;

export const StTextArea = styled(TextArea)`
  resize: none;
`;

export const StFormItemDateFrom = styled(Form.Item)`
  margin-left: 100px;
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;
export const StFormItemWorkDateFrom = styled(Form.Item)`
  margin-left: 20px;
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;
export const StFormItemDateTo = styled(Form.Item)`
  margin-left: 10px;
  @media (max-width: 740px) {
    margin-left: auto;
  }
`;

export const StTextAreaWork = styled(TextArea)`
  resize: none;
`;

export const StWorkWrapper = styled.div`
  width: 280px;
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

export const StUserAvatarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 20%;
  padding: inherit;
  display: flex;
  flex-direction: column;
  @media (max-width: 769px) {
    right: 0;
  }
`;
export const StUserIcon = styled(UserOutlined)`
  font-size: 60px;
  margin-bottom: 5px;
  @media (max-width: 740px) {
    font-size: 45px;
    right: 10%;
  }
  @media (max-width: 426px) {
    font-size: 30px;
    right: 0;
  }
`;
export const StUserUpBtn = styled(Button)`
  @media (max-width: 426px) {
    font-size: 8px;
  }
`;
