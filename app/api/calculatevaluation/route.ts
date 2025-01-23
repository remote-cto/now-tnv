
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dbConnect from '../../lib/mongodb';
import Valuation from '../../models/Valuation';
import { calculateBusinessValuation } from '../../../utils/valuationCalculator';
import { formatCurrencyValue } from "../../../utils/formatters";

// Define interfaces for type safety
interface FormDataInput {
  email: string;
  companyName: string;
  currency: string;
  revenue: string;
  netIncome: string;
  industry: string;
  assets: string;
  liabilities: string;
  yearsInOperation: string;
  socialFollowers: string;
  revenueTrend: string;
  [key: string]: string; 
}

interface ProcessedData {
  revenue: number;
  netIncome: number | null;
  industry: string;
  assets: number;
  liabilities: number;
  yearsInOperation: string;
  socialFollowers: number;
  revenueTrend: string;
  currency: string;
}

// Interface for valuation calculation with shortened names
interface ValuationData {
  rev: number;
  inc: number | null;
  industry: string;
  asset: number;
  lia: number;
  op_year: string;
  sm: number;
  trend: string;
  currency: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

async function sendUserEmail(
  email: string, 
  companyName: string, 
  formattedValuation: string
) {
  const htmlContent = `
    <h1>Your Business Valuation Report</h1>
    <p>Thank you for using our business valuation tool. Please find your detailed valuation report attached to this email.</p>
    <p style="font-size: 18px; font-weight: bold;">Company Name: <span style="color: #00AB84;">${companyName}</span></p>
    <p style="font-size: 18px; font-weight: bold;">Final Valuation: <span style="color: #00AB84;">${formattedValuation}</span></p>
    <br>
    <p>Best regards,</p>
    <p>Your Business Valuation Team</p>
  `;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Business Valuation Report - ${companyName}`,
    html: htmlContent
  });
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { formData } = await request.json();
    const { email, companyName, ...valuationData } = formData as FormDataInput;

    // Process data for MongoDB storage 
    const processedData: ProcessedData = {
      revenue: parseFloat(valuationData.revenue) || 0,
      netIncome: valuationData.netIncome ? parseFloat(valuationData.netIncome) : null,
      industry: valuationData.industry || "other",
      assets: parseFloat(valuationData.assets) || 0,
      liabilities: parseFloat(valuationData.liabilities) || 0,
      yearsInOperation: valuationData.yearsInOperation || "less than 1 year",
      socialFollowers: parseInt(valuationData.socialFollowers) || 1,
      revenueTrend: valuationData.revenueTrend || "stable",
      currency: valuationData.currency || "usd"
    };

    // Convert to format expected by calculation function
    const calculationData: ValuationData = {
      rev: processedData.revenue,
      inc: processedData.netIncome,
      industry: processedData.industry,
      asset: processedData.assets,
      lia: processedData.liabilities,
      op_year: processedData.yearsInOperation,
      sm: processedData.socialFollowers,
      trend: processedData.revenueTrend,
      currency: processedData.currency
    };

    // Calculate valuation using the properly formatted data
    const valuationResult = calculateBusinessValuation(calculationData);

    // Format the valuation amount
    const formattedValuation = formatCurrencyValue(valuationResult.totalValuation, processedData.currency);

    // Store in MongoDB with the descriptive field names
    const valuationRecord = {
      companyName,
      email,
      formData: processedData,
      valuationResult: valuationResult.explanation,
      timestamp: new Date(),
    };

    const savedValuation = await Valuation.create(valuationRecord);

    try {
      await sendUserEmail(email, companyName, formattedValuation);

      return NextResponse.json({
        content: valuationResult.explanation,
        message: 'Valuation report has been sent to your email',
        id: savedValuation._id,
      });
    } catch (error) {
      console.error('Email Error:', error);
      
      return NextResponse.json({
        content: valuationResult.explanation,
        message: 'Valuation result available but email delivery failed. Please try again later.',
        id: savedValuation._id,
      }, { status: 207 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process valuation request' },
      { status: 500 }
    );
  }
}