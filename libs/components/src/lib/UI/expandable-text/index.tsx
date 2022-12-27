import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { textRows } from './constants';
import { StyledParagraph } from './styles';

interface ExpandableTextProps {
  children?: ReactNode;
  className?: string;
}

export const ExpandableText: FC<ExpandableTextProps> = ({
  children,
  className,
}) => {
  const { t } = useTranslation();

  return (
    <StyledParagraph
      ellipsis={{
        rows: textRows,
        expandable: true,
        symbol: t('textVisibility.more'),
      }}
      className={className}
    >
      {children}
    </StyledParagraph>
  );
};
