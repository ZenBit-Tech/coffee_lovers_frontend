import { ReactElement } from 'react';
import { Avatar, Input, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  Button,
  ExpandableText,
  Filters,
  InformationSticker,
  routes,
} from '@freelance/components';
import { filterRight, filterTop } from '@pages/FindJobs/constants';
import {
  PageBar,
  PageBarRightSideContainer,
  TitleContainer,
} from '@pages/FindJobs/styles';
import { useGetFreelancerQuery } from 'redux/services/freelancers';
import { baseTheme } from 'src/styles/theme';

import { User } from './model';
import { PropertiesContainer, TextExContainer } from './styles';
import { StyledPagination } from './styles';
import { Container, StyledCard, StyledCardHeader, StyledName } from './styles';
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
  const navigate = useNavigate();
  const { data, isLoading } = useGetFreelancerQuery(req);

  const navFunc = (props: number) => {
    const id = JSON.stringify(props);
    const path = generatePath(routes.freelancerInfo, { id });
    navigate(path);
  };

  return (
    <>
      <Container>
        <PageBar theme={baseTheme}>
          <TitleContainer theme={baseTheme}>
            <div>{t('talent.header')}</div>
            <div>{data ? data[1] : 0}</div>
          </TitleContainer>
          <PageBarRightSideContainer>
            <Input.Search
              placeholder={t('findJobs.searchPlaceholder')}
              onSearch={onSearch}
            />
            <Button onClick={() => setFiltersVisibility(prev => !prev)}>
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
              <StyledCard theme={baseTheme}>
                <StyledCardHeader>
                  <Avatar
                    src={`${baseUrl}/${item.profile_image}`}
                    size={baseTheme.avatars.avarageAvatar}
                    icon={<UserOutlined />}
                  />
                  <StyledName onClick={() => navFunc(item.id)}>
                    {t('talent.name', {
                      name: item.first_name + ' ' + item.last_name,
                    })}
                  </StyledName>
                  <TextExContainer>
                    <ExpandableText>{item.description}</ExpandableText>
                  </TextExContainer>
                </StyledCardHeader>
                <PropertiesContainer>
                  {item.position && (
                    <InformationSticker>
                      {t('talent.position', { position: item.position })}
                    </InformationSticker>
                  )}
                  {item.category && (
                    <InformationSticker>
                      {t('talent.category', {
                        category: item.category.name,
                      })}
                    </InformationSticker>
                  )}
                  {item.available_time && (
                    <InformationSticker>
                      {t('talent.available_time', {
                        available_time: item.available_time,
                      })}
                    </InformationSticker>
                  )}
                  {item.hourly_rate && (
                    <InformationSticker>
                      {t('talent.hourly_rate', {
                        hourly_rate: item.hourly_rate + ' $',
                      })}
                    </InformationSticker>
                  )}
                </PropertiesContainer>
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
