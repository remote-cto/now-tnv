import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "../../lib/mongodb";
import Valuation from "../../models/Valuation";
import { calculateBusinessValuation } from "../../../utils/valuationCalculator";
import { formatCurrencyValue } from "../../../utils/formatters";

// Define interfaces for type safety
interface FormDataInput {
  email: string;
  companyName: string;
  businessIndividualName: string;
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

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Send valuation email

async function sendUserEmail(
  email: string,
  companyName: string,
  businessIndividualName: string,
  formattedValuation: string
) {
  const htmlContent = `
    <h2>Hi ${businessIndividualName},</h2>
    <p>Excellent move! You've taken a crucial step by calculating your business valuation.</p>
    <p>${companyName}</p>
    <p>The value of your company is <span style="color: #00A36C; font-weight: bold;">${formattedValuation}</span></p>
    <p>You've already created momentum—let's build on it! Here's what we need to do next:</p>
    <ul style="list-style-type: disc; margin-left: 20px;">
      <li>Understand how your revenue, margins, and growth rates influenced this result.</li>
      <li>Look for ways to enhance your value in a short amount of time.</li>
    </ul>
    <p>Ready to dive deeper? Schedule a quick call with us so we can talk about finding ways to raise your valuation in weeks.</p>
    <div style="margin: 20px 0;">
       <a href="https://wa.me/96597777249"  
         style="background-color: #007bff; 
                color: white; 
                padding: 10px 20px; 
                text-decoration: none; 
                border-radius: 5px; 
                display: inline-block;">
        Book a free call
      </a>
    </div>
    <p>To your success,</p>
    <p>Tarek J. Aljasem<br>
    Founder<br>
    The Now Company</p>
  `;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Your Business Valuation Results - ${companyName}`,
    html: htmlContent,
  });
}

// Main API handler
export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the incoming request
    const { formData } = await request.json();
    const { email, companyName, businessIndividualName, ...valuationData } =
      formData as FormDataInput;

    // Process data for MongoDB storage
    const processedData: ProcessedData = {
      revenue: parseFloat(valuationData.revenue) || 0,
      netIncome: valuationData.netIncome
        ? parseFloat(valuationData.netIncome)
        : null,
      industry: valuationData.industry || "other",
      assets: parseFloat(valuationData.assets) || 0,
      liabilities: parseFloat(valuationData.liabilities) || 0,
      yearsInOperation: valuationData.yearsInOperation || "less than 1 year",
      socialFollowers: parseInt(valuationData.socialFollowers) || 1,
      revenueTrend: valuationData.revenueTrend || "stable",
      currency: valuationData.currency || "usd",
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
      currency: processedData.currency,
    };

    // Calculate valuation
    const valuationResult = calculateBusinessValuation(calculationData);

    // Format the valuation amount
    const formattedValuation = formatCurrencyValue(
      valuationResult.totalValuation,
      processedData.currency
    );

    // Prepare data for MongoDB
    const valuationRecord = {
      companyName,
      businessIndividualName,
      email,
      formData: processedData,
      valuationResult: valuationResult.explanation,
      timestamp: new Date(),
    };

    // Save to MongoDB
    const savedValuation = await Valuation.create(valuationRecord);

    try {
      // Send valuation email
      await sendUserEmail(
        email,
        companyName,
        businessIndividualName,
        formattedValuation
      );

      // Return success response
      return NextResponse.json({
        content: valuationResult.explanation,
        message: "Valuation report has been sent to your email.",
        id: savedValuation._id,
      });
    } catch (error) {
      console.error("Email Error:", error);

      // Return partial success if valuation was saved but email failed
      return NextResponse.json(
        {
          content: valuationResult.explanation,
          message:
            "Valuation result available but email delivery failed. Please try again later.",
          id: savedValuation._id,
        },
        { status: 207 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    
    // Return error response
    return NextResponse.json(
      { error: "Failed to process valuation request" },
      { status: 500 }
    );
  }
}