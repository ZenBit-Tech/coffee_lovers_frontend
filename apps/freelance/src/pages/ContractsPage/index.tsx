import { useState } from 'react';
import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
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

import { active, contractTypes, dateFormat } from './constants';
import { DateText } from './styles';

const ContractsList = () => {
  const { t } = useTranslation();
  const [activePage, setActivePage] = useState<number>(active);
  const role = useSelector(selectRole);
  const { data: closedContracts } = useGetClosedContractsQuery();
  const { data: activeContracts } = useGetActiveConractsQuery();

  return (
    <PageWrapper>
      <h3>My contracts</h3>
      <FixedContractsBar
        active={activePage}
        setActivePage={setActivePage}
        pages={contractTypes}
      />
      {activePage === active
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
                  <div>{t('contracts.start')}</div>
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
                  <div>{t('contracts.start')}</div>
                  <DateText>{dateFormat(el.offer.start)}</DateText>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div>{t('contracts.end')}</div>
                  <DateText>{dateFormat(el.end)}</DateText>
                </Col>
              </Row>
            </StyledCardReusable>
          ))}
    </PageWrapper>
  );
};

export default ContractsList;
