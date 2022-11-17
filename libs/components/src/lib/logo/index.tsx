import { useTranslation } from 'react-i18next';

export function Logo() {
  const { t } = useTranslation();

  return <p>{t('app_bar.logo')}</p>;
}

export default Logo;
