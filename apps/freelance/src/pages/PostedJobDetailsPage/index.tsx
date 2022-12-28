import { t } from 'i18next';
import { Empty, HiredCard, InformationSticker } from '@freelance/components';
import { formatDate } from '@utils/dates';

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
  Wrapper,
} from './styles';
import usePostedJobDetail from './usePostedJobDetails';
import { setHiresPagination } from './utils';

const PostedJobDetails = () => {
  const { job, hires, offset, isLoading, onSearch, onChangePagination } =
    usePostedJobDetail();

  return (
    <Wrapper isLoading={isLoading}>
      <StyledTitle>{job?.title}</StyledTitle>

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
          setHiresPagination(hires, offset).map(contract => (
            <HiredCard
              key={contract.id}
              freelancer={contract.offer.freelancer}
              status={contract.status}
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
      <StopHiringButton>
        {t('postedJobDetails.btns.stopHiring')}
      </StopHiringButton>
    </Wrapper>
  );
};

export default PostedJobDetails;
