import { ReactElement } from 'react';
import { Avatar, Input, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { Button, Filters, SmallCard } from '@freelance/components';
import { AppBar } from '@freelance/components';
import { filterRight, filterTop } from '@pages/FindJobs/constants';
import {
  PageBar,
  PageBarRightSideContainer,
  TitleContainer,
} from '@pages/FindJobs/styles';
import { useGetFreelancerQuery } from 'redux/services/freelancers';

import { User } from './model';
import { StyledPagination } from './styles';
import {
  Container,
  SmallCardContainer,
  StyledCard,
  StyledCardHeader,
  StyledName,
} from './styles';
import useFindFreelancers from './useFindFreelancers';

const TalentListPage = (): ReactElement => {
  const {
    filterPayload,
    page,
    search,
    take,
    filtersVisibility,
    submitFilter,
    onSearch,
    setPage,
    setFiltersVisibility,
  } = useFindFreelancers();

  const { t } = useTranslation();
  const req = {
    page,
    search,
    take,
    ...filterPayload,
  };
  const { data, isLoading } = useGetFreelancerQuery(req);

  return (
    <>
      <AppBar />
      <Container>
        <PageBar>
          <TitleContainer>
            <div>{t('talent.header')}</div>
            <div>{data ? data[1] : 0}</div>
          </TitleContainer>
          <PageBarRightSideContainer>
            <Input.Search
              placeholder={t('findJobs.searchPlaceholder')}
              onSearch={onSearch}
            />
            <Button
              height="35px"
              onClick={() => setFiltersVisibility(prev => !prev)}
            >
              {t('findJobs.filters')}
            </Button>
            <Filters
              visibility={filtersVisibility}
              closeHandler={() => setFiltersVisibility(false)}
              submit={submitFilter}
              top={filterTop}
              right={filterRight}
            />
          </PageBarRightSideContainer>
        </PageBar>
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
                    width="large"
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
        total={data && data[1]}
        defaultCurrent={1}
        defaultPageSize={10}
      />
    </>
  );
};

export default TalentListPage;
