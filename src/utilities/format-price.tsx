const PRICE_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "EUR",
  style: "currency",
});

export function formatPrice(num: number) {
  return PRICE_FORMATTER.format(num);
}
