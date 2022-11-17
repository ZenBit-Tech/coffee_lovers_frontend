import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetPokemonByNameQuery } from 'redux/services/pokemon';

import { Text, Title, Wrapper } from './styles';

export default function ExampleRootPage() {
  const { t } = useTranslation();

  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');

  return (
    <Wrapper>
      <Title>{t('description.root_page')}</Title>
      <h2>{t('description.welcome_to_react')}</h2>
      <Text>{t('description.reusable_component')}</Text>
      <Text>{t('learnReact')}</Text>

      <Wrapper>
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data ? (
          <>
            <Text>{t('redux.redux_hook_form')}</Text>
            <Title>{data.species.name}</Title>
            <img src={data.sprites.front_shiny} alt={data.species.name} />
          </>
        ) : null}
      </Wrapper>
      <Link to="/page-2">{t('router.toPage2')}</Link>
      <Link to="/profile-questions-1">
        {t('description.router.toProfileQuestions1')}
      </Link>
    </Wrapper>
  );
}
