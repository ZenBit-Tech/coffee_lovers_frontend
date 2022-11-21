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
}

export type FormItems = {
  [skillsName]: object[];
  [categoriesName]: object[];
  [hrlyRateStartName]: number;
  [hrlyRateEndName]: number;
  [timeName]: object;
  [englishLevelName]: object;
};

export type Options = {
  label: string;
  value: number;
};

export type TimeOptions = {
  value: number;
};
