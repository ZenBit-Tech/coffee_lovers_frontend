import { useState } from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Interview, Offer } from 'redux/types/offers.types';

import { defaultSortOptionValue, SortOptions } from './constants';
import { interviews, offers } from './mock-data';
import { getSortOffersCallback } from './utils';

interface UseOfferPageReturn {
  t: TFunction;
  offers?: Offer[];
  interviews?: Interview[];
  isOffersLoading: boolean;
  isInterviewsLoading: boolean;
  sort: SortOptions;
  changeSort: (value: SortOptions) => void;
}

const useOffersPage = (): UseOfferPageReturn => {
  const { t } = useTranslation();
  const [sort, setSort] = useState<SortOptions>(defaultSortOptionValue);
  const isOffersLoading = false;
  const isInterviewsLoading = false;

  const changeSort = (value: SortOptions) => {
    setSort(value);
  };

  return {
    t,
    offers: offers?.sort(getSortOffersCallback(sort)),
    interviews,
    isOffersLoading,
    isInterviewsLoading,
    sort,
    changeSort,
  };
};

export default useOffersPage;
