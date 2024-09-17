import dayjs from 'dayjs';

export function formatCurrency(amount: number, currencyCode: string): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode,
  });
  return formatter.format(amount);
}

export function formatDate(date: string | number, format: string): string {
  return dayjs(date).format(format);
}

// HUMAN ASSISTANCE NEEDED
// The formatDate function might benefit from additional error handling or input validation.
// Consider adding checks for invalid date inputs or format strings.