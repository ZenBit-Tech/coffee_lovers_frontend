import { ReactElement } from 'react';
import { Avatar, Col, Input, List, Rate, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { generatePath, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {
  baseUrl,
  ExpandableText,
  Filters,
  PrimaryButton,
  profileQ1,
  routes,
  SecondaryButton,
  SmallCard,
} from '@freelance/components';
import { filterRight, filterTop } from '@pages/FindJobs/constants';
import { PageBar, PageBarRightSideContainer } from '@pages/FindJobs/styles';
import { useSetFavoritesMutation } from 'redux/services/userApi';
import { FreelancerListItem } from 'redux/types/user.types';

import { talentConsts } from './constants';
import * as St from './styles';
import useFindFreelancers from './useFindFreelancers';
import { currentTab, useFreelancerData } from './useFreelancerData';

const TalentListPage = (): ReactElement => {
  const {
    filterPayload,
    page,
    search,
    take,
    filtersVisibility,
    pageFav,
    pageHired,
    setPageHired,
    setPageFav,
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
    favoritesQuery,
    allFreelancerHanler,
    allHires,
    allHiresHandler,
    hires,
    isHires,
    currentBtnPage,
    getCurrentPagePagination,
  } = useFreelancerData(page, search, take, pageFav, pageHired, filterPayload);
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
  console.log(hires);

  const getTotal = () => {
    if (currentBtnPage === currentTab.favorites) {
      return [favoritesQuery?.favorites] && favoritesQuery?.totalCount;
    }
    if (currentBtnPage === currentTab.hired) {
      return [allHires?.allHiredFreelancers] && allHires?.totalCount;
    }

    return data && data[1];
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
              {t('talent.header')} -{' '}
              {data ? data[talentConsts.secondEl] : talentConsts.firstEl}
            </SecondaryButton>
            <SecondaryButton
              size={talentConsts.largeSize}
              onClick={allHiresHandler}
            >
              {t('talent.allhiresbtn')}
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
            dataSource={
              isHires ? hires.map(el => el.user) : freelancerRenderData
            }
            renderItem={(item: FreelancerListItem) => (
              <St.StyledCard>
                <St.StyledCardHeader>
                  <Row align="middle">
                    <Col span={4}>
                      <Avatar
                        src={`${baseUrl}/${item.profile_image}`}
                        size={profileQ1.avatarBigSize}
                        icon={<UserOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <St.StyledName onClick={() => navFunc(item.id)}>
                        {t('talent.name', {
                          name: item.first_name + ' ' + item.last_name,
                        })}
                      </St.StyledName>
                      {isHires ? (
                        <St.TextExContainer>
                          <St.StyledWhContainer>
                            {t('talent.work_history')}
                          </St.StyledWhContainer>
                          {hires
                            .find(hire => hire.user.id === item.id)
                            ?.jobTitle.map(el => (
                              <p>{el}</p>
                            ))}
                        </St.TextExContainer>
                      ) : (
                        <St.TextExContainer>
                          <ExpandableText>{item.description}</ExpandableText>
                        </St.TextExContainer>
                      )}
                    </Col>
                    <St.StyledRateBox>
                      <Rate
                        onChange={value => onChangeFavorite(item.id, value)}
                        count={talentConsts.starCount}
                        value={
                          item.isFavorite
                            ? talentConsts.true
                            : talentConsts.false
                        }
                      />
                    </St.StyledRateBox>
                  </Row>
                </St.StyledCardHeader>
                <St.SmallCardContainer>
                  {item.position && (
                    <SmallCard
                      width={talentConsts.largeSize}
                      text={t('talent.position', { position: item.position })}
                    />
                  )}

                  {item.category && (
                    <SmallCard
                      width={talentConsts.largeSize}
                      text={t('talent.category', {
                        category: item.category.name,
                      })}
                    />
                  )}
                  {item.available_time && (
                    <SmallCard
                      width={talentConsts.largeSize}
                      text={t('talent.available_time', {
                        available_time: item.available_time,
                      })}
                    />
                  )}
                  {item.hourly_rate && (
                    <SmallCard
                      width={talentConsts.largeSize}
                      text={t('talent.hourly_rate', {
                        hourly_rate: item.hourly_rate + ' $',
                      })}
                    />
                  )}
                  {item.english_level && (
                    <SmallCard
                      width={talentConsts.largeSize}
                      text={t('talent.english_level', {
                        english_level: item.english_level,
                      })}
                    />
                  )}
                </St.SmallCardContainer>
              </St.StyledCard>
            )}
          />
        )}
      </St.Container>
      <St.StyledPagination
        current={getCurrentPagePagination()}
        onChange={page => {
          if (currentBtnPage === currentTab.favorites) {
            setPageFav(page);
          }
          if (currentBtnPage === currentTab.all) {
            setPage(page);
          }
          if (currentBtnPage === currentTab.hired) {
            setPageHired(page);
          }
        }}
        total={getTotal()}
        defaultCurrent={1}
        defaultPageSize={10}
      />
    </>
  );
};

export default TalentListPage;
