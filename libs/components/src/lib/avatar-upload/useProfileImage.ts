import { useEffect, useState } from 'react';
import { useSetProfileImageMutation } from 'src/redux/services/user';
import { getFileUrl } from 'src/utils/api';

import { uploadName } from './constants';
import { CustomRequestOptions } from './types';

interface useProfileImageReturn {
  imageUrl: string;
  uploadImage: (options: CustomRequestOptions) => void;
}

const useProfileImage = (src?: string): useProfileImageReturn => {
  const [imageUrl, setImageUrl] = useState<string>(src || '');
  const [setProfileImage, { data }] = useSetProfileImageMutation();

  useEffect(() => {
    if (data?.file) {
      setImageUrl(getFileUrl(data.file));
    }
  }, [data]);

  useEffect(() => {
    setImageUrl(src || '');
  }, [src]);

  const uploadImage = (options: CustomRequestOptions): void => {
    const { file } = options;
    const formData = new FormData();
    formData.append(uploadName, file);
    setProfileImage(formData);
  };

  return {
    imageUrl,
    uploadImage,
  };
};

export default useProfileImage;
