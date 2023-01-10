import { Col, Row, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PageWrapper, roles, StyledCardReusable } from '@freelance/components';
import { selectRole } from 'redux/auth/auth-slice';
import {
  useGetActiveConractsQuery,
  useGetClosedContractsQuery,
} from 'redux/services/contractApi';
import { ContractsResponse } from 'redux/types/contracts.types';

import { active, closed, dateFormat } from './constants';
import { DateText } from './styles';

const ContractsList = () => {
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const { data: closedContracts } = useGetClosedContractsQuery();
  const { data: activeContracts } = useGetActiveConractsQuery();

  return (
    <PageWrapper>
      <h3>{t('contracts.header')}</h3>
      <Tabs
        defaultActiveKey={`${active}`}
        centered
        items={new Array(2).fill(null).map((_, i) => {
          const id = String(i + 1);
          const pageItems = i === closed ? closedContracts : activeContracts;
          const pageName =
            i === closed ? t('contracts.closed') : t('contracts.active');

          return {
            label: pageName,
            key: id,
            children: pageItems?.map((el: ContractsResponse, index: number) => (
              <StyledCardReusable key={index}>
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
            )),
          };
        })}
      />
    </PageWrapper>
  );
};

export default ContractsList;
