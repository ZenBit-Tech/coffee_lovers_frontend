import { Button, Input, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { Filters, JobCard } from '@freelance/components';
import { useFindJobsQuery } from 'redux/services/jobsApi';

import { fetchLimit, filterRight, filterTop } from './constants';
import {
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
    submitFilter,
    onChangePagination,
    onSearch,
    filtersVisibility,
    setFiltersVisibility,
  } = useFindJobs();
  const { data, isLoading } = useFindJobsQuery({
    limit: fetchLimit,
    offset,
    ...filterPayload,
    ...(search && { search }),
  });

  return (
    <Wrapper>
      <PageBar>
        <TitleContainer>
          <div>{t('findJobs.title')}</div>
          <div>{data?.meta.totalCount || 0}</div>
        </TitleContainer>
        <PageBarRightSideContainer>
          <Input.Search
            placeholder={t('findJobs.searchPlaceholder')}
            onSearch={onSearch}
          />
          <Button
            type="primary"
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

      <List
        dataSource={data?.jobs}
        renderItem={item => (
          <List.Item>
            <JobCard
              key={item.id}
              title={item.title || ''}
              description={item.description || t('findJobs.no_description')}
              category={item.category?.name || t('findJobs.no_category')}
              date={new Date(item.created_at)}
              duration={t('findJobs.no_duration')}
              owner={`${item.owner?.first_name || ''} ${
                item.owner?.last_name || ''
              }`}
              rate={item.hourly_rate || null}
            />
          </List.Item>
        )}
        loading={isLoading}
      />
      {!isLoading && (
        <StyledPagination
          total={data?.meta.totalCount}
          pageSize={fetchLimit}
          onChange={onChangePagination}
        />
      )}
    </Wrapper>
  );
};

export default FindJobs;
