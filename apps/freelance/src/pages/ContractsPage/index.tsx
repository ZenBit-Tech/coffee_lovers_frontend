import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { contractsPageTestId, PageWrapper } from '@freelance/components';
import {
  useGetActiveConractsQuery,
  useGetClosedContractsQuery,
} from 'redux/services/contractApi';
import { useGetUserInfoQuery } from 'redux/services/userApi';
import { ContractsResponse } from 'redux/types/contracts.types';

import { active, closed } from './constants';
import { ContractCard } from './ContractCard';

const ContractsList = () => {
  const { t } = useTranslation();
  const { data: closedContracts } = useGetClosedContractsQuery();
  const { data: activeContracts } = useGetActiveConractsQuery();
  const { data: user } = useGetUserInfoQuery();

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
              <ContractCard
                element={el}
                index={index}
                contractsPage={contractsPage}
                user={user}
              />
            )),
          };
        })}
      />
    </PageWrapper>
  );
};

export default ContractsList;
