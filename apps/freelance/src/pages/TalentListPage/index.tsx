import { ReactElement, useState } from 'react';
import { Avatar, Col, Input, List, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { baseUrl, profileQ1, routes, SmallCard } from '@freelance/components';
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
  const { data } = useGetFreelancerQuery(page);
  const { Search } = Input;
  const navigate = useNavigate();

  async function handleSearch(value: string) {
    setSearch(value);
  }

  const navFunc = (props: number) => {
    const id = JSON.stringify(props);
    const path = generatePath(routes.freelancerInfo, { id });
    navigate(path);
  };

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
        <List
          dataSource={data ? data[0] : []}
          renderItem={(item: User) => (
            <StyledCard
              title={
                <StyledCardHeader>
                  <Avatar
                    src={`${baseUrl}/${item.profile_image}`}
                    size={profileQ1.avatarBigSize}
                    icon={<UserOutlined />}
                  />
                  <StyledName onClick={() => navFunc(item.id)}>
                    {t('talent.name', { name: item.email })}
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
                    available_time: item.available_time,
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
