import { useState } from 'react';
import { PaginationProps } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetPostedJobDetailsQuery } from 'redux/services/jobsApi';
import { HireItem, Job } from 'redux/types/jobs.types';

import { defaultOffset, maxHiredCards } from './constants';
import { getProccesedHires } from './utils';

interface UsePostedJobDetailReturn {
  job?: Job;
  hires?: HireItem[];
  offset: number;
  isLoading: boolean;
  onSearch: (value: string) => void;
  onChangePagination: (page: number, pageSize: number) => void;
}

const usePostedJobDetail = (): UsePostedJobDetailReturn => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostedJobDetailsQuery(id || '');
  const [search, setSearch] = useState<string>();
  const [offset, setOffset] = useState<number>(defaultOffset);

  const onSearch = (value: string) => {
    setSearch(value.trim());
    setOffset(defaultOffset);
  };

  const onChangePagination: PaginationProps['onChange'] = page => {
    setOffset((page - 1) * maxHiredCards);
  };

  return {
    job: data && data.job,
    hires: data && getProccesedHires(data.hires, offset, search),
    offset,
    isLoading,
    onSearch,
    onChangePagination,
  };
};

export default usePostedJobDetail;
