const { PDFDocument } = require("pdf-lib");
const { writeFileSync } = require("fs");

async function createPDF() {
  const PDFdoc = await PDFDocument.create();
  const page = PDFdoc.addPage([595, 842]);
  writeFileSync("blank.pdf", await PDFdoc.save());
  // create text file
  
  console.log("PDF created successfully");
}

createPDF().catch((err) => console.log(err));