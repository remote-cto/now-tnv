import jsPDF from 'jspdf';
import fs from 'fs';
import path from 'path';
import { formatDate } from './formatters';

interface ValuationData {
  companyName: string;
  valuationResult: string;
  formData: string;
  currency: string;
}

const currencyConfig: { [key: string]: { symbol: string; locale: string; format: string } } = {
  usd: { symbol: '$', locale: 'en-US', format: 'USD' },
  eur: { symbol: '€', locale: 'de-DE', format: 'EUR' },
  gbp: { symbol: '£', locale: 'en-GB', format: 'GBP' },
  inr: { symbol: '₹', locale: 'en-IN', format: 'INR' },
  kwd: { symbol: 'KD', locale: 'ar-KW', format: 'KWD' },
};

function getBase64Image(filePath: string): string {
  const fileData = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileData.toString('base64')}`;
}

function formatValuationText(text: string, currency: string, locale: string): string {
  return text.replace(/\$\s?\d+(?:[.,]\d{1,2})?(?:k|K|m|M|b|B)?/g, (match) => {
    const numStr = match.replace(/[$,]/g, '').toLowerCase();
    let multiplier = 1;

    if (numStr.endsWith('k')) multiplier = 1000;
    else if (numStr.endsWith('m')) multiplier = 1000000;
    else if (numStr.endsWith('b')) multiplier = 1000000000;

    const value = parseFloat(numStr.replace(/[kmb]/i, '')) * multiplier;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  });
}

export async function generateValuationPDF(data: ValuationData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const formDataObj = JSON.parse(data.formData);
      const currencySettings = currencyConfig[data.currency.toLowerCase()] || currencyConfig.usd;

      // Initialize PDF
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Set up dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = 20;

      // Add logo
      try {
        const logoPath = path.resolve('./public/images/NowCompany.png');
        const logoBase64 = getBase64Image(logoPath);

        const logoWidth = 60; // Adjust as needed
        const logoHeight = 20; // Adjust as needed
        const logoX = (pageWidth - logoWidth) / 2;

        doc.addImage(logoBase64, 'PNG', logoX, yPos, logoWidth, logoHeight);
        yPos += logoHeight + 10; // Add some spacing after the logo
      } catch (logoError) {
        console.error('Error adding logo:', logoError);
        yPos += 10;
      }

      // Add decorative line
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(margin, yPos, pageWidth - margin, yPos);

      // Title
      yPos += 20;
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      doc.text('Business Valuation Report', pageWidth / 2, yPos, { align: 'center' });

      // Date with styling
      yPos += 10;
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text(`Generated on ${formatDate(new Date())}`, pageWidth / 2, yPos, { align: 'center' });

      // Company Details Section
      yPos += 20;
      doc.setTextColor(0);
      doc.setFontSize(18);
      doc.text('Company Profile', margin, yPos);

      yPos += 10;
      doc.setFontSize(14);
      doc.text(data.companyName, margin, yPos);

      // Valuation Section with enhanced styling
      yPos += 20;
      doc.setFontSize(18);
      doc.text('Valuation Analysis', margin, yPos);

      // Format and add valuation result with better spacing
      const formattedValuation = formatValuationText(
        data.valuationResult,
        currencySettings.format,
        currencySettings.locale
      );

      yPos += 10;
      doc.setFontSize(12);
      const splitValuation = doc.splitTextToSize(formattedValuation, pageWidth - 2 * margin);
      doc.text(splitValuation, margin, yPos);
      yPos += splitValuation.length * 7;

      // Add form data summary in a structured way
      yPos += 15;
      doc.setFontSize(18);
      doc.text('Analysis Parameters', margin, yPos);

      yPos += 10;
      doc.setFontSize(12);
      Object.entries(formDataObj).forEach(([key, value]) => {
        yPos += 7;
        doc.text(`${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`, margin, yPos);
      });

      // Enhanced footer with better styling
      const footerY = doc.internal.pageSize.getHeight() - 25;
      doc.setDrawColor(200);
      doc.setLineWidth(0.3);
      doc.line(margin, footerY - 10, pageWidth - margin, footerY - 10);

      doc.setFontSize(10);
      doc.setTextColor(100);
      const footerText = 'This valuation report is based on the information provided and should be used for reference purposes only.';
      const copyright = `© ${new Date().getFullYear()} The Now Company - All rights reserved`;

      doc.text(footerText, pageWidth / 2, footerY, { align: 'center', maxWidth: pageWidth - 2 * margin });
      doc.text(copyright, pageWidth / 2, footerY + 7, { align: 'center' });

      // Convert to Buffer
      const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
      resolve(pdfBuffer);
    } catch (error: unknown) {
      console.error('PDF Generation Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      reject(new Error(`Failed to generate PDF: ${errorMessage}`));
    }
  });
}
