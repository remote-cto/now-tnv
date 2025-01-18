//utils/formatters.ts
export const formatCurrencyValue = (value: number, currency: string = 'usd'): string => {
  const currencyConfig: { [key: string]: { locale: string, currency: string }} = {
    usd: { locale: 'en-US', currency: 'USD' },
    eur: { locale: 'de-DE', currency: 'EUR' },
    gbp: { locale: 'en-GB', currency: 'GBP' },
    inr: { locale: 'en-IN', currency: 'INR' },
    kwd: { locale: 'ar-KW', currency: 'KWD' }
  };

  const config = currencyConfig[currency.toLowerCase()] || currencyConfig.usd;

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
  }).format(value);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};