import * as React from 'react';

import { Link } from 'react-router-dom';
import { ExampleButton } from '@freelance/components';
import { Wrapper, Title, Text } from './styles';

import { useGetPokemonByNameQuery } from '../../redux/services/pokemon';
import { useTranslation } from 'react-i18next';

export default function ExampleRootPage() {
  const { t } = useTranslation();

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <Wrapper>
      <Title>{t('description.root page')}</Title>
      <h2>{t('description.Welcome to React')}</h2>
      <Text>{t('description.reusable component')}</Text>
      <ExampleButton
        border="none"
        color="pink"
        height="100px"
        onClick={() => console.log('You clicked on the pink circle!')}
        radius="50%"
        width="100px"
        children={t('description.pink circle')}
      />
      <br></br>
      <br></br>
      <ExampleButton
        border="dotted"
        color="#f5bc42"
        height="100px"
        onClick={() => console.log('You clicked on the orange circle!')}
        radius="50%"
        width="100px"
        children={t('description.orange circle')}
      />
      <br></br>
      <br></br>
      <ExampleButton
        border="dashed"
        color="#fdffc4"
        height="100px"
        onClick={() => console.log('You clicked on the yellow square!')}
        radius="10%"
        width="100px"
        children={t('description.yellow circle')}
      />
      <Wrapper>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <Text>{t('redux.redux-hook-form')}</Text>
            <Title>{data.species.name}</Title>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </Wrapper>
      <Link to="/page-2">{t('router.toPage2')}</Link>
      <Link to='/profile-questions-1'>{t('toProfileQuestions1')}</Link>
    </Wrapper>
  );
}
