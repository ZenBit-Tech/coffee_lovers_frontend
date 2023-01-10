import { useState } from 'react';
import { Modal, PaginationProps } from 'antd';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
import { CheckCircleOutlined } from '@ant-design/icons';
import {
  useGetPostedJobDetailsQuery,
  useStopHiringMutation,
} from 'redux/services/jobsApi';
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
  stopHiringHandler: () => void;
}

const usePostedJobDetail = (): UsePostedJobDetailReturn => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostedJobDetailsQuery(id || '');
  const [stopHiring] = useStopHiringMutation();
  const [search, setSearch] = useState<string>();
  const [offset, setOffset] = useState<number>(defaultOffset);

  const onSearch = (value: string) => {
    setSearch(value.trim());
    setOffset(defaultOffset);
  };

  const onChangePagination: PaginationProps['onChange'] = page => {
    setOffset((page - 1) * maxHiredCards);
  };

  const stopHiringHandler = (): void => {
    if (data) {
      Modal.confirm({
        title: t('postedJobDetails.modal.stopHiring'),
        icon: <CheckCircleOutlined />,
        content: data.job.title,
        okText: t('postedJobDetails.modal.confirm'),
        cancelText: t('postedJobDetails.modal.cancel'),
        onOk() {
          stopHiring(data.job.id);
        },
      });
    }
  };

  return {
    job: data && data.job,
    hires: data && getProccesedHires(data.hires, search),
    offset,
    isLoading,
    onSearch,
    onChangePagination,
    stopHiringHandler,
  };
};

export default usePostedJobDetail;
