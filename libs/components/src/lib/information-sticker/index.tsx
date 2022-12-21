import { FC, ReactNode } from 'react';

import { Container } from './styles';

interface InformationStickerProps {
  children: ReactNode;
  success?: boolean;
  danger?: boolean;
  primary?: boolean;
}

export const InformationSticker: FC<InformationStickerProps> = ({
  children,
  success,
  danger,
  primary,
}) => {
  return (
    <Container success={success} danger={danger} primary={primary}>
      {children}
    </Container>
  );
};
