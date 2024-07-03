const { PDFDocument, rgb, degrees } = require('pdf-lib');
const fs = require('fs').promises;

async function createPdf() {
  try {
    // Load the existing PDF document
    const pdfBytes = await fs.readFile('./file.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Uncomment and use the following lines if you have the Ubuntu font and want to embed it
    // const ubuntuFontBytes = await fs.readFile('path/to/ubuntu-font.ttf');
    // const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes);

    // Add a new page
    const page = pdfDoc.getPage(0);
    
    // Get the form instance
    const form = pdfDoc.getForm();

    // Create a text field
    const textField = form.createTextField('gundam.model.name');
    textField.setText('Hello World');

    // Configure and add the text field to the page
    textField.addToPage(page, {
      x: 300,
      y: 400,
      width: 200,
      height: 100,
      textColor: rgb(1, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
      // rotate: degrees(90), // Use degrees to specify the rotation
      // font: ubuntuFont, // Uncomment if you are using a custom font
    });
    
    const fields = pdfDoc.getForm().getFields();
    console.log({fields});

    // Save the modified PDF document
    const pdfBytesModified = await pdfDoc.save();
    await fs.writeFile('./new-pdf.pdf', pdfBytesModified);
    console.log('PDF saved successfully.');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}

createPdf(); // Call the function to execute the PDF creation process
