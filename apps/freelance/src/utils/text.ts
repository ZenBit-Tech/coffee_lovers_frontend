export const getSizedText = (text: string, maxLength: number): string => {
  let result = text;
  if (text.length > maxLength) {
    result = `${result.slice(0, maxLength)} ...`;
  }

  return result;
};
