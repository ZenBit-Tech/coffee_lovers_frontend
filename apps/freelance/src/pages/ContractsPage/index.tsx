import { useState } from 'react';
import { Col, Modal, Row, Space, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
  contractsPageTestId,
  DangerButton,
  PageWrapper,
  RatingModal,
  roles,
  StyledCardReusable,
} from '@freelance/components';
import { selectRole } from 'redux/auth/auth-slice';
import {
  useGetActiveConractsQuery,
  useGetClosedContractsQuery,
} from 'redux/services/contractApi';
import { useGetUserInfoQuery } from 'redux/services/userApi';
import { ContractsResponse } from 'redux/types/contracts.types';

import { active, closed } from './constants';
import { DateText } from './styles';

const ContractsList = () => {
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const { data: closedContracts } = useGetClosedContractsQuery();
  const { data: activeContracts } = useGetActiveConractsQuery();
  const { data: user } = useGetUserInfoQuery();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeContractHandler = (name: string, lastname: string): void => {
    Modal.confirm({
      title: t('postedJobDetails.modal.closeContract'),
      icon: <CheckCircleOutlined />,
      content: `${name} ${lastname}`,
      okText: t('postedJobDetails.modal.confirm'),
      cancelText: t('postedJobDetails.modal.cancel'),
      onOk() {
        setIsModalOpen(true);
      },
    });
  };

  return (
    <PageWrapper>
      <h3>{t('contracts.header')}</h3>
      <Tabs
        data-testid={contractsPageTestId.contractsTab}
        defaultActiveKey={`${active}`}
        centered
        items={new Array(2).fill(null).map((_, contractsPage) => {
          const id = String(contractsPage + 1);
          const pageItems =
            contractsPage === closed ? closedContracts : activeContracts;
          const pageName =
            contractsPage === closed
              ? t('contracts.closed')
              : t('contracts.active');

          return {
            label: pageName,
            key: id,
            children: pageItems?.map((el: ContractsResponse, index: number) => (
              <StyledCardReusable key={index}>
                <Row
                  data-testid={contractsPageTestId.contractsCard}
                  gutter={16}
                  justify="center"
                  align="middle"
                >
                  <Col className="gutter-row" span={6}>
                    <div data-testid={contractsPageTestId.contractsWrapper}>
                      {el.offer.job.title}
                    </div>
                  </Col>
                  <Col className="gutter-row" span={6}>
                    <div
                      data-testid={contractsPageTestId.freelancerNameContract}
                    >
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
                    <DateText>{el.offer.start}</DateText>
                  </Col>
                  <RatingModal
                    contract={el}
                    job_owner_id={el.offer.job_owner?.id}
                    job_id={el.offer.job.id}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                  />

                  {contractsPage === closed && (
                    <Col className="gutter-row" span={4}>
                      <div>{t('contracts.end')}</div>
                      <DateText>{el.end}</DateText>
                    </Col>
                  )}

                  <Col span={4}>
                    <Space size={'small'}>
                      <Row>
                        {contractsPage !== closed &&
                          user?.role === roles.freelancer && (
                            <DangerButton
                              onClick={() =>
                                closeContractHandler(
                                  el.offer.job_owner.first_name,
                                  el.offer.job_owner.last_name,
                                )
                              }
                            >
                              {t('contracts.close')}
                            </DangerButton>
                          )}
                      </Row>
                    </Space>
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
