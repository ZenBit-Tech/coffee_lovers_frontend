import { Link } from 'react-router-dom';
import { Button } from '../../components/example-button';
import { Wrapper, Title, Text } from './styles';

export default function ExampleRootPage() {
  return (
    <Wrapper>
      <Title>This is root route</Title>
      <Text>This is the generated root route.</Text>

      <Wrapper>
        <Button>Reusable component </Button>
        <Button color="secondary">Click it!</Button>
        <Button color="secondary" disabled={true}>
          This one disabled!
        </Button>
      </Wrapper>

      <Link to="/page-2">Click here for page 2.</Link>
    </Wrapper>
  );
}
