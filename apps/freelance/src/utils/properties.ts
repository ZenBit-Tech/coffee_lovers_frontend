import { Property } from 'redux/types/properties.types';

export const getPropertyById = (
  properties: Property[],
  id: number,
): Property | undefined => {
  return properties.find(item => item.id === id);
};
