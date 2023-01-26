import { PostedJobCard } from '@freelance/components';
import { postedJobsTestId } from '@freelance/constants';
import { baseTheme } from 'src/styles/theme';

import { getSortOptions, SortOptions } from './constants';
import {
  JobListContainer,
  PageHeader,
  PageTitle,
  PostJobButton,
  StyledSelect,
  Wrapper,
} from './styles';
import usePostedJobs from './usePostedJobs';

const PostedJobsList = () => {
  const { t, postJobHandler, postedJobs, isJobsLoading, sort, changeSort } =
    usePostedJobs();

  return (
    <Wrapper isLoading={isJobsLoading}>
      <PageHeader>
        <PageTitle theme={baseTheme}>{t('postedJobs.title')}</PageTitle>
        <PostJobButton onClick={postJobHandler}>
          {t('postedJobs.btn.postJob')}
        </PostJobButton>
      </PageHeader>
      <StyledSelect
        options={getSortOptions(t)}
        defaultValue={sort}
        onChange={value => changeSort(value as SortOptions)}
      />
      <JobListContainer>
        {postedJobs?.map(job => (
          <PostedJobCard
            key={job.id}
            id={job.id}
            title={job.title}
            status={job.status}
            description={job.description}
            proposals={job.proposalsCount}
            hired={job.hiresCount}
            data-testid={postedJobsTestId.postedJobCard}
          />
        ))}
      </JobListContainer>
    </Wrapper>
  );
};

export default PostedJobsList;
