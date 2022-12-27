import { Property } from 'src/redux/types/properties.types';

const mockCategories: Property[] = [{ id: 1, name: 'Front-end' }];

const mockEnglishLevels: string[] = [
  'No English',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
];

const mockSkills: Property[] = [{ id: 1, name: 'JavaScript' }];

const mockDurationAmount: string[] = ['Week', 'Month'];

const mockAvailableTime: string[] = ['Part-time', 'Full-time'];

export const mockUseProperties = {
  categories: mockCategories,
  englishLevels: mockEnglishLevels,
  skills: mockSkills,
  durationAmount: mockDurationAmount,
  availableTime: mockAvailableTime,
  getOptionsForSelectWithId: (property: Property[]) =>
    property.map(item => ({ label: item.name, value: item.id })),
  getOptionsForSelectString: (property: string[]) =>
    property.map(item => ({ value: item })),
};
