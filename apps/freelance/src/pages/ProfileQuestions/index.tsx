import { Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import {
  FreelancerForm,
  prBarStrColor,
  prBarTrailColor,
  profileQ1,
  ProgressBar,
  routes,
} from '@freelance/components';

import * as St from './styles';

const ProfileQuestions = () => {
  const { t } = useTranslation();

  return (
    <St.Wrapper>
      <div>{t('description.profileQp1.pr_bar_completion_per')}</div>
      <ProgressBar
        percent={profileQ1.prBarProfileQ1Per}
        strokeColor={prBarStrColor}
        trailColor={prBarTrailColor}
      />
      <St.StUserAvatarWrapper>
        <St.StUserIcon />
        <Upload>
          <St.StUserUpBtn icon={<UploadOutlined />}>
            {t('description.profileQp1.upload_profile_photo')}
          </St.StUserUpBtn>
        </Upload>
      </St.StUserAvatarWrapper>
      <FreelancerForm
        submitText={t('description.profileQp1.finish')}
        navigation={routes.findJobs}
      />
    </St.Wrapper>
  );
};

export default ProfileQuestions;
