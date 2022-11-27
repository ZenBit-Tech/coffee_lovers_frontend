import { cardDescriptionMaxLength } from './constants';

export const getSizedDescription = (description: string): string => {
  let result = description;
  if (description.length > cardDescriptionMaxLength) {
    result = `${result.slice(0, cardDescriptionMaxLength)} ...`;
  }

  return result;
};
