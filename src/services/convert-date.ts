export const convertDate = (dateString: string) => {
  const date = new Date(Date.parse(dateString));
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December',
  ];
  return (
    months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  );
};
