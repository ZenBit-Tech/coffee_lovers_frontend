import { useTranslation } from 'react-i18next';
import {
  Filters,
  findJobsPageTestId,
  InputSearch,
  JobCard,
  PrimaryButton,
} from '@freelance/components';
import { getJobDuration } from '@utils/dates';
import { useFindJobsQuery } from 'redux/services/jobsApi';
import { baseTheme } from 'src/styles/theme';

import { fetchLimit, filterRight, filterTop } from './constants';
import {
  ListContainer,
  PageBar,
  PageBarRightSideContainer,
  StyledPagination,
  TitleContainer,
  Wrapper,
} from './styles';
import useFindJobs from './useFindJobs';

const FindJobs = () => {
  const { t } = useTranslation();
  const {
    offset,
    search,
    filterPayload,
    filtersVisibility,
    submitFilter,
    onChangePagination,
    onSearch,
    setFiltersVisibility,
  } = useFindJobs();
  const { data, isLoading } = useFindJobsQuery({
    limit: fetchLimit,
    offset,
    ...filterPayload,
    ...(search && { search }),
  });

  return (
    <Wrapper isLoading={isLoading}>
      <PageBar theme={baseTheme}>
        <TitleContainer theme={baseTheme}>
          <div>{t('findJobs.title')}</div>
          <div data-testid={findJobsPageTestId.totalCount}>
            {data?.meta.totalCount || 0}
          </div>
        </TitleContainer>
        <PageBarRightSideContainer>
          <InputSearch
            placeholder={t('findJobs.searchPlaceholder')}
            onSearch={onSearch}
            data-testid={findJobsPageTestId.inputSearch}
          />
          <PrimaryButton
            onClick={() => setFiltersVisibility(prev => !prev)}
            data-testid={findJobsPageTestId.filterButton}
          >
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

      <ListContainer>
        {data?.jobs.map(item => (
          <JobCard
            key={item.id}
            id={item.id}
            title={item.title || ''}
            description={item.description || t('findJobs.no_description')}
            category={item.category?.name || t('findJobs.no_category')}
            date={new Date(item.created_at)}
            duration={
              getJobDuration(item.duration, item.duration_amount) ||
              t('findJobs.no_duration')
            }
            owner={`${item.owner?.first_name || ''} ${
              item.owner?.last_name || ''
            }`}
            rate={item.hourly_rate || null}
          />
        ))}
      </ListContainer>
      {!isLoading && (
        <StyledPagination
          total={data?.meta.totalCount}
          pageSize={fetchLimit}
          onChange={onChangePagination}
          theme={baseTheme}
        />
      )}
    </Wrapper>
  );
};

export default FindJobs;
