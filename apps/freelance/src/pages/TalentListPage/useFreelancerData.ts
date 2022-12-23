import { useEffect, useState } from 'react';
import { useGetFreelancerQuery } from 'redux/services/freelancers';
import { useGetFavoritesQuery } from 'redux/services/user';
import { User } from 'redux/types/user.types';

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
    data ? data[0] : [],
  );
  const { data: favorites } = useGetFavoritesQuery();

  useEffect(() => {
    setFreelancerRenderData(data ? data[0] : []);
  }, [data]);

  const favoritesHandler = () => {
    if (favorites) {
      setFreelancerRenderData(favorites.map(el => el.freelancer));
    }
  };
  const allFreelancerHanler = () => {
    if (data) {
      setFreelancerRenderData(data[0]);
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
