export interface Property {
  id: number;
  name: string;
}

export interface PropertiesState {
  categories: Property[];
  skills: Property[];
  englishLevels: string[];
  lastUpdate: number;
}

export interface PropertiesResponse {
  categories: Property[];
  skills: Property[];
  englishLevels: string[];
}
