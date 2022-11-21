import { useState } from 'react';
import { Filters } from '@freelance/components';

import { Wrapper } from './styles';

const FindJobs = () => {
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(true);

  return (
    <Wrapper>
      <Filters
        visibility={filtersVisibility}
        closeHandler={() => setFiltersVisibility(false)}
      />
    </Wrapper>
  );
};

export default FindJobs;
