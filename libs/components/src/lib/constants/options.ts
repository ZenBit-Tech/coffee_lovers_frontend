// temporary template objects for selector options

type OptionProps = {
  value: string;
};

export const englishOptions: OptionProps[] = [
  { value: 'No English' },
  { value: 'Pre-Intermediate' },
  { value: 'Intermediate' },
  { value: 'Upper-Intermediate' },
];

export const durationOptions: OptionProps[] = [
  { value: 'Month' },
  { value: 'Week' },
];

// in future must get from back
export const multipleSelectOptions: OptionProps[] = [
  { value: 'JavaScript' },
  { value: 'Front-End' },
  { value: 'Java' },
  { value: 'C#' },
  { value: '.NET' },
  { value: 'Python' },
  { value: 'PHP' },
  { value: 'Node.js' },
  { value: 'iOS' },
  { value: 'Android' },
  { value: 'C' },
  { value: 'C++' },
  { value: 'Rust' },
];

export const skillsOptions: OptionProps[] = [
  { value: 'Mobile app development' },
  { value: 'HTML' },
  { value: 'CSS' },
  { value: 'JavaScript' },
  { value: 'Node' },
];
