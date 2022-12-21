export const dateFormat = (dateString: Date) => {
  return (
    new Date(dateString).getDate() +
    '/' +
    new Date(dateString).getMonth() +
    '/' +
    new Date(dateString).getFullYear()
  );
};
