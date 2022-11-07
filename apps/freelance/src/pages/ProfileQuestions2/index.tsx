import { useTranslation } from 'react-i18next';

const ProfileQuestions2 = () => {
  const { t } = useTranslation();
  return (
    <div>{t('description.profile p2 completion per')}</div>
  )
}

export default ProfileQuestions2