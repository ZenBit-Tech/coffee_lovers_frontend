export const formatDate = (date: Date): string => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const min = date.getMinutes();

  return [hours, min].join(':');
};
