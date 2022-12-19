export interface Property {
  id: number;
  name: string;
}

export interface PropertiesState {
  categories: Property[];
  skills: Property[];
  englishLevels: string[];
  durationAmount: string[];
  availableTime: string[];
  lastUpdate: number;
}

export interface PropertiesResponse {
  categories: Property[];
  skills: Property[];
  englishLevels: string[];
  durationAmount: string[];
  availableTime: string[];
}

export enum EnglishLevel {
  NO_ENGLISH = 'No English',
  PRE_INTERMEDIATE = 'Pre-Intermediate',
  INTERMEDIATE = 'Intermediate',
  UPPER_INTERMEDIATE = 'Upper-Intermediate',
}

export enum AvailableTime {
  FULL_TIME = 'Full-Time',
  PART_TIME = 'Part-Time',
}
