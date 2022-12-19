import { Tabs } from 'antd';

import { TabKeys } from './constants';
import { Wrapper } from './styles';
import Tab from './Tab';
import useOffersPage from './useOffersPage';

const OffersPage = () => {
  const {
    t,
    offers,
    isOffersLoading,
    interviews,
    isInterviewsLoading,
    sort,
    changeSort,
  } = useOffersPage();

  return (
    <Wrapper isLoading={isOffersLoading}>
      <Tabs
        centered
        defaultActiveKey={TabKeys.OFFERS}
        items={[
          {
            key: TabKeys.OFFERS,
            label: t('offers.tabs.offers'),
            children: (
              <Tab
                offers={offers}
                isOffersLoading={isOffersLoading}
                t={t}
                sort={sort}
                changeSort={changeSort}
              />
            ),
          },
          {
            key: TabKeys.INTERVIEWS,
            label: t('offers.tabs.interviews'),
            children: (
              <Tab
                interviews={interviews}
                isInterviewsLoading={isInterviewsLoading}
              />
            ),
          },
        ]}
      />
    </Wrapper>
  );
};

export default OffersPage;
