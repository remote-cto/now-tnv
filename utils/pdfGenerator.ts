
//utils/pdfGenerator.ts
// import jsPDF from 'jspdf';
// import fs from 'fs';
// import path from 'path';
// import { formatDate } from './formatters';

// interface ValuationData {
//   companyName: string;
//   valuationResult: string;
//   formData: string;
//   currency: string;
// }

// const currencyConfig: { [key: string]: { symbol: string; locale: string; format: string } } = {
//   usd: { symbol: '$', locale: 'en-US', format: 'USD' },
//   eur: { symbol: '€', locale: 'de-DE', format: 'EUR' },
//   gbp: { symbol: '£', locale: 'en-GB', format: 'GBP' },
//   inr: { symbol: '₹', locale: 'en-IN', format: 'INR' },
//   kwd: { symbol: 'KD', locale: 'ar-KW', format: 'KWD' },
// };

// function getBase64Image(filePath: string): string {
//   const fileData = fs.readFileSync(filePath);
//   return `data:image/png;base64,${fileData.toString('base64')}`;
// }

// function formatNumber(value: number, currency: string, locale: string): string {
//   if (currency.toLowerCase() === 'kwd') {
//     return `${value.toLocaleString('en-US')} KWD`;
//   }
  
//   return new Intl.NumberFormat(locale, {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(value);
// }

// function extractNumericValue(valuationResult: string): number {
//   const numStr = valuationResult.replace(/[^0-9.]/g, '');
//   return parseFloat(numStr);
// }

// function addMethodologyPage(doc: jsPDF, pageWidth: number, pageHeight: number, margin: number) {
//   doc.addPage();
  
//   // Add header with larger, bold font
//   doc.setFontSize(24);
//   doc.setFont('helvetica', 'bold');
//   doc.text('The.Now.Company.', margin, 30);
//   doc.text(`${new Date().getFullYear()}.`, pageWidth - margin, 30, { align: 'right' });

//   // Add main heading
//   const headingY = 120;
//   doc.setFontSize(48);
//   doc.setFont('helvetica', 'bold');
//   doc.text('Get more out of your numbers', margin, headingY);

//   // Add descriptive text with larger font and bold
//   // Reduced gap by changing the Y position offset from 40 to 20
//   const description = `Our valuation methodology leverages advanced financial models and market insights to provide a comprehensive analysis of your business. Increasing your company's value often involves optimizing financial performance, improving operational efficiency, and strengthening market positioning. We can guide you through tailored strategies to achieve these goals, offering expertise in financial planning and operational improvements. Let us help you unlock your business's full potential and maximize its value.`;

//   doc.setFontSize(20);
//   doc.setFont('helvetica', 'bold');
//   const maxWidth = pageWidth - (2 * margin);
//   const splitDescription = doc.splitTextToSize(description, maxWidth);
//   doc.text(splitDescription, margin, headingY + 20); // Reduced from headingY + 40 to headingY + 20

//   // Add smaller X mark below description
//   try {
//     const xMarkPath = path.resolve('./public/images/x-mark.png');
//     const xMarkBase64 = getBase64Image(xMarkPath);
//     const xMarkSize = 50; // Reduced from 80 to 50
    
//     // Calculate position to place X mark below description
//     const descriptionHeight = splitDescription.length * 12;
//     const xMarkY = headingY + 20 + descriptionHeight + 20; // Adjusted Y position based on new description position
    
//     doc.addImage(
//       xMarkBase64,
//       'PNG',
//       pageWidth - margin - xMarkSize,
//       xMarkY,
//       xMarkSize,
//       xMarkSize
//     );
//   } catch (xMarkError) {
//     console.error('Error adding X mark:', xMarkError);
//   }
// }

// export async function generateValuationPDF(data: ValuationData): Promise<Buffer> {
//   return new Promise((resolve, reject) => {
//     try {
//       const formDataObj = JSON.parse(data.formData);
//       const currencySettings = currencyConfig[data.currency.toLowerCase()] || currencyConfig.usd;
//       const currentYear = new Date().getFullYear();

//       // Initialize PDF with A3 landscape format
//       const doc = new jsPDF({
//         orientation: 'landscape',
//         unit: 'mm',
//         format: 'a3',
//         compress: true,
//       });

//       const pageWidth = doc.internal.pageSize.getWidth();
//       const pageHeight = doc.internal.pageSize.getHeight();
//       const margin = 30;

//       // First page - Full width image
//       try {
//         const coverImagePath = path.resolve('./public/images/cover-page.png');
//         const coverImageBase64 = getBase64Image(coverImagePath);
//         doc.addImage(coverImageBase64, 'PNG', 0, 0, pageWidth, pageHeight);
//         doc.addPage();
//       } catch (coverImageError) {
//         console.error('Error adding cover image:', coverImageError);
//       }

//       // Second page - Company name
//       let yPos = 30;
//       doc.setFontSize(24);
//       doc.setFont('helvetica', 'bold');
//       doc.text('The.Now.Company.', margin, yPos);
//       doc.text(`${currentYear}.`, pageWidth - margin, yPos, { align: 'right' });

//       yPos = pageHeight / 3;
//       doc.setFontSize(72);
//       doc.setFont('helvetica', 'bold');
      
//       const maxWidth = pageWidth - (2 * margin);
//       const splitCompanyName = doc.splitTextToSize(data.companyName, maxWidth);
      
//       splitCompanyName.forEach((line: string, index: number) => {
//         const lineY = yPos + (index * 80);
//         doc.text(line, pageWidth / 2, lineY, { align: 'center' });
//       });

//       // Third page - Valuation result with light green background
//       doc.addPage();
      
//       // Add light green background
//       doc.setFillColor(0, 171, 132);
//       doc.rect(0, 0, pageWidth, pageHeight, 'F');
      
//       yPos = 30;
//       doc.setFontSize(24);
//       doc.setFont('helvetica', 'bold');
//       doc.text('The.Now.Company.', margin, yPos);
//       doc.text(`${currentYear}.`, pageWidth - margin, yPos, { align: 'right' });

//       yPos = pageHeight / 4;
//       doc.setFontSize(72);
//       doc.setFont('helvetica', 'bold');
//       doc.text(data.currency.toUpperCase(), margin, yPos);

//       yPos = pageHeight / 2;
//       doc.setFontSize(120);
//       doc.setFont('helvetica', 'bold');

//       const numericValue = extractNumericValue(data.valuationResult);
//       const formattedValue = formatNumber(
//         numericValue,
//         currencySettings.format,
//         currencySettings.locale
//       );
//       const cleanFormattedValue = formattedValue
//         .replace(/[£$€₹]/g, '')  // Remove currency symbols
//         .replace(/\s*KWD\s*/, '') // Remove KWD with any surrounding spaces
//         .trim();
//       doc.text(cleanFormattedValue, margin, yPos);

//       // Add fourth page - Methodology
//       addMethodologyPage(doc, pageWidth, pageHeight, margin);

//       // Convert to Buffer
//       const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
//       resolve(pdfBuffer);
//     } catch (error: unknown) {
//       console.error('PDF Generation Error:', error);
//       const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//       reject(new Error(`Failed to generate PDF: ${errorMessage}`));
//     }
//   });
// }