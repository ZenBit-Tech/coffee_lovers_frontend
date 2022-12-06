import { Button } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  padding: 50px 50px 5px 50px;
`;

export const StUserAvatarWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 30%;
  padding: inherit;
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
