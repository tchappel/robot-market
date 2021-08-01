const currencyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("th-TH");

export const formatTHB = (amount: number): string => {
  return currencyFormatter.format(amount);
};

export const formatDateString = (date: string) => {
  return dateFormatter.format(new Date(date));
};
