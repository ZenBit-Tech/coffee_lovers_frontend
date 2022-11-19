import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

:root {
  --white-color: #fff;
  --black-color: #000;

  --animation-cubic-bezier: 250ms cubic-bezier(0.8, 0.4, 0.3, 0.9);
}

html {
  scroll-behavior: smooth;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: var(--black-color);
  background-color: var(--white-color);
}

#root {
  margin: 0 auto;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
a,
ul {
  margin: 0px;
  padding: 0px;
}

a {
  text-decoration: none;
}

button {
  display: block;
  cursor: pointer;
  border: transparent;
}

ul {
  list-style: none;
}

label,
input,
textarea {
  display: block;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}


`;
