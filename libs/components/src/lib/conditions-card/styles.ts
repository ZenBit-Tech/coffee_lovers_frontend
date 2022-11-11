import styled from 'styled-components';
import { Card, Button } from 'antd';

export const CardWrapper = styled.div`
  width: max-content;
  height: 100vh;
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

export const NewCard = styled(Card)`
  width: 50vw;
  max-width: 1000px;
  height: 50vh;
  max-height: 600px;
  overflow: auto;
`;

export const NewButton = styled(Button)`
  width: 200px;
  margin-top: 20px;
`;
