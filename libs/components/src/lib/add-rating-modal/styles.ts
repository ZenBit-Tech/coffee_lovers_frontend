import { Form, Input, Modal, Rate } from 'antd';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  min-height: 400px;
`;

export const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export const StyledRate = styled(Rate)`
  margin-bottom: 30px;
  transform: scale(1.5);
`;

export const StTextArea = styled(Input.TextArea)`
  resize: none;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px var(--grey);
  margin-bottom: 30px;
`;

export const StTextContainer = styled(Form.Item)`
  width: 100%;
`;
