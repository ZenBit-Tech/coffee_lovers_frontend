import { useState } from 'react';
import { Col, Row } from 'antd';
import {
  FixedContractsBar,
  PageWrapper,
  StyledCardReusable,
} from '@freelance/components';

import { DateText } from './styles';

const ContractsList = () => {
  const [activePage, setActivePage] = useState<number>(0);

  return (
    <PageWrapper>
      <FixedContractsBar
        active={activePage}
        setActivePage={setActivePage}
        pages={['Active', 'Closed']}
      />
      <StyledCardReusable>
        <Row gutter={16} justify="center" align="middle">
          <Col className="gutter-row" span={6}>
            <div>ProjectTitle</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div>Job-owner name</div>
          </Col>
          <Col className="gutter-row" span={4}>
            <div>Start date</div>
            <DateText>Start date:</DateText>
          </Col>
          <Col className="gutter-row" span={4}>
            <div>End date:</div>
            <DateText>End date:</DateText>
          </Col>
        </Row>
      </StyledCardReusable>
    </PageWrapper>
  );
};

export default ContractsList;
