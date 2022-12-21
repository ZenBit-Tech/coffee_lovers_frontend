import { FilterFormItems } from '@freelance/components';
import { GetFreelancerParams } from '@pages/TalentListPage/model';
import { GetJobParams } from 'redux/types/jobs.types';

export const getFilterParams = (
  filter: FilterFormItems,
): GetFreelancerParams => {
  const params: GetJobParams = {};

  if (filter.timeAvailable) params.available_time = filter.timeAvailable;

  if (filter.englishLevel) params.english_level = filter.englishLevel;

  if (filter.hrlyRateStart) params.hourly_rate_start = filter.hrlyRateStart;

  if (filter.hrlyRateEnd) params.hourly_rate_end = filter.hrlyRateEnd;

  if (filter.categories) params.categories = filter.categories;

  if (filter.skills) params.skills = filter.skills;

  return params;
};
