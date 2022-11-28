import { Avatar } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';

import { avatarSize, uploadName } from './constants';
import { StyledUpload, StyledUploadLine } from './styles';
import useProfileImage from './useProfileImage';
import { beforeUpload } from './utils';

export const AvatarUpload = () => {
  const { t } = useTranslation();
  const { imageUrl, uploadImage } = useProfileImage();

  return (
    <ImgCrop
      rotate
      shape="round"
      modalTitle={t('uploadImage.crop.title')}
      modalOk={t('uploadImage.crop.okBtn')}
      modalCancel={t('uploadImage.crop.cancelBtn')}
    >
      <StyledUpload
        name={uploadName}
        showUploadList={false}
        beforeUpload={beforeUpload(t)}
        customRequest={uploadImage}
      >
        <Avatar
          icon={<UserOutlined />}
          size={avatarSize}
          src={imageUrl ? imageUrl : null}
        />
        <StyledUploadLine>{t('uploadImage.uploadText')}</StyledUploadLine>
      </StyledUpload>
    </ImgCrop>
  );
};

export default AvatarUpload;
