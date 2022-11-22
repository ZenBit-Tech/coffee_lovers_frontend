import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filters } from '@freelance/components';

import { TitleContainer, Wrapper } from './styles';

const FindJobs = () => {
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Filters
        visibility={filtersVisibility}
        closeHandler={() => setFiltersVisibility(false)}
      />

      <TitleContainer>{t('findJobs.title')}</TitleContainer>
    </Wrapper>
  );
};

export default FindJobs;
