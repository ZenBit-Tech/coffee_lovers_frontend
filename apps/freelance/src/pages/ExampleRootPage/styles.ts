import { Button, Space } from 'antd';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

export const Title = styled.h1`
  color: var(--blue);
  margin-bottom: 30px;
`;

export const Text = styled.h2`
  color: var(--blue);
  margin-bottom: 50px;
`;

export const StyledButton = styled(Button)`
  width: 70%;
  box-shadow: 2px 2px 2px var(--blue);
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrap = styled(Space.Compact)`
  width: 70%;
  text-transform: uppercase;
  border-radius: 10px;
`;
