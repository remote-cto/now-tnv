import jsPDF from 'jspdf';
import { formatDate } from './formatters';

interface ValuationData {
  companyName: string;
  valuationResult: string;
  formData: string;
}

export async function generateValuationPDF(data: ValuationData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      // Initialize PDF document
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Set default bold font
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
      
      // Valuation Result (with text wrapping)
      yPos += 10;
      doc.setFontSize(12);
      const splitValuation = doc.splitTextToSize(data.valuationResult, pageWidth - 2 * margin);
      doc.text(splitValuation, margin, yPos);
      yPos += splitValuation.length * 7;
      
      // Business Details section is commented out in original code
      // but if uncommented, it will inherit the bold font setting
      
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

function extractBusinessDetails(formData: string) {
  const details: { [key: string]: any } = {};
  try {
    const matches = formData.match(/([a-zA-Z_]+):\s*([^,\n}]+)/g);
    if (matches) {
      matches.forEach(match => {
        const [key, value] = match.split(':').map(s => s.trim());
        if (key && value) {
          details[key] = !isNaN(Number(value)) ? Number(value) : value;
        }
      });
    }
  } catch (error: unknown) {
    console.error('Error parsing form data:', error);
  }
  return details;
}

function formatKey(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatValue(key: string, value: any): string {
  if (typeof value === 'number' && 
      (key.includes('revenue') || 
       key.includes('income') || 
       key.includes('assets') || 
       key.includes('liabilities'))) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }
  return String(value);
}