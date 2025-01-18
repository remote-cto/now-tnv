// pages/api/valuation/route.ts

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateValuationPDF } from '../../../utils/pdfGenerator';
import dbConnect from '../../lib/mongodb';
import Valuation from '../../models/Valuation';
import { calculateBusinessValuation } from '../../../utils/valuationCalculator';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { formData } = await request.json();
    const { email, companyName, ...valuationData } = formData;

    // Convert and map form data to new valuation format
    const processedData = {
      rev: parseFloat(valuationData.revenue) || 0,
      inc: valuationData.netIncome ? parseFloat(valuationData.netIncome) : null,
      industry: valuationData.industry || "other",
      asset: parseFloat(valuationData.assets) || 0,
      lia: parseFloat(valuationData.liabilities) || 0,
      op_year: valuationData.yearsInOperation || "less than 1 year",
      sm: parseInt(valuationData.socialFollowers) || 1,
      trend: valuationData.revenueTrend || "stable"
    };

    // Calculate valuation using updated formula
    const valuationResult = calculateBusinessValuation(processedData);

    // Store in MongoDB
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
        formData: JSON.stringify(processedData, null, 2),
      });

      // Send email with PDF attachment
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: `Business Valuation Report - ${companyName}`,
        html: `
          <h1>Your Business Valuation Report</h1>
          <p>Dear ${companyName},</p>
          <p>Thank you for using our business valuation tool. Please find your detailed valuation report attached to this email.</p>
          <p>Final Valuation: $${valuationResult.totalValuation.toLocaleString()}</p>
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