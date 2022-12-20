import { Dispatch, SetStateAction } from 'react';

export interface Props {
  pages: string[];
  active: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}
