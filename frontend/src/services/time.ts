const dateFormatter = new Intl.DateTimeFormat("th-TH");

export const formatDateString = (date: string) => {
  return dateFormatter.format(new Date(date));
};
