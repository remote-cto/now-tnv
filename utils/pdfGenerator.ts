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

function formatNumber(value: number, currency: string, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function extractNumericValue(valuationResult: string): number {
  // Remove any currency symbols, commas, and other non-numeric characters
  // Keep decimal points and numbers
  const numStr = valuationResult.replace(/[^0-9.]/g, '');
  return parseFloat(numStr);
}

export async function generateValuationPDF(data: ValuationData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const formDataObj = JSON.parse(data.formData);
      const currencySettings = currencyConfig[data.currency.toLowerCase()] || currencyConfig.usd;
      const currentYear = new Date().getFullYear();

      // Initialize PDF with A3 landscape format
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a3',
        compress: true,
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 30;

      // First page - Full width image
      try {
        const coverImagePath = path.resolve('./public/images/cover-page.png');
        const coverImageBase64 = getBase64Image(coverImagePath);
        doc.addImage(coverImageBase64, 'PNG', 0, 0, pageWidth, pageHeight);
        doc.addPage();
      } catch (coverImageError) {
        console.error('Error adding cover image:', coverImageError);
      }

      // Second page header styling
      let yPos = 30;
      
      // Add "The.Now.Company." text on the left
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('The.Now.Company.', margin, yPos);

      // Add year on the right
      doc.text(`${currentYear}.`, pageWidth - margin, yPos, { align: 'right' });

      // Add the company name in large text
      yPos = pageHeight / 3;
      doc.setFontSize(72);
      doc.setFont('helvetica', 'bold');
      
      const maxWidth = pageWidth - (2 * margin);
      const splitCompanyName = doc.splitTextToSize(data.companyName, maxWidth);
      
      splitCompanyName.forEach((line: string, index: number) => {
        const lineY = yPos + (index * 80);
        doc.text(line, pageWidth / 2, lineY, { align: 'center' });
      });

      // Add third page for valuation result
      doc.addPage();

      // Header styling for third page
      yPos = 30;
      doc.setFontSize(16);
      doc.setFont('helvetica', 'normal');
      doc.text('The.Now.Company.', margin, yPos);
      doc.text(`${currentYear}.`, pageWidth - margin, yPos, { align: 'right' });

      // Add currency code in large text
      yPos = pageHeight / 4;
      doc.setFontSize(72);
      doc.setFont('helvetica', 'bold');
      doc.text(data.currency.toUpperCase(), margin, yPos);

      // Add valuation amount in large text
      yPos = pageHeight / 2;
      doc.setFontSize(120);
      doc.setFont('helvetica', 'bold');

      // Extract and format the numeric value
      const numericValue = extractNumericValue(data.valuationResult);
      const formattedValue = formatNumber(
        numericValue,
        currencySettings.format,
        currencySettings.locale
      );

      // Remove any currency symbol from the formatted value if it exists
      const cleanFormattedValue = formattedValue.replace(/[£$€₹KD]/g, '').trim();
      
      // Add formatted number to PDF
      doc.text(cleanFormattedValue, margin, yPos);

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