import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  @media screen and (min-width: 1280px) {
    display: flex;
  }
`;

export const LinkWrapper = styled(Link)`
  margin: 0 10px;
`;
