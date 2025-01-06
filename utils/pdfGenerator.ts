// utils/pdfGenerator.ts
import puppeteer from "puppeteer";
import { formatCurrency, formatDate } from "./formatters";

interface ValuationData {
  companyName: string;
  valuationResult: string;
  formData: string;
}

export async function generateValuationPDF(
  data: ValuationData
): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: "shell", // Fixed to use the correct type
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Extract business details from formData string
    const businessDetails = extractBusinessDetails(data.formData);

    // Generate HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Business Valuation Report - ${data.companyName}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .company-info {
              margin-bottom: 30px;
            }
            .valuation-details {
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 5px;
              margin-bottom: 30px;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 0.8em;
              color: #666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Business Valuation Report</h1>
            <p>Generated on ${formatDate(new Date())}</p>
          </div>
          
          <div class="company-info">
            <h2>${data.companyName}</h2>
          </div>
          
          <div class="valuation-details">
            <h3>Valuation Analysis</h3>
            <div style="white-space: pre-wrap;">${data.valuationResult}</div>
          </div>
          
          
          
          <div class="footer">
            <p>This valuation report is based on the information provided and should be used for reference purposes only.</p>
            <p>© ${new Date().getFullYear()} - All rights reserved</p>
          </div>
        </body>
      </html>
    `;

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdf = (await page.pdf({
      format: "A4",
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
      printBackground: true,
    })) as Buffer;

    return pdf;
  } finally {
    await browser.close();
  }
}

function extractBusinessDetails(formData: string) {
  // Extract values using regex
  const details: { [key: string]: any } = {};

  const matches = formData.match(/([a-zA-Z_]+):\s*([^,\n}]+)/g);
  if (matches) {
    matches.forEach((match) => {
      const [key, value] = match.split(":").map((s) => s.trim());
      if (key && value) {
        // Convert numeric strings to numbers
        details[key] = !isNaN(Number(value)) ? Number(value) : value;
      }
    });
  }

  return details;
}

function formatKey(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatValue(key: string, value: any): string {
  if (
    typeof value === "number" &&
    (key.includes("revenue") ||
      key.includes("income") ||
      key.includes("assets") ||
      key.includes("liabilities"))
  ) {
    return formatCurrency(value);
  }
  return String(value);
}
