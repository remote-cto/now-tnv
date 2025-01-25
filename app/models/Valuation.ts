// models/Valuation.ts
import mongoose from 'mongoose';

const ValuationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  businessIndividualName: { 
    type: String,
    required: true,
  },
  formData: {
    revenue: Number,
    netIncome: Number,
    industry: String,
    assets: Number,
    liabilities: Number,
    yearsInOperation: String,
    monthlyCustomers: Number,
    employees: String,
    socialFollowers: Number,
    revenueTrend: String,
  },
  valuationResult: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Valuation || mongoose.model('Valuation', ValuationSchema);