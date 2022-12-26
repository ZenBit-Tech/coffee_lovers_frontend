import { TFunction } from 'i18next';
import { OfferStatus } from 'redux/types/request.types';

export enum TabKeys {
  OFFERS = 'offers',
  INTERVIEWS = 'interviews',
}

export enum SortOptions {
  STATUS = 'status',
  HRLY_RATE = 'hrly_rate',
}

export const offerStatusPriority = {
  [OfferStatus.PENDING]: 1,
  [OfferStatus.ACCEPTED]: 2,
  [OfferStatus.DECLINED]: 3,
};

export const getSortOptions = (t: TFunction) => {
  return [
    { value: SortOptions.STATUS, label: t('offers.sortOptions.status') },
    { value: SortOptions.HRLY_RATE, label: t('offers.sortOptions.hrlyRate') },
  ];
};

export const defaultSortOptionValue = SortOptions.STATUS;
