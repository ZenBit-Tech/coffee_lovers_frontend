import 'styled-components';

import { ITheme } from './interfaces/styled';

declare module 'styled-components' {
  /* eslint-disable-next-line */
  export interface DefaultTheme extends ITheme {}
}
