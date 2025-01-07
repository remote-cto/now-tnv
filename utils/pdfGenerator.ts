import puppeteer, { PuppeteerLaunchOptions } from 'puppeteer';
import { formatDate } from "./formatters";
import { Buffer } from 'buffer';

interface ValuationData {
  companyName: string;
  valuationResult: string;
  formData: string;
}

export async function generateValuationPDF(data: ValuationData): Promise<Buffer> {
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
          @page {
            margin: 20mm;
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

  try {
    const launchOptions: PuppeteerLaunchOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF and convert the result to a proper Buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '20mm',
        right: '20mm'
      }
    });

    await browser.close();

    // Convert Uint8Array to Buffer if necessary
    return Buffer.from(pdfBuffer);

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('PDF Generation Error:', errorMessage);
    throw new Error(`Failed to generate PDF: ${errorMessage}`);
  }
}