import { ReactElement, useCallback, useEffect, useState } from 'react';
import { Avatar, Col, Input, List, Row, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserOutlined } from '@ant-design/icons';
import { SmallCard } from '@freelance/components';

import {
  SmallCardContainer,
  StyledCard,
  StyledCardHeader,
  StyledHeader,
  StyledInformation,
  StyledName,
} from './styles';
const { Search } = Input;

interface user {
  email: string;
  name: name;
  picture: picture;
}

interface picture {
  large: string;
}

interface name {
  last: string;
}

const TalentListPage = (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<user[]>([]);
  const [search, setSearch] = useState<string>('');
  console.log(search);

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      'https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo',
    )
      .then(res => res.json())
      .then(body => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [data, loading]);
  useEffect(() => {
    if (!data[0]) {
      loadMoreData();
    }
  }, [data, loadMoreData]);

  return (
    <>
      <StyledHeader>
        <StyledInformation>Talent based on your job post</StyledInformation>
        <Row justify="end" gutter={8}>
          <Col className="gutter-row" span={8}>
            <Search
              onChange={e => {
                setSearch(e.target.value);
              }}
              placeholder="Search"
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <Input placeholder="Filter" />
          </Col>
        </Row>
      </StyledHeader>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 20}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
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
                  <StyledName>{item.name.last}</StyledName>
                </StyledCardHeader>
              }
            >
              <SmallCardContainer>
                <SmallCard text={item.email} />
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
