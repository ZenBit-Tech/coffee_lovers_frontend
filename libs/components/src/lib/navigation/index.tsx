import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { roles, routes } from '@freelance/components';
import { selectRole } from 'src/redux/auth/auth-slice';
import { logout } from 'src/redux/auth/auth-slice';
import { baseTheme } from 'src/styles/theme';

import { Nav, StyledButton } from './styles';

export function Navigation() {
  const { t } = useTranslation();
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Nav>
      <StyledButton onClick={() => navigate(routes.jobs)}>
        {t('app_bar.nav.jobs')}
      </StyledButton>
      {role === roles.freelancer ? (
        <>
          <StyledButton>{t('app_bar.nav.contracts')}</StyledButton>
          <StyledButton onClick={() => navigate(routes.offers)}>
            {t('app_bar.nav.offers')}
          </StyledButton>
          <StyledButton onClick={() => navigate(routes.freelancerProfile)}>
            {t('app_bar.nav.my_profile')}
          </StyledButton>
        </>
      ) : (
        <>
          <StyledButton>{t('app_bar.nav.projects')}</StyledButton>
          <StyledButton>{t('app_bar.nav.proposals')}</StyledButton>
          <StyledButton onClick={() => navigate(routes.talents)}>
            {t('app_bar.nav.talents')}
          </StyledButton>
        </>
      )}
      <StyledButton theme={baseTheme} onClick={() => navigate(routes.chat)}>
        {t('app_bar.nav.chat')}
      </StyledButton>

      <StyledButton onClick={Logout}>{t('app_bar.nav.log_out')}</StyledButton>
    </Nav>
  );
}

export default Navigation;
