import { useEffect, useState } from 'react';
import { useSetProfileImageMutation } from 'src/redux/services/user';

import { uploadName } from './constants';
import { CustomRequestOptions } from './types';

interface useProfileImageReturn {
  imageUrl: string;
  uploadImage: (options: CustomRequestOptions) => void;
}

const useProfileImage = (): useProfileImageReturn => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [setProfileImage, { data }] = useSetProfileImageMutation();

  const uploadImage = (options: CustomRequestOptions): void => {
    const { file } = options;
    const formData = new FormData();
    formData.append(uploadName, file);
    setProfileImage(formData);
  };

  useEffect(() => {
    if (data?.file) {
      setImageUrl(`${process.env['NX_API_URL']}/${data.file}`);
    }
  }, [data]);

  return {
    imageUrl,
    uploadImage,
  };
};

export default useProfileImage;
