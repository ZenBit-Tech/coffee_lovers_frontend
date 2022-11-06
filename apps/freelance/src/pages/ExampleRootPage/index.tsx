import * as React from 'react';

import { Link } from 'react-router-dom';
import { ExampleButton } from '@freelance/components';
import { Wrapper, Title, Text } from './styles';

import { useGetPokemonByNameQuery } from '../../redux/services/pokemon';

export default function ExampleRootPage() {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <Wrapper>
      <Title>This is root route</Title>
      <Text>This is the example of reusable component.</Text>
      <ExampleButton
        border="none"
        color="pink"
        height="200px"
        onClick={() => console.log('You clicked on the pink circle!')}
        radius="50%"
        width="200px"
        children="I'm a pink circle!"
      />
      <br></br>
      <br></br>

      <ExampleButton
        border="dotted"
        color="#f5bc42"
        height="200px"
        onClick={() => console.log('You clicked on the orange circle!')}
        radius="50%"
        width="200px"
        children="I'm an orange circle!"
      />
      <br></br>
      <br></br>
      <ExampleButton
        border="dashed"
        color="#fdffc4"
        height="200px"
        onClick={() => console.log('You clicked on the yellow square!')}
        radius="10%"
        width="200px"
        children="I'm a yellow square!"
      />
      <Wrapper>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <Text>This is the example of redux-hook-form</Text>
            <Title>{data.species.name}</Title>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </Wrapper>
      <Link to="/page-2">Click here for page 2.</Link>
    </Wrapper>
  );
}
