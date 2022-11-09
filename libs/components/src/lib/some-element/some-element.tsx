import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title } from './styles';

/* eslint-disable-next-line */
export interface SomeElementProps {}

const StyledSomeElement = styled.div`
  color: pink;
`;

/* eslint-disable-next-line */
export function SomeElement(props: SomeElementProps) {
  const { t } = useTranslation();

  return (
    <StyledSomeElement>
      <Title>{t('description.some-element.title')}</Title>
    </StyledSomeElement>
  );
}

export default SomeElement;
