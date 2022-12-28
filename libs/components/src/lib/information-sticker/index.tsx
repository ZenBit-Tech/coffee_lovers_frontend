import { FC, ReactNode } from 'react';
import { baseTheme } from 'src/styles/theme';

import { Container } from './styles';

interface InformationStickerProps {
  children: ReactNode;
  success?: boolean;
  danger?: boolean;
  primary?: boolean;
  'data-testid'?: string;
}

export const InformationSticker: FC<InformationStickerProps> = ({
  children,
  ...props
}) => {
  return (
    <Container theme={baseTheme} {...props}>
      {children}
    </Container>
  );
};
