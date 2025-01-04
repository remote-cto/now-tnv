// app/api/calculatevaluation/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import nodemailer from 'nodemailer';
import { generateValuationPDF } from '../../../utils/pdfGenerator';

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
    const body = await request.json();
    const { email, companyName } = body.formData;
    
    // Get GPT response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: body.messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const valuationResult = completion.choices[0].message.content;
    
    try {
      // Generate PDF
      const pdfBuffer = await generateValuationPDF(valuationResult, companyName);

      // Send email
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: email,
        subject: `Business Valuation Report - ${companyName}`,
        text: 'Please find your business valuation report attached.',
        attachments: [
          {
            filename: `${companyName.replace(/\s+/g, '_')}_valuation.pdf`,
            content: pdfBuffer,
          },
        ],
      });

      return NextResponse.json({
        content: valuationResult,
        message: 'Valuation report has been sent to your email',
      });
    } catch (pdfError) {
      console.error('PDF/Email Error:', pdfError);
      // Still return the valuation result even if PDF generation fails
      return NextResponse.json({
        content: valuationResult,
        message: 'Valuation result available but PDF generation failed. Please try again later.',
      }, { status: 207 }); // 207 Multi-Status
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process valuation request' },
      { status: 500 }
    );
  }
}