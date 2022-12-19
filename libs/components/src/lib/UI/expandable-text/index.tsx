import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { textRows } from './constants';
import { StyledParagraph } from './styles';

interface ExpandableTextProps {
  children?: ReactNode;
}

export const ExpandableText: FC<ExpandableTextProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <StyledParagraph
      ellipsis={{
        rows: textRows,
        expandable: true,
        symbol: t('textVisibility.more'),
      }}
    >
      {children}
    </StyledParagraph>
  );
};
