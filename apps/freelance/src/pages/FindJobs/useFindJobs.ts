import { Dispatch, SetStateAction, useState } from 'react';
import { PaginationProps } from 'antd';
import { FilterFormItems } from '@freelance/components';
import { GetJobParams } from 'redux/types/jobs.types';

import { defaultOffset, fetchLimit } from './constants';
import { getFilterParams } from './utils';

interface useFindJobsReturn {
  offset: number;
  filterPayload: GetJobParams | undefined;
  search: string | undefined;
  filtersVisibility: boolean;
  setFiltersVisibility: Dispatch<SetStateAction<boolean>>;
  submitFilter: (filterData: FilterFormItems) => void;
  onChangePagination: (page: number, pageSize: number) => void;
  onSearch: (value: string) => void;
}

const useFindJobs = (): useFindJobsReturn => {
  const [offset, setOffset] = useState<number>(0);
  const [filterPayload, setFilterPayload] = useState<GetJobParams>();
  const [search, setSearch] = useState<string>();
  const [filtersVisibility, setFiltersVisibility] = useState<boolean>(false);

  const submitFilter = (filterData: FilterFormItems) => {
    setOffset(defaultOffset);
    setFilterPayload(getFilterParams(filterData));
  };

  const onChangePagination: PaginationProps['onChange'] = page => {
    setOffset((page - 1) * fetchLimit);
  };

  const onSearch = (value: string) => {
    setOffset(defaultOffset);
    setSearch(value.trim());
  };

  return {
    offset,
    filterPayload,
    search,
    filtersVisibility,
    setFiltersVisibility,
    submitFilter,
    onChangePagination,
    onSearch,
  };
};

export default useFindJobs;
