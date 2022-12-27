import { FC, ReactNode } from 'react';
import { baseTheme } from 'src/styles/theme';

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
    <Container
      success={success}
      danger={danger}
      primary={primary}
      theme={baseTheme}
    >
      {children}
    </Container>
  );
};
