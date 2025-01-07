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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
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
      // Generate PDF with the new generator
      const pdfBuffer = await generateValuationPDF({
        companyName,
        valuationResult,
        formData: formContent,
      });

      // Send email with PDF attachment
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
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
  
    } catch (error: unknown) {
      console.error('PDF/Email Error:', error);
      
      // Type guard to check if error is an Error object
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Fallback to text-only email
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Business Valuation Report - ${companyName}`,
        html: `
          <h1>Your Business Valuation Report</h1>
          <p>Dear ${companyName},</p>
          <p>Here is your valuation result:</p>
          <pre>${valuationResult}</pre>
          <p>We apologize for any inconvenience, but we encountered an error generating the PDF version.</p>
          <br>
          <p>Best regards,</p>
          <p>Your Business Valuation Team</p>
        `
      });
  
      return NextResponse.json(
        { error: 'Failed to process valuation request', content: valuationResult },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Route Error:', error);
    
    // Type guard to check if error is an Error object
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json(
      { error: 'Failed to process request', message: errorMessage },
      { status: 500 }
    );
  }
}