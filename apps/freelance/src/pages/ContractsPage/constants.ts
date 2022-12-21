export const dateFormat = (dateString: Date) => {
  return (
    new Date(dateString).getDate() +
    '/' +
    new Date(dateString).getMonth() +
    '/' +
    new Date(dateString).getFullYear()
  );
};

export const contractTypes = ['Active', 'Closed'];

export const active = 0;
export const closed = 1;
