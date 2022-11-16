import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import ImgCrop from 'antd-img-crop';

import { avatarSize, uploadName } from './constants';
import { StyledUpload } from './styles';
import { beforeUpload, uploadImage } from './utils';

export const AvatarUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { t } = useTranslation();

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
        customRequest={uploadImage(setImageUrl)}
      >
        <Avatar
          icon={<UserOutlined />}
          size={avatarSize}
          src={imageUrl ? imageUrl : null}
        />
      </StyledUpload>
    </ImgCrop>
  );
};

export default AvatarUpload;
