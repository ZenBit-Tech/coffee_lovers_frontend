import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { roles, routes } from '@freelance/components';
import { logout, selectRole } from 'src/redux/auth/auth-slice';
import { useGetUserInfoQuery } from 'src/redux/services/user';
import { User } from 'src/redux/types/user.types';

interface BarLink {
  text: string;
  action: () => void;
}

interface UseNavigationBarReturn {
  user?: User;
  links: BarLink[];
  t: TFunction;
}

const useNavigationBar = (): UseNavigationBarReturn => {
  const { data: user } = useGetUserInfoQuery();
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(logout());
    navigate(routes.login);
  };

  return {
    user,
    links: [
      { text: t('app_bar.nav.jobs'), action: () => navigate(routes.jobs) },
      ...(role === roles.freelancer
        ? [
            { text: t('app_bar.nav.contracts'), action: () => ({}) },
            {
              text: t('app_bar.nav.offers'),
              action: () => navigate(routes.offers),
            },
            {
              text: t('app_bar.nav.my_profile'),
              action: () => navigate(routes.freelancerProfile),
            },
          ]
        : [
            { text: t('app_bar.nav.projects'), action: () => ({}) },
            { text: t('app_bar.nav.proposals'), action: () => ({}) },
            {
              text: t('app_bar.nav.talents'),
              action: () => navigate(routes.talents),
            },
          ]),
      { text: t('app_bar.nav.chat'), action: () => navigate(routes.chat) },
      { text: t('app_bar.nav.log_out'), action: Logout },
    ],
    t,
  };
};

export default useNavigationBar;
