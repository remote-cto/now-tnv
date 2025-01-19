// app/api/valuation/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateValuationPDF } from '../../../utils/pdfGenerator';
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
  formattedValuation: string, 
  pdfBuffer: Buffer
) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Business Valuation Report - ${companyName}`,
    html: `
      <h1>Your Business Valuation Report</h1>
      <p>Dear ${companyName},</p>
      <p>Thank you for using our business valuation tool. Please find your detailed valuation report attached to this email.</p>
      <p>Final Valuation: ${formattedValuation}</p>
      <br>
      <p>Best regards,</p>
      <p>Your Business Valuation Team</p>
    `,
    attachments: [
      {
        filename: `${companyName.replace(/\s+/g, '_')}_valuation_report.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}

async function sendHostConfirmationEmail(
  companyName: string, 
  formattedValuation: string, 
  processedData: ProcessedData
) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER, // Send to host email
    subject: `New Valuation Report Generated - ${companyName}`,
    html: `
      <h2>New Business Valuation Generated</h2>
      <p>A new business valuation has been generated for ${companyName}.</p>
      
      <h3>Valuation Details:</h3>
      <ul>
        <li>Company Name: ${companyName}</li>
        <li>Final Valuation: ${formattedValuation}</li>
        <li>Industry: ${processedData.industry}</li>
        <li>Revenue: ${formatCurrencyValue(processedData.revenue, processedData.currency)}</li>
        <li>Net Income: ${processedData.netIncome ? formatCurrencyValue(processedData.netIncome, processedData.currency) : 'Not provided'}</li>
        <li>Years in Operation: ${processedData.yearsInOperation}</li>
        <li>Revenue Trend: ${processedData.revenueTrend}</li>
      </ul>
      
      <p>This is an automated notification. Please do not reply to this email.</p>
    `
  });
}


export async function POST(request: Request) {
  try {
    await dbConnect();

    const { formData } = await request.json();
    const { email, companyName, ...valuationData } = formData as FormDataInput;

    // Process data for MongoDB storage with descriptive names
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
      // Generate PDF
      const pdfBuffer = await generateValuationPDF({
        companyName,
        valuationResult: valuationResult.explanation,
        formData: JSON.stringify(processedData),
        currency: processedData.currency // Now properly typed
      });

      await sendUserEmail(email, companyName, formattedValuation, pdfBuffer);
      
      // Send confirmation email to host
      await sendHostConfirmationEmail(companyName, formattedValuation, processedData);

      return NextResponse.json({
        content: valuationResult.explanation,
        message: 'Valuation report has been sent to your email',
        id: savedValuation._id,
      });
    } catch (error) {
      console.error('PDF/Email Error:', error);
      
      return NextResponse.json({
        content: valuationResult.explanation,
        message: 'Valuation result available but PDF delivery failed. Please try again later.',
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