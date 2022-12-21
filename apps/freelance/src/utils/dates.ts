export const formatDate = (date: Date): string => {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
};

export const formatTime = (date: Date): string => {
  let hours = '' + date.getHours();
  let min = '' + date.getMinutes();

  if (hours.length < 2) hours = '0' + hours;
  if (min.length < 2) min = '0' + min;

  return [hours, min].join(':');
};
