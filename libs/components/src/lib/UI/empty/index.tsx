import { FC } from 'react';
import { Empty as EmptyAntd, EmptyProps } from 'antd';

export const Empty: FC<EmptyProps> = props => {
  return <EmptyAntd image={EmptyAntd.PRESENTED_IMAGE_SIMPLE} {...props} />;
};
