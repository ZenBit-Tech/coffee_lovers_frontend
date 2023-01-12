import { Favorites, User } from 'redux/types/user.types';

import { talentConsts } from './constants';

export const isFreelancerFav = (
  item: User,
  favorites?: Favorites[],
): number => {
  return favorites?.find(user => user.freelancer.id === item.id)
    ? talentConsts.true
    : talentConsts.false;
};
