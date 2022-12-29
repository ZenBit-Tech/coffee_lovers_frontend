import { Offer } from 'redux/types/request.types';

import { offerStatusPriority, SortOptions } from './constants';

export const getSortOffersCallback = (
  sort: SortOptions,
): ((a: Offer, b: Offer) => number) => {
  switch (sort) {
    case SortOptions.HRLY_RATE:
      return (a: Offer, b: Offer) => {
        return b.hourly_rate - a.hourly_rate;
      };
    default:
      return (a: Offer, b: Offer) => {
        return offerStatusPriority[a.status] - offerStatusPriority[b.status];
      };
  }
};
