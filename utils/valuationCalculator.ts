import { formatCurrencyValue } from "./formatters";

//utils/valuationCalculator.ts
interface ValuationData {
  rev: number; // Revenue
  inc?: number | null; // Income (optional)
  industry: string;
  asset: number; // Total Assets
  lia: number; // Total Liabilities
  op_year: string; // Years in Operation
  sm?: number; // Social Media Followers (optional)
  trend?: string; // Business Trend (optional)
  currency: string; // Added currency field
}

interface ValuationResult {
  totalValuation: number;
  breakdown: {
    baseValuation: number;
    valuationWithSocialMedia: number;
    valuationWithAge: number;
    finalValuation: number;
  };
  explanation: string;
}

// Currency configuration with format handlers
const currencyConfig: { 
  [key: string]: { 
    symbol: string;
    formatValue: (value: number) => string;
  }
} = {
  usd: { 
    symbol: '$',
    formatValue: (value: number) => `$${value.toLocaleString('en-US')}`
  },
  eur: { 
    symbol: '€',
    formatValue: (value: number) => `€${value.toLocaleString('de-DE')}`
  },
  gbp: { 
    symbol: '£',
    formatValue: (value: number) => `£${value.toLocaleString('en-GB')}`
  },
  inr: { 
    symbol: '₹',
    formatValue: (value: number) => `₹${value.toLocaleString('en-IN')}`
  },
  kwd: { 
    symbol: 'KWD',
    formatValue: (value: number) => `${value.toLocaleString('en-US')} KWD`
  }
};

export function calculateBusinessValuation(
  data: ValuationData
): ValuationResult {
  // 1. Set default values and handle missing inputs
  const income = data.inc ?? data.rev * 0.1;
  const socialMediaFollowers = data.sm ?? 1;
  const trend = data.trend?.toLowerCase() ?? "stable";
  const currencySymbol = currencyConfig[data.currency?.toLowerCase() || 'usd'].symbol;

  // 2. Industry multipliers
  const industryMultipliers: { [key: string]: number } = {
    tech: 3.0,
    manufacturing: 2.5,
    service: 2.2,
    retail: 2.0,
    "food & beverage": 1.8,
    other: 1.5,
  };

  const industryMultiplier =
    industryMultipliers[data.industry.toLowerCase()] ||
    industryMultipliers.other;

  // 3. Years in operation multipliers
  const operationYearMultipliers: { [key: string]: number } = {
    "less than 1 year": 0.7,
    "1-3 years": 0.9,
    "3-5 years": 1.0,
    "5+ years": 1.1,
  };
  
  // Normalize input
  const normalizeInput = (input: string) =>
    input.trim().toLowerCase().replace(/[\u2013\u2014]/g, "-");
  
  const formattedOpYear = normalizeInput(data.op_year);
  const opYearMultiplier = operationYearMultipliers[formattedOpYear] || 0.7;

  // 4. Business trend multipliers
  const trendMultipliers: { [key: string]: number } = {
    declining: 0.9,
    stable: 1.0,
    growing: 1.1,
  };

  const trendMultiplier = trendMultipliers[trend] || 1.0;

  const baseValuation = industryMultiplier * income + (data.asset - data.lia);
  const valuationWithSocialMedia =
    baseValuation * (1 + socialMediaFollowers * 0.0001);
  const valuationWithAge = valuationWithSocialMedia * opYearMultiplier;
  const finalValuation = valuationWithAge * trendMultiplier;

  const currencyFormatter = currencyConfig[data.currency?.toLowerCase() || 'usd'].formatValue;


  // 6. Updated explanation with dynamic currency symbol
  const explanation = `Final Valuation: ${formatCurrencyValue(finalValuation, data.currency)}`;


  return {
    totalValuation: finalValuation,
    breakdown: {
      baseValuation,
      valuationWithSocialMedia,
      valuationWithAge,
      finalValuation,
    },
    explanation,
  };
}