import { GetFavorites, User } from 'redux/types/user.types';

export const isFreelancerFav = (
  item: User,
  favorites?: GetFavorites[],
): number => {
  return favorites?.find(user => user.freelancer.id === item.id) ? 1 : 0;
};
