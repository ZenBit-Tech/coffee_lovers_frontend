import {
  categoriesName,
  englishLevelName,
  hrlyRateEndName,
  hrlyRateStartName,
  skillsName,
  timeName,
} from './constants';

export interface FiltersProps {
  visibility: boolean;
  closeHandler: () => void;
  submit: (data: FilterFormItems) => void;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export type FilterFormItems = {
  [skillsName]: number[];
  [categoriesName]: number[];
  [hrlyRateStartName]: number;
  [hrlyRateEndName]: number;
  [timeName]: string;
  [englishLevelName]: string;
};

export type Options = {
  label: string;
  value: number;
};
