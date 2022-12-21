import { useState } from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import {
  FixedContractsBar,
  PageWrapper,
  roles,
  StyledCardReusable,
} from '@freelance/components';
import { selectRole } from 'redux/auth/auth-slice';
import {
  useGetActiveConractsQuery,
  useGetClosedContractsQuery,
} from 'redux/contracts/contracts';
import { ContractsResponse } from 'redux/contracts/types';

import { dateFormat } from './constants';
import { DateText } from './styles';

const ContractsList = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const role = useSelector(selectRole);
  const { data: closedContracts } = useGetClosedContractsQuery();
  const { data: activeContracts } = useGetActiveConractsQuery();

  return (
    <PageWrapper>
      <FixedContractsBar
        active={activePage}
        setActivePage={setActivePage}
        pages={['Active', 'Closed']}
      />
      {activePage === 0
        ? activeContracts?.map((el: ContractsResponse) => (
            <StyledCardReusable>
              <Row gutter={16} justify="center" align="middle">
                <Col className="gutter-row" span={6}>
                  <div>{el.offer.job.title}</div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div>
                    {role === roles.freelancer
                      ? el.offer.job_owner.first_name +
                        ' ' +
                        el.offer.job_owner.last_name
                      : el.offer.freelancer.first_name +
                        ' ' +
                        el.offer.freelancer.last_name}
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div>Start date</div>
                  <DateText>{dateFormat(el.offer.start)}</DateText>
                </Col>
              </Row>
            </StyledCardReusable>
          ))
        : closedContracts?.map((el: ContractsResponse) => (
            <StyledCardReusable>
              <Row gutter={16} justify="center" align="middle">
                <Col className="gutter-row" span={6}>
                  <div>{el.offer.job.title}</div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div>
                    {role === roles.freelancer
                      ? el.offer.job_owner.first_name +
                        ' ' +
                        el.offer.job_owner.last_name
                      : el.offer.freelancer.first_name +
                        ' ' +
                        el.offer.freelancer.last_name}
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div>Start date</div>
                  <DateText>{dateFormat(el.offer.start)}</DateText>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div>End date:</div>
                  <DateText>{dateFormat(el.end)}</DateText>
                </Col>
              </Row>
            </StyledCardReusable>
          ))}
    </PageWrapper>
  );
};

export default ContractsList;
