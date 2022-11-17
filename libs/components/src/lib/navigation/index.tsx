import { useTranslation } from 'react-i18next';

import Button from '../button/button';

import { LinkWrapper, Nav } from './styles';

export function Navigation() {
  const { t } = useTranslation();

  return (
    <Nav>
      <LinkWrapper to="">
        <Button>{t('app_bar.nav.projects')}</Button>
      </LinkWrapper>
      <LinkWrapper to="">
        <Button>{t('app_bar.nav.proposals')}</Button>
      </LinkWrapper>
      <LinkWrapper to="">
        <Button>{t('app_bar.nav.talents')}</Button>
      </LinkWrapper>
      <LinkWrapper to="">
        <Button>{t('app_bar.nav.chat')}</Button>
      </LinkWrapper>
      <LinkWrapper to="">
        <Button>{t('app_bar.nav.my_profile')}</Button>
      </LinkWrapper>
      <LinkWrapper to="">
        <Button>{t('app_bar.nav.log_out')}</Button>
      </LinkWrapper>
    </Nav>
  );
}

export default Navigation;
