//utils/formatters.ts
// export const formatCurrencyValue = (value: number, currency: string = 'usd'): string => {
//   const currencyConfig: { [key: string]: { locale: string, currency: string }} = {
//     usd: { locale: 'en-US', currency: 'USD' },
//     eur: { locale: 'de-DE', currency: 'EUR' },
//     gbp: { locale: 'en-GB', currency: 'GBP' },
//     inr: { locale: 'en-IN', currency: 'INR' },
//     kwd: { locale: 'ar-KW', currency: 'KWD' }
//   };

//   const config = currencyConfig[currency.toLowerCase()] || currencyConfig.usd;

//   return new Intl.NumberFormat(config.locale, {
//     style: 'currency',
//     currency: config.currency,
//   }).format(value);
// };

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

interface CurrencyConfig {
  [key: string]: {
    symbol: string;
    locale: string;
    format: (value: number) => string;
  };
}

export const currencyConfig: CurrencyConfig = {
  usd: {
    symbol: '$',
    locale: 'en-US',
    format: (value: number) => `$${value.toLocaleString('en-US')}`
  },
  eur: {
    symbol: '€',
    locale: 'de-DE',
    format: (value: number) => `€${value.toLocaleString('de-DE')}`
  },
  gbp: {
    symbol: '£',
    locale: 'en-GB',
    format: (value: number) => `£${value.toLocaleString('en-GB')}`
  },
  inr: {
    symbol: '₹',
    locale: 'en-IN',
    format: (value: number) => `₹${value.toLocaleString('en-IN')}`
  },
  kwd: {
    symbol: 'KWD',
    locale: 'en-US',
    format: (value: number) => `${value.toLocaleString('en-US')} KWD`
  }
};

export function formatCurrencyValue(value: number, currency: string): string {
  const config = currencyConfig[currency.toLowerCase()] || currencyConfig.usd;
  return config.format(value);
}