import { t } from 'i18next';
import { Empty, HiredCard, InformationSticker } from '@freelance/components';
import { formatDate } from '@utils/dates';

import {
  DescriptionContainer,
  HiresContainer,
  HiresTitle,
  InformationContainer,
  StopHiringButton,
  StyledTitle,
  Wrapper,
} from './styles';
import usePostedJobDetail from './usePostedJobDetails';

const PostedJobDetails = () => {
  const { details, isLoading } = usePostedJobDetail();

  return (
    <Wrapper isLoading={isLoading}>
      <StyledTitle>{details?.job.title}</StyledTitle>

      <InformationContainer>
        {details?.job.created_at && (
          <InformationSticker>{`${t('postedJobDetails.created')} ${formatDate(
            new Date(details.job.created_at),
          )}`}</InformationSticker>
        )}
        {details?.job.category && (
          <InformationSticker>{details.job.category.name}</InformationSticker>
        )}
        {details?.job.duration && details.job.duration_amount && (
          <InformationSticker>
            {`${t('postedJobDetails.duration')} ${details.job.duration} (${
              details.job.duration_amount
            })`}
          </InformationSticker>
        )}
        {details?.job.hourly_rate && (
          <InformationSticker>
            {t('postedJobDetails.hrlyRate', { rate: details.job.hourly_rate })}
          </InformationSticker>
        )}
        {details?.job.available_time && (
          <InformationSticker>{details.job.available_time}</InformationSticker>
        )}
        {details?.job.english_level && (
          <InformationSticker>{`${t('postedJobDetails.englishLevel')} ${
            details.job.english_level
          }`}</InformationSticker>
        )}
      </InformationContainer>

      {details?.job.skills?.length && (
        <InformationContainer>
          {details?.job.skills?.map(skill => (
            <InformationSticker key={skill.id}>{skill.name}</InformationSticker>
          ))}
        </InformationContainer>
      )}

      {details?.job.description && (
        <DescriptionContainer>{details.job.description}</DescriptionContainer>
      )}

      <HiresTitle>{t('postedJobDetails.hires')}</HiresTitle>
      <HiresContainer>
        {details?.hires.map(contract => (
          <HiredCard
            key={contract.id}
            freelancer={contract.offer.freelancer}
            status={contract.status}
          />
        ))}
        {!details?.hires.length && (
          <Empty description={t('postedJobDetails.noHires')} />
        )}
      </HiresContainer>
      <StopHiringButton>
        {t('postedJobDetails.btns.stopHiring')}
      </StopHiringButton>
    </Wrapper>
  );
};

export default PostedJobDetails;
