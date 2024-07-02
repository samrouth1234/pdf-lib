const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function createD() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.setSubject('PDF Subject');
  pdfDoc.setTitle('PDF Title');
  const page = pdfDoc.addPage([350, 400]);
  page.moveTo(110, 200);
  page.drawText('Hello World!', { x: 110, y: 200, size: 50 });

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync('output.pdf', pdfBytes); // Save the PDF to a file
}

createD().catch(console.error);
