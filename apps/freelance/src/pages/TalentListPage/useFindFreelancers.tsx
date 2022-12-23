import { Dispatch, SetStateAction, useState } from 'react';
import { FilterFormItems } from '@freelance/components';
import { getFilterParams } from '@pages/FindJobs/utils';

import { defaultPage, takeItems } from './constants';
import { GetFreelancerParams } from './model';

interface useFindFreelancersReturn {
  filterPayload?: GetFreelancerParams;
  search: string;
  filtersVisibility: boolean;
  page: number;
  take: number;
  setFiltersVisibility: Dispatch<SetStateAction<boolean>>;
  setPage: (page: number) => void;
  setTake: (take: number) => void;
  submitFilter: (filterData: FilterFormItems) => void;
  onSearch: (value: string) => void;
}

const useFindFreelancers = (): useFindFreelancersReturn => {
  const [filterPayload, setFilterPayload] = useState<GetFreelancerParams>({});
  const [search, setSearch] = useState<string>('');
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const [page, setPage] = useState<number>(defaultPage);
  const [take, setTake] = useState<number>(takeItems);

  const submitFilter = (filterData: FilterFormItems) => {
    setFilterPayload(getFilterParams(filterData));
  };

  const onSearch = (value: string) => {
    setSearch(value.trim());
  };

  return {
    filterPayload,
    search,
    page,
    take,
    filtersVisibility,
    setFiltersVisibility,
    submitFilter,
    onSearch,
    setPage,
    setTake,
  };
};

export default useFindFreelancers;
