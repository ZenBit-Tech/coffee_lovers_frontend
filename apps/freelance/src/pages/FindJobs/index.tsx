import { useState } from 'react';
import { Button, List, PaginationProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { FilterFormItems, Filters, JobCard } from '@freelance/components';
import { useFindJobsQuery } from 'redux/services/jobsApi';
import { GetJobParams } from 'redux/types/jobs.types';

import { fetchLimit, filterRight, filterTop } from './constants';
import { PageBar, StyledPagination, TitleContainer, Wrapper } from './styles';
import { getFilterParams } from './utils';

const FindJobs = () => {
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [filterPayload, setFilterPayload] = useState<GetJobParams>();
  const { t } = useTranslation();
  const { data, isLoading } = useFindJobsQuery({
    limit: fetchLimit,
    offset,
    ...filterPayload,
  });

  const submitFilter = (filterData: FilterFormItems) => {
    setFilterPayload(getFilterParams(filterData));
  };

  const onChangePagination: PaginationProps['onChange'] = page => {
    setOffset((page - 1) * fetchLimit);
  };

  return (
    <Wrapper>
      <PageBar>
        <TitleContainer>
          <div>{t('findJobs.title')}</div>
          <div>{data?.meta.totalCount || 0}</div>
        </TitleContainer>
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
