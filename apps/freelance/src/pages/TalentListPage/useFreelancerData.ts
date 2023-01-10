import { useEffect, useState } from 'react';
import { useGetAllContractsQuery } from 'redux/contracts/contracts';
import { useGetFreelancerQuery } from 'redux/services/freelancers';
import { useGetFavoritesQuery } from 'redux/services/user';
import { User } from 'redux/types/user.types';

import { talentConsts } from './constants';
import { GetFreelancerParams } from './model';

interface FreelancersHired {
  user: User;
  jobTitle: string[];
}

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
  const [hires, setHires] = useState<FreelancersHired[]>(
    data ? data[talentConsts.firstEl] : [],
  );
  const [isHires, setIsHires] = useState<boolean>(false);
  const { data: favorites } = useGetFavoritesQuery();
  const { data: allHires } = useGetAllContractsQuery();

  useEffect(() => {
    setFreelancerRenderData(data ? data[talentConsts.firstEl] : []);
  }, [data]);

  const favoritesHandler = () => {
    if (favorites) {
      setFreelancerRenderData(favorites.map(el => el.freelancer));
    }
    setIsHires(false);
  };
  const allFreelancerHanler = () => {
    if (data) {
      setFreelancerRenderData(data[talentConsts.firstEl]);
    }
    setIsHires(false);
  };
  const allHiresHandler = () => {
    if (allHires) {
      const uniqueHiresArr: FreelancersHired[] = [];
      allHires.forEach(el => {
        const index = uniqueHiresArr.findIndex(
          element => el.offer.freelancer.id === element.user.id,
        );
        if (index === -1) {
          uniqueHiresArr.push({
            user: el.offer.freelancer,
            jobTitle: el.offer.job.title ? [el.offer.job.title] : [],
          });
        } else {
          if (el.offer.job.title) {
            uniqueHiresArr[index].jobTitle.push(el.offer.job.title);
          }
        }
      });
      setHires(uniqueHiresArr);
      setIsHires(true);
    }
  };

  return {
    isLoading,
    freelancerRenderData,
    favoritesHandler,
    data,
    favorites,
    allFreelancerHanler,
    allHiresHandler,
    hires,
    isHires,
  };
};
