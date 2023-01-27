import { FC, useState } from 'react';
import { Col, Modal, Row, Space } from 'antd';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
  contractsPageTestId,
  DangerButton,
  PrimaryButton,
  RatingModal,
  roles,
  StyledCardReusable,
} from '@freelance/components';
import { selectRole } from 'redux/auth/auth-slice';
import { ContractsResponse } from 'redux/types/contracts.types';
import { User } from 'redux/types/user.types';

import { closed } from './constants';
import { DateText } from './styles';

interface IContractCard {
  element: ContractsResponse;
  index: number;
  contractsPage: number;
  user?: User;
}

export const ContractCard: FC<IContractCard> = ({
  element,
  index,
  contractsPage,
  user,
}) => {
  const role = useSelector(selectRole);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeContractHandler = (name: string, lastname: string): void => {
    Modal.confirm({
      title: t('contracts.closeContract'),
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
    <StyledCardReusable key={index}>
      <Row
        data-testid={contractsPageTestId.contractsCard}
        gutter={16}
        justify="center"
        align="middle"
      >
        <Col className="gutter-row" span={6}>
          <div data-testid={contractsPageTestId.contractsWrapper}>
            {element.offer.job.title}
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div data-testid={contractsPageTestId.freelancerNameContract}>
            {role === roles.freelancer
              ? element.offer.job_owner.first_name +
                ' ' +
                element.offer.job_owner.last_name
              : element.offer.freelancer.first_name +
                ' ' +
                element.offer.freelancer.last_name}
          </div>
        </Col>
        <Col className="gutter-row" span={4}>
          <div>{t('contracts.start')}</div>
          <DateText>{element.offer.start}</DateText>
        </Col>
        <RatingModal
          contract={element}
          job_owner_id={element.offer.job_owner?.id}
          freelancer_id={element.offer.freelancer?.id}
          job_id={element.offer.job.id}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />

        {contractsPage === closed && (
          <Col className="gutter-row" span={4}>
            <div>{t('contracts.end')}</div>
            <DateText>{element.end}</DateText>
          </Col>
        )}

        <Col span={4}>
          <Space size={'small'}>
            <Row>
              {contractsPage !== closed && user?.role === roles.freelancer && (
                <DangerButton
                  onClick={() =>
                    closeContractHandler(
                      element.offer.job_owner.first_name,
                      element.offer.job_owner.last_name,
                    )
                  }
                >
                  {t('contracts.close')}
                </DangerButton>
              )}
              {contractsPage === closed &&
                user?.role === roles.freelancer &&
                !element.offer.isRated && (
                  <PrimaryButton
                    onClick={() => setIsModalOpen(value => !value)}
                  >
                    {t('contracts.feedback')}
                  </PrimaryButton>
                )}
              {contractsPage === closed &&
                user?.role === roles.jobOwner &&
                !element.offer.isRated && (
                  <PrimaryButton
                    onClick={() => setIsModalOpen(value => !value)}
                  >
                    {t('contracts.feedback')}
                  </PrimaryButton>
                )}
            </Row>
          </Space>
        </Col>
      </Row>
    </StyledCardReusable>
  );
};
