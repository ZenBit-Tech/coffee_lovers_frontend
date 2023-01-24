export const dateFormat = (dateString: Date) => {
  return (
    new Date(dateString).getDate() +
    '.' +
    new Date(dateString).getMonth() +
    '.' +
    new Date(dateString).getFullYear()
  );
};

export const closed = 0;
export const active = 2;
