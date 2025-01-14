// utils/valuationCalculator.ts

interface ValuationData {
    annual_revenue: number;
    net_income: number | null;
    industry: string;
    assets: number;
    liabilities: number;
    years_in_operation: string;
    customers_last_month: number;
    employees: string;
    social_media_followers: number;
    revenue_trend: string;
  }
  
  interface ValuationResult {
    totalValuation: number;
    breakdown: {
      coreBusinessValue: number;
      socialMediaValue: number;
      adjustedValue: number;
    };
    explanation: string;
  }
  
  export function calculateBusinessValuation(data: ValuationData): ValuationResult {
    // Calculate net income if not provided (assume 10% of revenue)
    const netIncome = data.net_income ?? data.annual_revenue * 0.1;
  
    // Industry multipliers
    const industryMultipliers: { [key: string]: number } = {
      tech: 3.0,
      retail: 2.0,
      manufacturing: 2.5,
      service: 2.2,
      'food & beverage': 1.8,
      other: 2.0
    };
  
    // Get industry multiplier (default to 'other' if not found)
    const industryMultiplier = industryMultipliers[data.industry.toLowerCase()] || industryMultipliers.other;
  
    // Calculate core business value
    const coreBusinessValue = (netIncome * industryMultiplier) + data.assets - data.liabilities;
  
    // Calculate social media value ($0.10 per follower)
    const socialMediaValue = data.social_media_followers * 0.10;
  
    // Calculate stability adjustments
    let stabilityMultiplier = 1.0;
  
    // Years in operation adjustment
    switch (data.years_in_operation.toLowerCase()) {
      case 'less than 1 year':
        stabilityMultiplier *= 0.8;
        break;
      case '1–3 years':
        stabilityMultiplier *= 0.9;
        break;
      case '3–5 years':
        stabilityMultiplier *= 1.0;
        break;
      case '5–10 years':
        stabilityMultiplier *= 1.1;
        break;
      case '10+ years':
        stabilityMultiplier *= 1.2;
        break;
    }
  
    // Revenue trend adjustment
    switch (data.revenue_trend.toLowerCase()) {
      case 'growing':
        stabilityMultiplier *= 1.2;
        break;
      case 'stable':
        stabilityMultiplier *= 1.0;
        break;
      case 'declining':
        stabilityMultiplier *= 0.8;
        break;
    }
  
    // Calculate final adjusted value
    const adjustedValue = (coreBusinessValue + socialMediaValue) * stabilityMultiplier;
  
    // Format explanation
    const explanation = `
  Business Valuation Breakdown:
  - Core Business Value: $${coreBusinessValue.toLocaleString()}
    
  - Social Media Value: $${socialMediaValue.toLocaleString()}
    (Based on ${data.social_media_followers.toLocaleString()} followers)
  - Stability Adjustments: ${(stabilityMultiplier * 100 - 100).toFixed(1)}%
    (Based on business age and revenue trend)
  - Final Adjusted Value: $${adjustedValue.toLocaleString()}
  `;
  
    return {
      totalValuation: adjustedValue,
      breakdown: {
        coreBusinessValue,
        socialMediaValue,
        adjustedValue
      },
      explanation
    };
  }