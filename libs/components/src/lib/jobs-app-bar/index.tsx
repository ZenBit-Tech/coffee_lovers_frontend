import { useTranslation } from 'react-i18next';

import { ButtonsWrapper, StyledButton } from './styles';

export const JobAppBar = () => {
  const { t } = useTranslation();

  return (
    <ButtonsWrapper size={[16, 24]}>
      <StyledButton>{t('app_bar.nav.jobs')}</StyledButton>
      <StyledButton>{t('app_bar.nav.contracts')}</StyledButton>
      <StyledButton>{t('app_bar.nav.offers')}</StyledButton>
      <StyledButton>{t('app_bar.nav.chat')}</StyledButton>
      <StyledButton>{t('app_bar.nav.my_profile')}</StyledButton>
      <StyledButton>{t('app_bar.nav.log_out')}</StyledButton>
    </ButtonsWrapper>
  );
};

export default JobAppBar;
