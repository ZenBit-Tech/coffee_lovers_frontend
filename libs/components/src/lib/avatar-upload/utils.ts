import type { RcFile } from 'antd/es/upload/interface';
import { TFunction } from 'i18next';

import { fileSize } from './constants';
import { FileTypes } from './types';

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

export const getBase64 = (
  img: RcFile,
  callback: (url: string) => void,
): void => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};
