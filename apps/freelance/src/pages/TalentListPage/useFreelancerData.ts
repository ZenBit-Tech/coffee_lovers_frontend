import { useEffect, useState } from 'react';
import { useGetFreelancerQuery } from 'redux/services/userApi';
import { useGetFavoritesQuery } from 'redux/services/userApi';
import { User } from 'redux/types/user.types';

import { talentConsts } from './constants';
import { GetFreelancerParams } from './model';

export const useFreelancerData = (
  page: number,
  search: string,
  take: number,
  filterPayload?: GetFreelancerParams,
) => {
  const { data, isLoading } = useGetFreelancerQuery({
    page,
    search,
    take,
    ...filterPayload,
  });
  const [freelancerRenderData, setFreelancerRenderData] = useState<User[]>(
    data ? data[talentConsts.firstEl] : [],
  );
  const { data: favorites } = useGetFavoritesQuery();

  useEffect(() => {
    setFreelancerRenderData(data ? data[talentConsts.firstEl] : []);
  }, [data]);

  const favoritesHandler = () => {
    if (favorites) {
      setFreelancerRenderData(favorites.map(el => el.freelancer));
    }
  };
  const allFreelancerHanler = () => {
    if (data) {
      setFreelancerRenderData(data[talentConsts.firstEl]);
    }
  };

  return {
    isLoading,
    freelancerRenderData,
    favoritesHandler,
    data,
    favorites,
    allFreelancerHanler,
  };
};
