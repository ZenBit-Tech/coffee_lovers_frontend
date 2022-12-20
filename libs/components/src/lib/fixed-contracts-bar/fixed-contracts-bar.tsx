import { Col } from 'antd';

import { StyledFixedContractsBar, StyledPage } from './styles';
import { Props } from './types';

export function FixedContractsBar(props: Props) {
  return (
    <StyledFixedContractsBar>
      <StyledFixedContractsBar justify="space-evenly">
        {props.pages.map((el: string, index: number) => (
          <Col span={4}>
            <StyledPage
              onClick={() => props.setActivePage(index)}
              disabled={index === props.active}
            >
              {el}
            </StyledPage>
          </Col>
        ))}
      </StyledFixedContractsBar>
    </StyledFixedContractsBar>
  );
}

export default FixedContractsBar;
