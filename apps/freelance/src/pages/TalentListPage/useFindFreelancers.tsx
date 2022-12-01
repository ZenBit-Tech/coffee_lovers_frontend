import { Dispatch, SetStateAction, useState } from 'react';
import { FilterFormItems } from '@freelance/components';
import { defaultOffset } from '@pages/FindJobs/constants';
import { getFilterParams } from '@pages/FindJobs/utils';

import { GetFreelancerParams } from './model';

interface useFindFreelancersReturn {
  offset: number;
  filterPayload: GetFreelancerParams | undefined;
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
  const [offset, setOffset] = useState<number>(0);
  const [filterPayload, setFilterPayload] = useState<GetFreelancerParams>({});
  const [search, setSearch] = useState<string>('');
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [take, setTake] = useState<number>(10);

  const submitFilter = (filterData: FilterFormItems) => {
    setOffset(defaultOffset);
    setFilterPayload(getFilterParams(filterData));
  };

  const onSearch = (value: string) => {
    setOffset(defaultOffset);
    setSearch(value.trim());
  };

  return {
    offset,
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
