import { FC } from 'react';
import { Avatar as AntdAvatar, AvatarProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { defaultAvatarSize } from './constants';

export const Avatar: FC<AvatarProps> = props => {
  return (
    <AntdAvatar icon={<UserOutlined />} size={defaultAvatarSize} {...props} />
  );
};
