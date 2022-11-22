import { useState } from 'react';
import { Button, List } from 'antd';
import { useTranslation } from 'react-i18next';
import { Filters, JobCard } from '@freelance/components';

import { filterRight, filterTop, jobsList } from './constants';
import { PageBar, StyledPagination, TitleContainer, Wrapper } from './styles';

const FindJobs = () => {
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <Wrapper>
      <PageBar>
        <TitleContainer>
          <div>{t('findJobs.title')}</div>
          <div>{jobsList.length}</div>
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
          top={filterTop}
          right={filterRight}
        />
      </PageBar>

      <List
        dataSource={jobsList}
        renderItem={item => (
          <List.Item>
            <JobCard
              key={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              date={item.date}
              duration={item.duration}
              owner={`${item.owner.first_name} ${item.owner.last_name}`}
              rate={item.rate}
            />
          </List.Item>
        )}
      />

      <StyledPagination />
    </Wrapper>
  );
};

export default FindJobs;
