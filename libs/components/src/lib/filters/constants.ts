import { Options, TimeOptions } from './types';

export const categoriesName = 'categories';
export const skillsName = 'skills';
export const hrlyRateStartName = 'hrlyRateStart';
export const hrlyRateEndName = 'hrlyRateEnd';
export const timeName = 'timeAvailable';
export const englishLevelName = 'englishLevel';

export const itemFontSize = '14px';
export const inputNumberRegExp = /\B(?=(\d{3})+(?!\d))/g;
export const inputNumberMin = 0;

// mock data until backend will be done

export const options: Options[] = [
  { label: 'JavaScript', value: 1 },
  { label: 'Front-End', value: 2 },
  { label: 'Java', value: 3 },
  { label: 'C#', value: 4 },
  { label: '.NET', value: 5 },
  { label: 'Python', value: 6 },
  { label: 'PHP', value: 7 },
  { label: 'Node.js', value: 8 },
  { label: 'iOS', value: 9 },
  { label: 'Android', value: 10 },
  { label: 'C', value: 11 },
  { label: 'C++', value: 12 },
  { label: 'Rust', value: 13 },
];

export const timeOptions: TimeOptions[] = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
];

export const englishOptions: Options[] = [
  { label: 'Pre-intermediate', value: 1 },
  { label: 'Intermediate', value: 2 },
  { label: 'Upper-intermediate', value: 3 },
];
