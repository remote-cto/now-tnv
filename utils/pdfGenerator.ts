
//utils/pdfGenerator.ts
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export async function generateValuationPDF(
  valuationData: any,
  companyName: string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
        autoFirstPage: true,
        bufferPages: true,
      });

      const chunks: any[] = [];

      // Handle document chunks
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      // Load a custom font
      const fontPath = path.resolve(__dirname, "../fonts/Roboto-Regular.ttf");
      if (!fs.existsSync(fontPath)) {
        throw new Error(`Font file not found: ${fontPath}`);
      }
      doc.font(fontPath);

      // Add header
      doc
        .fontSize(20)
        .text("Business Valuation Report", {
          align: "center",
        });

      doc.moveDown();
      doc
        .fontSize(16)
        .text(`Company: ${companyName}`, {
          align: "left",
        });

      doc.moveDown();
      doc
        .fontSize(12)
        .text(`Generated on: ${new Date().toLocaleDateString()}`, {
          align: "left",
        });

      doc.moveDown(2);

      // Add valuation content
      doc
        .fontSize(14)
        .text("Valuation Analysis", {
          align: "left",
        });

      doc.moveDown();

      // Format and add the valuation data
      doc
        .fontSize(12)
        .text(valuationData, {
          align: "left",
          lineGap: 10,
        });

      doc.moveDown(2);

      // Add footer
      doc
        .fillColor("#666666")
        .fontSize(10)
        .text(
          "This valuation is based on provided information and should be used for reference purposes only.",
          {
            align: "center",
          }
        );

      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error("PDF Generation Error:", error);
      reject(error);
    }
  });
}
