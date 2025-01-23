
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