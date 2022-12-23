import { ReactElement } from 'react';
import { Avatar, Input, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  Filters,
  PrimaryButton,
  profileQ1,
  routes,
  SecondaryButton,
  SmallCard,
} from '@freelance/components';
import { filterRight, filterTop } from '@pages/FindJobs/constants';
import { PageBar, PageBarRightSideContainer } from '@pages/FindJobs/styles';
import { useSetFavoritesMutation } from 'redux/services/user';
import { User } from 'redux/types/user.types';

import { talentConsts } from './constants';
import * as St from './styles';
import useFindFreelancers from './useFindFreelancers';
import { useFreelancerData } from './useFreelancerData';
import { isFreelancerFav } from './utils';

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

  const {
    isLoading,
    freelancerRenderData,
    favoritesHandler,
    data,
    favorites,
    allFreelancerHanler,
  } = useFreelancerData(page, search, take, filterPayload);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [addFavorites] = useSetFavoritesMutation();

  const onChangeFavorite = async (id: number, value: number) => {
    const is_favorite = !!value;
    try {
      await addFavorites({ id, is_favorite });
    } catch (error) {
      alert(error);
    }
  };

  const navFunc = (props: number) => {
    const id = JSON.stringify(props);
    const path = generatePath(routes.freelancerInfo, { id });
    navigate(path);
  };

  return (
    <>
      <St.Container>
        <PageBar>
          <St.TitleContainer>
            <SecondaryButton
              size={talentConsts.largeSize}
              onClick={allFreelancerHanler}
            >
              {t('talent.header')} - {data ? data[1] : 0}
            </SecondaryButton>
            <SecondaryButton
              size={talentConsts.largeSize}
              onClick={favoritesHandler}
            >
              {t('talent.favoritesbtn')}
            </SecondaryButton>
          </St.TitleContainer>
          <PageBarRightSideContainer>
            <Input.Search
              placeholder={t('findJobs.searchPlaceholder')}
              onSearch={onSearch}
            />
            <PrimaryButton onClick={() => setFiltersVisibility(prev => !prev)}>
              {t('findJobs.filters')}
            </PrimaryButton>
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
            dataSource={freelancerRenderData}
            renderItem={(item: User) => (
              <St.StyledCard
                key={item.id}
                title={
                  <St.StyledCardHeader>
                    <Avatar
                      src={`${baseUrl}/${item.profile_image}`}
                      size={profileQ1.avatarBigSize}
                      icon={<UserOutlined />}
                    />
                    <St.StyledName onClick={() => navFunc(item.id)}>
                      {t('talent.name', {
                        name: item.first_name + ' ' + item.last_name,
                      })}
                    </St.StyledName>
                    <St.StyledRate
                      onChange={value => onChangeFavorite(item.id, value)}
                      count={1}
                      value={isFreelancerFav(item, favorites)}
                    />
                  </St.StyledCardHeader>
                }
              >
                <St.SmallCardContainer>
                  <SmallCard
                    width={talentConsts.largeSize}
                    text={t('talent.position', { position: item.position })}
                  />
                  <SmallCard
                    width={talentConsts.largeSize}
                    text={t('talent.category', {
                      category: item.category ? item.category.name : '',
                    })}
                  />
                  <SmallCard
                    width={talentConsts.largeSize}
                    text={t('talent.available_time', {
                      available_time: item.available_time,
                    })}
                  />
                  <SmallCard
                    width={talentConsts.largeSize}
                    text={t('talent.hourly_rate', {
                      hourly_rate: item.hourly_rate + ' $',
                    })}
                  />
                  <SmallCard
                    width={talentConsts.largeSize}
                    text={t('talent.english_level', {
                      english_level: item.english_level,
                    })}
                  />
                </St.SmallCardContainer>
              </St.StyledCard>
            )}
          />
        )}
      </St.Container>
      <St.StyledPagination
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
