import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'src/redux/auth/auth-slice';

import { ButtonsWrapper, StyledButton } from './styles';

export const JobAppBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Logout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <ButtonsWrapper size={[16, 24]}>
      <StyledButton>{t('app_bar.nav.jobs')}</StyledButton>
      <StyledButton>{t('app_bar.nav.contracts')}</StyledButton>
      <StyledButton>{t('app_bar.nav.offers')}</StyledButton>
      <StyledButton>{t('app_bar.nav.chat')}</StyledButton>
      <StyledButton>{t('app_bar.nav.my_profile')}</StyledButton>
      <StyledButton onClick={Logout}>{t('app_bar.nav.log_out')}</StyledButton>
    </ButtonsWrapper>
  );
};

export default JobAppBar;
