import { FC } from 'react';
import { TFunction } from 'i18next';
import { OfferInterviewCard } from '@freelance/components';
import { Interview, Offer } from 'redux/types/request.types';

import { getSortOptions, SortOptions } from './constants';
import { OfferList, OfferWrapper, StyledSelect } from './styles';

interface TabProps {
  offers?: Offer[];
  interviews?: Interview[];
  isOffersLoading?: boolean;
  isInterviewsLoading?: boolean;
  t?: TFunction;
  sort?: SortOptions;
  changeSort?: (value: SortOptions) => void;
}

const Tab: FC<TabProps> = ({
  offers,
  interviews,
  isOffersLoading,
  isInterviewsLoading,
  t,
  sort,
  changeSort,
}) => {
  return (
    <OfferWrapper isLoading={isOffersLoading || isInterviewsLoading}>
      {sort && changeSort && t && (
        <StyledSelect
          options={getSortOptions(t)}
          defaultValue={sort}
          onChange={value => changeSort(value as SortOptions)}
        />
      )}
      <OfferList>
        {offers?.map(offer => (
          <OfferInterviewCard key={offer.id} offer={offer} />
        ))}
        {interviews?.map(interview => (
          <OfferInterviewCard key={interview.id} interview={interview} />
        ))}
      </OfferList>
    </OfferWrapper>
  );
};

export default Tab;
