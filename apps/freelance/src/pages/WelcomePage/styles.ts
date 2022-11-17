import styled from 'styled-components';
import Card from 'antd/lib/card/Card';
export const H2 = styled.h2`
  font: 40px;
`;

export const CenterCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 700px;
  height: 500px;
`;
