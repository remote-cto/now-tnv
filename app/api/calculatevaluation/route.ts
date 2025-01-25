import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import cron from "node-cron";
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
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

async function sendUserEmail(
  email: string,
  companyName: string,
  businessIndividualName: string,
  formattedValuation: string
) {
  const htmlContent = `
    <h1>Dear ${businessIndividualName},</h1>
    <h2>Your Business Valuation Report</h2>
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
    html: htmlContent,
  });
}

// New function for follow-up email
async function sendFollowUpEmail(
  email: string,
  companyName: string,
  businessIndividualName: string
) {
  const htmlContent = `
    <h1>Hi ${businessIndividualName},</h1>
    <h2>Upgrade Your Business Valuation</h2>
    <p>We noticed you recently used our business valuation tool for ${companyName}.</p>
    
    <p>Upgrade now and unlock deeper insights into your business's potential!</p>
    
    <br><br>
    <p>Best regards,</p>
    <p>Your Business Valuation Team</p>
  `;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Upgrade Your Business Valuation - ${companyName}`,
    html: htmlContent,
  });
}

// Schedule follow-up email
function scheduleFollowUpEmail(
  email: string,
  companyName: string,
  businessIndividualName: string
) {
  // Schedule email to be sent after 5 minutes
  const scheduledTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  cron.schedule(
    scheduledTime.toISOString(),
    async () => {
      try {
        await sendFollowUpEmail(email, companyName, businessIndividualName);
        console.log(`Follow-up email scheduled and sent to ${email}`);
      } catch (error) {
        console.error("Follow-up Email Scheduling Error:", error);
      }
    },
    {
      scheduled: true,
      timezone: "UTC",
    }
  );
}

export async function POST(request: Request) {
  try {
    await dbConnect();

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

    // Calculate valuation using the properly formatted data
    const valuationResult = calculateBusinessValuation(calculationData);

    // Format the valuation amount
    const formattedValuation = formatCurrencyValue(
      valuationResult.totalValuation,
      processedData.currency
    );

    // Store in MongoDB with the descriptive field names
    const valuationRecord = {
      companyName,
      businessIndividualName,
      email,
      formData: processedData,
      valuationResult: valuationResult.explanation,
      timestamp: new Date(),
    };

    const savedValuation = await Valuation.create(valuationRecord);

    try {
      // Send initial valuation email
      await sendUserEmail(
        email,
        companyName,
        businessIndividualName,
        formattedValuation
      );

      // Schedule follow-up email
      scheduleFollowUpEmail(email, companyName, businessIndividualName);

      return NextResponse.json({
        content: valuationResult.explanation,
        message:
          "Valuation report has been sent to your email. A follow-up email will be sent shortly.",
        id: savedValuation._id,
      });
    } catch (error) {
      console.error("Email Error:", error);

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
    return NextResponse.json(
      { error: "Failed to process valuation request" },
      { status: 500 }
    );
  }
}
