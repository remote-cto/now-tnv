// app/api/calculatevaluation/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';
import { generateValuationPDF } from '../../../utils/pdfGenerator';
import dbConnect from '../../lib/mongodb';
import Valuation from '../../models/Valuation';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Using Gmail service instead of custom SMTP
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD  // Use App Password for Gmail
  }
});

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, companyName } = body.formData;
    const formContent = body.messages[1].content;

    // Get GPT response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error('No valuation result received from OpenAI');
    }
    const valuationResult: string = content;

    // Store in MongoDB
    const valuationData = {
      companyName,
      email,
      formData: formContent,
      valuationResult,
      timestamp: new Date(),
    };

    const savedValuation = await Valuation.create(valuationData);

    try {
      // Generate PDF
      const pdfBuffer = await generateValuationPDF({
        companyName,
        valuationResult,
        formData: formContent,
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
          <p>If you have any questions about your valuation, please don't hesitate to contact us.</p>
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
        content: valuationResult,
        message: 'Valuation report has been sent to your email',
        id: savedValuation._id,
      });
    } catch (error) {
      console.error('PDF/Email Error:', error);
      
      // Return partial success if PDF generation or email sending fails
      return NextResponse.json({
        content: valuationResult,
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