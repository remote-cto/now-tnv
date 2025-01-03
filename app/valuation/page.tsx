"use client"
import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BusinessValuationForm = () => {
  const [formData, setFormData] = useState({
    revenue: '',
    netIncome: '',
    industry: '',
    assets: '',
    liabilities: '',
    yearsInOperation: '',
    monthlyCustomers: '',
    employees: '',
    socialFollowers: '',
    revenueTrend: ''
  });

  const handleInputChange = (field: keyof typeof formData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const industries = ['Retail', 'Service', 'Manufacturing', 'Tech', 'Food & Beverage', 'Other'];
  const yearsOptions = ['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'];
  const employeeOptions = ['None', '1–5', '6–10', '11–50', '51+'];
  const trendOptions = ['Growing', 'Stable', 'Declining'];

  return (
    <>
      <Header />
      <div className='mt-3'>
        <Card sx={{ maxWidth: '42rem', margin: 'auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>Business Valuation Calculator</Typography>
            <div className="space-y-6">
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="What is your business's annual revenue?"
                  type="number"
                  placeholder="Enter amount in dollars"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                  helperText="This is your business's total income before expenses. If you're unsure, use your best estimate."
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="What is your annual net income or profit?"
                  type="number"
                  placeholder="Enter amount in dollars"
                  value={formData.netIncome}
                  onChange={(e) => handleInputChange('netIncome', e.target.value)}
                  helperText="This is how much your business earned after expenses. If you're unsure, a typical business keeps 10–15% of revenue as profit."
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>What industry does your business operate in?</InputLabel>
                <Select
                  value={formData.industry}
                  label="What industry does your business operate in?"
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry} value={industry.toLowerCase()}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Choose the category that best describes your business.</FormHelperText>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="What is the total value of your business assets?"
                  type="number"
                  placeholder="Enter amount in dollars"
                  value={formData.assets}
                  onChange={(e) => handleInputChange('assets', e.target.value)}
                  helperText="Include physical items like inventory, equipment, or property. If you're unsure, leave it blank."
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="What are your total liabilities?"
                  type="number"
                  placeholder="Enter amount in dollars"
                  value={formData.liabilities}
                  onChange={(e) => handleInputChange('liabilities', e.target.value)}
                  helperText="This includes any loans or debts your business owes. If you're unsure, leave it blank."
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>How many years has your business been in operation?</InputLabel>
                <Select
                  value={formData.yearsInOperation}
                  label="How many years has your business been in operation?"
                  onChange={(e) => handleInputChange('yearsInOperation', e.target.value)}
                >
                  {yearsOptions.map((option) => (
                    <MenuItem key={option} value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>This helps us estimate business stability. Older businesses are generally more valuable.</FormHelperText>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="How many customers did you serve last month?"
                  type="number"
                  placeholder="Enter number of customers"
                  value={formData.monthlyCustomers}
                  onChange={(e) => handleInputChange('monthlyCustomers', e.target.value)}
                  helperText="If you don't track this, estimate the number of individual customers or orders you handled in the last month."
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>How many employees do you have?</InputLabel>
                <Select
                  value={formData.employees}
                  label="How many employees do you have?"
                  onChange={(e) => handleInputChange('employees', e.target.value)}
                >
                  {employeeOptions.map((option) => (
                    <MenuItem key={option} value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Include all part-time and full-time employees. If you're a solo business, select 'None'.</FormHelperText>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="How many followers do you have on your most active social media account?"
                  type="number"
                  placeholder="Enter number of followers"
                  value={formData.socialFollowers}
                  onChange={(e) => handleInputChange('socialFollowers', e.target.value)}
                  helperText="Enter the number of followers on the platform where your business is most active, like Instagram, Twitter, or LinkedIn."
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Is your revenue growing, stable, or declining?</InputLabel>
                <Select
                  value={formData.revenueTrend}
                  label="Is your revenue growing, stable, or declining?"
                  onChange={(e) => handleInputChange('revenueTrend', e.target.value)}
                >
                  {trendOptions.map((option) => (
                    <MenuItem key={option} value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Pick the trend that best describes your revenue over the last 12 months.</FormHelperText>
              </FormControl>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='mt-3'>
        <Footer />
      </div>
    </>
  );
};

export default BusinessValuationForm;
