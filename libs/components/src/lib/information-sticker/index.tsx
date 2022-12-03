import { FC, ReactNode } from 'react';

import { Container } from './styles';

interface InformationStickerProps {
  children: ReactNode;
}

export const InformationSticker: FC<InformationStickerProps> = ({
  children,
}) => {
  return <Container>{children}</Container>;
};
