import { t } from 'i18next';
import { Empty, HiredCard, InformationSticker } from '@freelance/components';
import { formatDate } from '@utils/dates';
import { JobStatus } from 'redux/types/jobs.types';

import { maxHiredCards } from './constants';
import {
  DescriptionContainer,
  HiresBar,
  HiresContainer,
  HiresTitle,
  InformationContainer,
  StopHiringButton,
  StyledInputSearch,
  StyledPagination,
  StyledTitle,
  TitleContainer,
  Wrapper,
} from './styles';
import usePostedJobDetail from './usePostedJobDetails';
import { setHiresPagination } from './utils';

const PostedJobDetails = () => {
  const {
    job,
    hires,
    offset,
    isLoading,
    onSearch,
    onChangePagination,
    stopHiringHandler,
  } = usePostedJobDetail();

  return (
    <Wrapper isLoading={isLoading}>
      <TitleContainer>
        <StyledTitle>{job?.title}</StyledTitle>
        {job?.status === JobStatus.PENDING && (
          <InformationSticker>
            {t('postedJobs.status.pending')}
          </InformationSticker>
        )}

        {job?.status === JobStatus.IN_PROGRESS && (
          <InformationSticker success>
            {t('postedJobs.status.inProgress')}
          </InformationSticker>
        )}

        {job?.status === JobStatus.FINISHED && (
          <InformationSticker primary>
            {t('postedJobs.status.finished')}
          </InformationSticker>
        )}
      </TitleContainer>

      <InformationContainer>
        {job?.created_at && (
          <InformationSticker>{`${t('postedJobDetails.created')} ${formatDate(
            new Date(job?.created_at),
          )}`}</InformationSticker>
        )}
        {job?.category && (
          <InformationSticker>{job.category.name}</InformationSticker>
        )}
        {job?.duration && job.duration_amount && (
          <InformationSticker>
            {`${t('postedJobDetails.duration')} ${job.duration} (${
              job.duration_amount
            })`}
          </InformationSticker>
        )}
        {job?.hourly_rate && (
          <InformationSticker>
            {t('postedJobDetails.hrlyRate', { rate: job.hourly_rate })}
          </InformationSticker>
        )}
        {job?.available_time && (
          <InformationSticker>{job.available_time}</InformationSticker>
        )}
        {job?.english_level && (
          <InformationSticker>{`${t('postedJobDetails.englishLevel')} ${
            job.english_level
          }`}</InformationSticker>
        )}
      </InformationContainer>

      {job?.skills?.length && (
        <InformationContainer>
          {job.skills.map(skill => (
            <InformationSticker key={skill.id}>{skill.name}</InformationSticker>
          ))}
        </InformationContainer>
      )}

      {job?.description && (
        <DescriptionContainer>{job?.description}</DescriptionContainer>
      )}

      <HiresBar>
        <HiresTitle>{t('postedJobDetails.hires')}</HiresTitle>
        <StyledInputSearch
          placeholder={t('postedJobDetails.inputSearchPlaceholder')}
          onSearch={onSearch}
        />
      </HiresBar>
      <HiresContainer>
        {hires &&
          setHiresPagination(hires, offset).map(hire => (
            <HiredCard
              key={hire.contract.id}
              freelancer={hire.freelancer}
              contract={hire.contract}
              job={job}
            />
          ))}
        {!hires?.length && (
          <Empty description={t('postedJobDetails.noHires')} />
        )}
      </HiresContainer>
      {hires && hires.length > maxHiredCards && (
        <StyledPagination
          total={hires.length}
          pageSize={maxHiredCards}
          onChange={onChangePagination}
        />
      )}
      {job?.status !== JobStatus.FINISHED && (
        <StopHiringButton onClick={stopHiringHandler}>
          {t('postedJobDetails.btns.stopHiring')}
        </StopHiringButton>
      )}
    </Wrapper>
  );
};

export default PostedJobDetails;
