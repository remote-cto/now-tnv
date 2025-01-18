import jsPDF from 'jspdf';
import { formatDate } from './formatters';

interface ValuationData {
  companyName: string;
  valuationResult: string;
  formData: string;
  currency: string;
}

// Extended currency configuration
const currencyConfig: { [key: string]: { symbol: string; locale: string; format: string }} = {
  usd: { symbol: '$', locale: 'en-US', format: 'USD' },
  eur: { symbol: '€', locale: 'de-DE', format: 'EUR' },
  gbp: { symbol: '£', locale: 'en-GB', format: 'GBP' },
  inr: { symbol: '₹', locale: 'en-IN', format: 'INR' },
  kwd: { symbol: 'KD', locale: 'ar-KW', format: 'KWD' }
};

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

      // Set default font
      doc.setFont('helvetica', 'bold');

      // Set initial position
      let yPos = 20;
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

function formatBusinessDetails(formData: any, currencySettings: { format: string; locale: string }): Record<string, string> {
  const formattedDetails: Record<string, string> = {};
  
  const currencyFields = ['revenue', 'netIncome', 'assets', 'liabilities'];
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value && typeof value !== 'undefined') {
      const formattedKey = formatKey(key);
      
      if (currencyFields.includes(key)) {
        // Format currency values
        const numValue = parseFloat(value as string);
        formattedDetails[formattedKey] = new Intl.NumberFormat(currencySettings.locale, {
          style: 'currency',
          currency: currencySettings.format,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(numValue);
      } else {
        // Format other values
        formattedDetails[formattedKey] = String(value);
      }
    }
  });
  
  return formattedDetails;
}

function formatKey(key: string): string {
  return key
    .split(/(?=[A-Z])|_/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}