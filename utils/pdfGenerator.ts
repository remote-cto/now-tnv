import jsPDF from 'jspdf';
import { formatDate } from './formatters';
import path from 'path';
import fs from 'fs';

interface ValuationData {
  companyName: string;
  valuationResult: string;
  formData: string;
  currency: string;
}

const currencyConfig: { [key: string]: { symbol: string; locale: string; format: string }} = {
  usd: { symbol: '$', locale: 'en-US', format: 'USD' },
  eur: { symbol: '€', locale: 'de-DE', format: 'EUR' },
  gbp: { symbol: '£', locale: 'en-GB', format: 'GBP' },
  inr: { symbol: '₹', locale: 'en-IN', format: 'INR' },
  kwd: { symbol: 'KD', locale: 'ar-KW', format: 'KWD' }
};

// Helper function to format valuation text with proper currency formatting
function formatValuationText(text: string, currency: string, locale: string): string {
  // Replace all currency values in the text
  return text.replace(/\$\s?\d+(?:[.,]\d{1,2})?(?:k|K|m|M|b|B)?/g, (match) => {
    // Extract numeric value
    const numStr = match.replace(/[$,]/g, '').toLowerCase();
    let multiplier = 1;
    
    // Handle suffixes
    if (numStr.endsWith('k')) {
      multiplier = 1000;
    } else if (numStr.endsWith('m')) {
      multiplier = 1000000;
    } else if (numStr.endsWith('b')) {
      multiplier = 1000000000;
    }
    
    const value = parseFloat(numStr.replace(/[kmb]/i, '')) * multiplier;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  });
}

export async function generateValuationPDF(data: ValuationData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Parse the formData string back to an object
      const formDataObj = JSON.parse(data.formData);
      
      // Get currency configuration
      const currencySettings = currencyConfig[data.currency.toLowerCase()] || currencyConfig.usd;

      // Initialize PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Load and add the logo
      const logoPath = path.join(process.cwd(), 'public', 'images', 'NowCompany.png');
      const logoImage = fs.readFileSync(logoPath);
      const logoDataUrl = `data:image/png;base64,${logoImage.toString('base64')}`;
      
      // Add logo to PDF (position at top left)
      doc.addImage(logoDataUrl, 'PNG', 20, 10, 30, 30); // Adjust dimensions as needed

      // Set default font
      doc.setFont('helvetica', 'bold');

      // Adjust initial position to accommodate logo
      let yPos = 50; // Increased to make room for logo
      const margin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Title
      doc.setFontSize(24);
      doc.text('Business Valuation Report', pageWidth / 2, yPos, { align: 'center' });
      
      // Date
      yPos += 10;
      doc.setFontSize(12);
      doc.text(`Generated on ${formatDate(new Date())}`, pageWidth / 2, yPos, { align: 'center' });
      
      // Company Name
      yPos += 20;
      doc.setFontSize(18);
      doc.text(data.companyName, margin, yPos);
      
      // Valuation Analysis
      yPos += 15;
      doc.setFontSize(16);
      doc.text('Valuation Analysis', margin, yPos);
      
      // Format the valuation result
      const formattedValuation = formatValuationText(
        data.valuationResult,
        currencySettings.format,
        currencySettings.locale
      );
      
      // Add formatted valuation result
      yPos += 10;
      doc.setFontSize(12);
      const splitValuation = doc.splitTextToSize(formattedValuation, pageWidth - 2 * margin);
      doc.text(splitValuation, margin, yPos);
      yPos += splitValuation.length * 7;

      // Footer
      const footerText = 'This valuation report is based on the information provided and should be used for reference purposes only.';
      const copyright = `© ${new Date().getFullYear()} - All rights reserved`;
      
      doc.setFontSize(10);
      const footerY = doc.internal.pageSize.getHeight() - 20;
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