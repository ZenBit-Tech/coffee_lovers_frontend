import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface LogoProps {}

export function Logo(props: LogoProps) {
  const { t } = useTranslation();

  return <p>{t('app_bar.logo')}</p>;
}

export default Logo;
