import { Link } from 'react-router-dom';
import { Button } from '../../components/example-button';
import { Wrapper, Title, Text } from './styles';

import { useGetPokemonByNameQuery } from '../../redux/services/pokemon';

export default function ExampleRootPage() {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <Wrapper>
      <Title>This is root route</Title>
      <Text>This is the example of reusable component.</Text>

      <Wrapper>
        <Button>Reusable component </Button>
        <Button color="secondary">Click it!</Button>
        <Button color="secondary" disabled={true}>
          This one disabled!
        </Button>
      </Wrapper>

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
