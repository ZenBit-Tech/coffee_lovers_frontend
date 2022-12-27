import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { ReactI18NextChild } from 'react-i18next';

export interface Children {
  children:
    | string
    | number
    | boolean
    | ReactElement<Element, string | JSXElementConstructor<Element>>
    | ReactFragment
    | ReactPortal
    | Iterable<ReactI18NextChild>
    | null
    | undefined;
}
