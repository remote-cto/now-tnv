import { formatCurrencyValue } from "./formatters";

interface ValuationData {
  rev: number; 
  inc?: number | null; 
  industry: string;
  asset: number; 
  lia: number; 
  op_year: string; 
  sm?: number; 
  trend?: string; 
  currency: string;
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
  //  Set default values and handle missing inputs
  const income = data.inc ?? (data.rev * 0.05); 
  const socialMediaFollowers = data.sm ?? 1;
  const trend = data.trend?.toLowerCase() ?? "stable";
  const currencySymbol = currencyConfig[data.currency?.toLowerCase() || 'usd'].symbol;

  //  industry multipliers
  const industryMultipliers: { [key: string]: number } = {
    tech: 2.2,           
    manufacturing: 2.0,  
    service: 1.8,        
    retail: 1.7,         
    "food & beverage": 1.5, 
    other: 1.3,         
  };

  const industryMultiplier =
    industryMultipliers[data.industry.toLowerCase()] ||
    industryMultipliers.other;

  //  years in operation multipliers
  const operationYearMultipliers: { [key: string]: number } = {
    "less than 1 year": 0.8,  
    "1-3 years": 0.9,         
    "3-5 years": 1.0,         
    "5+ years": 1.05,        
  };
  
  const normalizeInput = (input: string) =>
    input.trim().toLowerCase().replace(/[\u2013\u2014]/g, "-");
  
  const formattedOpYear = normalizeInput(data.op_year);
  const opYearMultiplier = operationYearMultipliers[formattedOpYear] || 0.8; 

  //  business trend multipliers
  const trendMultipliers: { [key: string]: number } = {
    declining: 0.95,  
    stable: 1.0,      
    growing: 1.05,    
  };

  const trendMultiplier = trendMultipliers[trend] || 1.0;

  // Calculation according to the new formula

  const baseValuation = (industryMultiplier * income) + (data.asset - (data.lia / 6));
  
  // Calculate social media factor 
  const socialMediaFactor = Math.min(socialMediaFollowers * 0.00001, 0.5);
  const valuationWithSocialMedia = baseValuation * (1 + socialMediaFactor);
  
  const valuationWithAge = valuationWithSocialMedia * opYearMultiplier;
  const finalValuation = valuationWithAge * trendMultiplier;

  const currencyFormatter = currencyConfig[data.currency?.toLowerCase() || 'usd'].formatValue;

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