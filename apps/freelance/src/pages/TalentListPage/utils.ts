import { GetFavorites, User } from 'redux/types/user.types';

import { talentConsts } from './constants';

export const isFreelancerFav = (
  item: User,
  favorites?: GetFavorites[],
): number => {
  return favorites?.find(user => user.freelancer.id === item.id)
    ? talentConsts.true
    : talentConsts.false;
};
