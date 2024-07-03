const { PDFDocument, StandardFonts } = require('pdf-lib');
const {writeFileSync, readFileSync } = require('fs'); 

async function createPdf() {
  const pdfDoc = await PDFDocument.load(readFileSync("./lib.pdf")); 
//   const courierFont = await pdfDoc.embedFont(StandardFonts.Courier);
  
//   // Corrected variable name and removed the size parameter from addPage
//   const page = pdfDoc.addPage([595, 842]); 
//   page.drawText('Some boring latin text in the Courier font', {
//     x: 50,
//     y: 50,
//     size: 30,
//     font: courierFont,
//   });
  
//   const pdfBytes = await pdfDoc.save();
//   console.log(pdfBytes);

//   // Corrected variable name and fixed typo in function name

  const courierBoldFont = await pdfDoc.embedFont(StandardFonts.Courier);
  const firstPage = pdfDoc.getPage(0);

  const fields = pdfDoc.getForm().getFields();
  console.log({fields});

  firstPage.moveTo(72, 570);
  firstPage.drawText(new Date().toUTCString(), {
    font: courierBoldFont,
    size: 12,
  });

  firstPage.moveTo(105, 530);
  firstPage.drawText("Ms. Jane,", {
    font: courierBoldFont,
    size: 12,
  });

  firstPage.moveTo(72, 330);
  firstPage.drawText("John Doe \nSr. Vice President Engineering \nLogRocket", {
    font: courierBoldFont,
    size: 12,
    lineHeight: 10,
  });
  writeFileSync("me.pdf", await pdfDoc.save());

  console.log("PDF created successfully");
}

createPdf().catch(console.error);
