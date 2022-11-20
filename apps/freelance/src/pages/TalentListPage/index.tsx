import { ReactElement, useState } from 'react';
import { Avatar, Col, Input, List, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserOutlined } from '@ant-design/icons';
import { SmallCard } from '@freelance/components';

import { useGetTalentsHook } from './hooks/getTalents';
import {
  SmallCardContainer,
  StyledCard,
  StyledCardHeader,
  StyledHeader,
  StyledInformation,
  StyledName,
  StyledSkeleton,
} from './styles';

const TalentListPage = (): ReactElement => {
  const { Search } = Input;
  const [search, setSearch] = useState<string>('');
  const { t } = useTranslation();
  const { loadMoreData, data } = useGetTalentsHook();
  async function handleSearch(value: string) {
    setSearch(value);
  }

  return (
    <>
      <StyledHeader>
        <StyledInformation>{t('talent.header')}</StyledInformation>
        <Row justify="end" gutter={8}>
          <Col className="gutter-row" span={8}>
            <Search
              value={search}
              onChange={e => {
                handleSearch(e.target.value);
              }}
              placeholder={t('talent.search')}
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <Input placeholder={t('talent.filter')} />
          </Col>
        </Row>
      </StyledHeader>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={true}
        loader={<StyledSkeleton avatar paragraph={{ rows: 3 }} />}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={item => (
            <StyledCard
              title={
                <StyledCardHeader>
                  <Avatar
                    src={item.picture.large}
                    size={130}
                    icon={<UserOutlined />}
                  />
                  <StyledName>
                    {t('talent.name', { name: item.name.last })}
                  </StyledName>
                </StyledCardHeader>
              }
            >
              <SmallCardContainer>
                <SmallCard text={'category'} />
                <SmallCard text={'category'} />
                <SmallCard text={'category'} />
                <SmallCard text={'category'} />
              </SmallCardContainer>
            </StyledCard>
          )}
        />
      </InfiniteScroll>
    </>
  );
};

export default TalentListPage;
