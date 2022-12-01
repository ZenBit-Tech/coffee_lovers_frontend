import { ReactElement, useState } from 'react';
import { Avatar, Col, Input, List, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { SmallCard } from '@freelance/components';
import { useGetFreelancerQuery } from 'redux/services/freelancers';

import { User } from './model';
import { StyledPagination } from './styles';
import {
  Container,
  SmallCardContainer,
  StyledCard,
  StyledCardHeader,
  StyledHeader,
  StyledInformation,
  StyledName,
} from './styles';

const TalentListPage = (): ReactElement => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const { t } = useTranslation();
  const { data, isLoading } = useGetFreelancerQuery({ page, search });
  const { Search } = Input;
  async function handleSearch(value: string) {
    setPage(1);
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
      <Container>
        {!isLoading && (
          <List
            dataSource={data ? data[0] : []}
            renderItem={(item: User) => (
              <StyledCard
                title={
                  <StyledCardHeader>
                    <Avatar
                      src={item.profile_image}
                      size={130}
                      icon={<UserOutlined />}
                    />
                    <StyledName>
                      {t('talent.name', {
                        name: item.first_name + ' ' + item.last_name,
                      })}
                    </StyledName>
                  </StyledCardHeader>
                }
              >
                <SmallCardContainer>
                  <SmallCard
                    text={t('talent.position', { position: item.position })}
                  />
                  <SmallCard
                    text={t('talent.category', {
                      category: item.category ? item.category.name : '',
                    })}
                  />
                  <SmallCard
                    text={t('talent.available_time', {
                      available_time: item.available_time + ' h',
                    })}
                  />
                  <SmallCard
                    text={t('talent.hourly_rate', {
                      hourly_rate: item.hourly_rate + ' $',
                    })}
                  />
                </SmallCardContainer>
              </StyledCard>
            )}
          />
        )}
      </Container>
      <StyledPagination
        onChange={page => {
          setPage(page);
        }}
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
        total={data && data[1]}
        defaultCurrent={1}
        defaultPageSize={10}
      />
    </>
  );
};

export default TalentListPage;
