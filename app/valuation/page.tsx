"use client"
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Select,
  MenuItem,
  Button,
  Alert,
  Typography,
  FormControl,
  InputLabel,
  List,
  ListItem,
  Box,
  SelectChangeEvent
} from '@mui/material';

interface FormData {
  annual_revenue: string;
  net_income: string;
  industry: string;
  assets: string;
  liabilities: string;
  years_in_operation: string;
  customers_last_month: string;
  employees: string;
  social_media_followers: string;
  revenue_trend: string;
}

interface ValuationBreakdown {
  coreValue: number;
  assetValue: number;
  socialMediaValue: number;
  adjustments: {
    industry: number;
    stability: number;
    growth: number;
  };
}

interface Valuation {
  total: number;
  breakdown: ValuationBreakdown;
}

const BusinessValuationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    annual_revenue: '',
    net_income: '',
    industry: '',
    assets: '',
    liabilities: '',
    years_in_operation: '',
    customers_last_month: '',
    employees: '',
    social_media_followers: '',
    revenue_trend: ''
  });

  const [valuation, setValuation] = useState<Valuation | null>(null);

  const industryOptions = [
    'Retail',
    'Service',
    'Manufacturing',
    'Tech',
    'Food & Beverage',
    'Other'
  ] as const;

  const yearsOptions = [
    'Less than 1 year',
    '1–3 years',
    '3–5 years',
    '5–10 years',
    '10+ years'
  ] as const;

  const employeeOptions = [
    'None',
    '1–5',
    '6–10',
    '11–50',
    '51+'
  ] as const;

  const revenueOptions = [
    'Growing',
    'Stable',
    'Declining'
  ] as const;

  type Industry = typeof industryOptions[number];
  type Years = typeof yearsOptions[number];
  type RevenueTrend = typeof revenueOptions[number];

  const getIndustryMultiple = (industry: Industry): number => {
    const multiples: Record<Industry, number> = {
      'Retail': 1.5,
      'Service': 2.0,
      'Manufacturing': 2.5,
      'Tech': 3.0,
      'Food & Beverage': 1.8,
      'Other': 1.5
    };
    return multiples[industry] || 1.5;
  };

  const getStabilityMultiplier = (years: Years): number => {
    const multipliers: Record<Years, number> = {
      'Less than 1 year': 0.9,
      '1–3 years': 1.0,
      '3–5 years': 1.05,
      '5–10 years': 1.1,
      '10+ years': 1.1
    };
    return multipliers[years] || 1.0;
  };

  const getGrowthMultiplier = (trend: RevenueTrend): number => {
    const multipliers: Record<RevenueTrend, number> = {
      'Growing': 1.1,
      'Stable': 1.0,
      'Declining': 0.9
    };
    return multipliers[trend] || 1.0;
  };

  const calculateValuation = () => {
    const revenue = Number(formData.annual_revenue) || 0;
    const netIncome = Number(formData.net_income) || (revenue * 0.1);
    const assets = Number(formData.assets) || 0;
    const liabilities = Number(formData.liabilities) || 0;
    const followers = Number(formData.social_media_followers) || 0;

    const industryMultiple = getIndustryMultiple(formData.industry as Industry);
    const stabilityMultiplier = getStabilityMultiplier(formData.years_in_operation as Years);
    const growthMultiplier = getGrowthMultiplier(formData.revenue_trend as RevenueTrend);

    const coreValue = netIncome * industryMultiple;
    const assetValue = assets - liabilities;
    const socialMediaValue = followers * 0.1;

    const totalValue = (coreValue + assetValue + socialMediaValue) * 
                      stabilityMultiplier * 
                      growthMultiplier;

    setValuation({
      total: totalValue,
      breakdown: {
        coreValue,
        assetValue,
        socialMediaValue,
        adjustments: {
          industry: industryMultiple,
          stability: stabilityMultiplier,
          growth: growthMultiplier
        }
      }
    });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as keyof FormData]: value
    }));
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
      <CardHeader 
        title="Business Valuation Calculator"
        sx={{ textAlign: 'center' }}
      />
      <CardContent>
        <Box component="form" sx={{ '& .MuiTextField-root': { mb: 3 } }}>
          <TextField
            fullWidth
            label="Annual Revenue"
            type="number"
            name="annual_revenue"
            value={formData.annual_revenue}
            onChange={handleTextFieldChange}
            helperText="Total income before expenses"
          />

          <TextField
            fullWidth
            label="Annual Net Income"
            type="number"
            name="net_income"
            value={formData.net_income}
            onChange={handleTextFieldChange}
            helperText="Typically 10-15% of revenue"
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Industry</InputLabel>
            <Select
              name="industry"
              value={formData.industry}
              onChange={handleSelectChange}
              label="Industry"
            >
              {industryOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Total Assets Value"
            type="number"
            name="assets"
            value={formData.assets}
            onChange={handleTextFieldChange}
            helperText="Inventory, equipment, etc."
          />

          <TextField
            fullWidth
            label="Total Liabilities"
            type="number"
            name="liabilities"
            value={formData.liabilities}
            onChange={handleTextFieldChange}
            helperText="Loans, debts"
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Years in Operation</InputLabel>
            <Select
              name="years_in_operation"
              value={formData.years_in_operation}
              onChange={handleSelectChange}
              label="Years in Operation"
            >
              {yearsOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Monthly Customers"
            type="number"
            name="customers_last_month"
            value={formData.customers_last_month}
            onChange={handleTextFieldChange}
            helperText="Last month"
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Employees</InputLabel>
            <Select
              name="employees"
              value={formData.employees}
              onChange={handleSelectChange}
              label="Employees"
            >
              {employeeOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Social Media Followers"
            type="number"
            name="social_media_followers"
            value={formData.social_media_followers}
            onChange={handleTextFieldChange}
            helperText="Most active platform"
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Revenue Trend</InputLabel>
            <Select
              name="revenue_trend"
              value={formData.revenue_trend}
              onChange={handleSelectChange}
              label="Revenue Trend"
            >
              {revenueOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            fullWidth 
            onClick={calculateValuation}
            sx={{ mt: 2 }}
          >
            Calculate Valuation
          </Button>
        </Box>

        {valuation && (
          <Alert severity="info" sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Estimated Business Valuation: ${valuation.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Core Business Value: ${valuation.breakdown.coreValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <br />
              Asset Value: ${valuation.breakdown.assetValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              <br />
              Social Media Value: ${valuation.breakdown.socialMediaValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Applied Multipliers:
            </Typography>
            <List dense>
              <ListItem>Industry: {valuation.breakdown.adjustments.industry}x</ListItem>
              <ListItem>Stability: {((valuation.breakdown.adjustments.stability - 1) * 100).toFixed(1)}% adjustment</ListItem>
              <ListItem>Growth: {((valuation.breakdown.adjustments.growth - 1) * 100).toFixed(1)}% adjustment</ListItem>
            </List>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessValuationForm;