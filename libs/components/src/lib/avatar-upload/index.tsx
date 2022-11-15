import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';

import { avatarSize, uploadName } from './constants';
import { StyledUpload } from './styles';
import { beforeUpload } from './utils';

export const AvatarUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const { t } = useTranslation();

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    setImageUrl('');
  };

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
        onChange={handleChange}
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
