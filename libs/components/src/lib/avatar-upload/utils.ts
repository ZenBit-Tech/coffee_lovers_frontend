import type { RcFile } from 'antd/es/upload/interface';
import { TFunction } from 'i18next';

import { fileSize, uploadName } from './constants';
import { CustomRequestOptions, FileTypes } from './types';

export const beforeUpload = (t: TFunction): ((file: RcFile) => boolean) => {
  return (file: RcFile): boolean => {
    const isFormat =
      file.type === FileTypes.JPEG || file.type === FileTypes.PNG;
    if (!isFormat) {
      alert(t('uploadImage.errors.type'));
    }
    const isSize = file.size < fileSize;
    if (!isSize) {
      alert(t('uploadImage.errors.size'));
    }

    return isFormat && isSize;
  };
};

export const uploadImage = (
  setImageUrl: (url: string) => void,
): ((options: CustomRequestOptions) => void) => {
  return (options: CustomRequestOptions): void => {
    const { file } = options;
    const formData = new FormData();
    formData.append(uploadName, file);
    setImageUrl('');
  };
};
