import { useEffect, useState } from 'react';
import { useSetProfileImageMutation } from 'src/redux/services/user';

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
      setImageUrl(`${process.env['NX_API_URL']}/${data.file}`);
    }
  }, [data]);

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
