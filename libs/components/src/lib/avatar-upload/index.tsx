import { FC } from 'react';
import { Avatar } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';

import { avatarSize, uploadName } from './constants';
import { StyledUpload, StyledUploadLine } from './styles';
import useProfileImage from './useProfileImage';
import { beforeUpload } from './utils';

interface AvatarUploadProps {
  src?: string;
}

export const AvatarUpload: FC<AvatarUploadProps> = ({ src }) => {
  const { t } = useTranslation();
  const { imageUrl, uploadImage } = useProfileImage(src);

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
