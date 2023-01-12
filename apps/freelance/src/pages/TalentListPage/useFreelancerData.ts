import { useEffect, useState } from 'react';
import { useGetAllContractsQuery } from 'redux/contracts/contracts';
import { useGetFreelancerQuery } from 'redux/services/freelancers';
import { useGetFavoritesQuery } from 'redux/services/user';
import { FreelancerListItem, User } from 'redux/types/user.types';

import { talentConsts } from './constants';
import { GetFreelancerParams } from './model';

interface FreelancersHired {
  user: User;
  jobTitle: string[];
}

export enum currentTab {
  all = 'all',
  hired = 'hired',
  favorites = 'favorites',
}

export const useFreelancerData = (
  page: number,
  search: string,
  take: number,
  pageFav: number,
  filterPayload?: GetFreelancerParams,
) => {
  const { data, isLoading } = useGetFreelancerQuery({
    page,
    search,
    take,
    ...filterPayload,
  });
  const [freelancerRenderData, setFreelancerRenderData] = useState<
    FreelancerListItem[]
  >(data ? data[talentConsts.firstEl] : []);
  const [hires, setHires] = useState<FreelancersHired[]>(
    data ? data[talentConsts.firstEl] : [],
  );
  const [isHires, setIsHires] = useState<boolean>(false);
  const [currentBtnPage, setCurrentBtnPage] = useState<currentTab>(
    currentTab.all,
  );
  const { data: favoritesQuery } = useGetFavoritesQuery({
    page: pageFav,
    take,
  });
  const { data: allHires } = useGetAllContractsQuery();

  useEffect(() => {
    if (currentBtnPage === currentTab.all) {
      setFreelancerRenderData(data ? data[talentConsts.firstEl] : []);
    } else if (currentBtnPage === currentTab.favorites) {
      favoritesQuery &&
        setFreelancerRenderData(
          favoritesQuery.favorites.map(el => ({
            ...el.freelancer,
            isFavorite: true,
          })),
        );
    }
  }, [data, favoritesQuery, currentBtnPage]);

  const getCurrentPagePagination = (): number => {
    if (currentBtnPage === currentTab.all) {
      return page;
    } else if (currentBtnPage === currentTab.favorites) {
      return pageFav;
    }

    return talentConsts.defaultPage;
  };

  const favoritesHandler = () => {
    setCurrentBtnPage(currentTab.favorites);
    // if (favoritesQuery) {
    //   setFreelancerRenderData(
    //     favoritesQuery.favorites.map(el => ({...el.freelancer, isFavorite: true})),
    //   );
    // }
    setIsHires(false);
  };
  const allFreelancerHanler = () => {
    if (data) {
      setCurrentBtnPage(currentTab.all);
      // setFreelancerRenderData(data[talentConsts.firstEl]);
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
      setCurrentBtnPage(currentTab.hired);
      setHires(uniqueHiresArr);
      setIsHires(true);
    }
  };

  return {
    isLoading,
    freelancerRenderData,
    favoritesHandler,
    data,
    favoritesQuery,
    allFreelancerHanler,
    allHiresHandler,
    hires,
    isHires,
    currentBtnPage,
    getCurrentPagePagination,
  };
};
