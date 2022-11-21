import { useState } from 'react';
import { Filters } from '@freelance/components';
import useProperties from '@hooks/useProperties';

import { Wrapper } from './styles';

const FindJobs = () => {
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const { categories } = useProperties();

  return (
    <Wrapper>
      <Filters
        visibility={filtersVisibility}
        closeHandler={() => setFiltersVisibility(false)}
      />
      {categories.map(item => (
        <div>{item.name}</div>
      ))}
    </Wrapper>
  );
};

export default FindJobs;
