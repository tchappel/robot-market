const currencyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatTHB = (amount: number): string => {
  return currencyFormatter.format(amount);
};
