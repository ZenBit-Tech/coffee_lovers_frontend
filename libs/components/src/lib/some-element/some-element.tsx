import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Title1, Title2 } from './styles';
import { Title } from './styles';

/* eslint-disable-next-line */
export interface SomeElementProps {}

const StyledSomeElement = styled.div`
  /* color: pink; */
`;

/* eslint-disable-next-line */
export function SomeElement(props: SomeElementProps) {
  const { t } = useTranslation();

  return (
    <StyledSomeElement>
      <Title>{t('description.some-element.title')}</Title>
      <div>
        <Title1>{t('description.some-element.title')}</Title1>
        <Title2>{t('description.some-element.title')}</Title2>
      </div>
    </StyledSomeElement>
  );
}

export default SomeElement;
