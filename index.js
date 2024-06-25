const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const { log } = require('console');

async function createPdfWithText(input, output) {
  try {
    // Load the existing PDF document
    const pdfDoc = await PDFDocument.load(await readFile(input));
    
    // // Get the first page of the document (if it exists)
    // let pages = pdfDoc.getPages();
    // let page = pages.length > 0? pages[0] : await pdfDoc.addPage();

    // // Add text to the page
    // const fontSize = 12;
    // const text = textToAdd || 'This is some text added to the PDF.';
    // const textInstance = page.drawText(text, {
    //   x: 50,
    //   y: 700,
    //   size: fontSize,
    // });

    const form = pdfDoc.getForm()

    log(form.getFields());

    // form.getTextField('Text1').setText('Some Text');
    form.getRadioGroup('Group2').select('Choice1');
    form.getRadioGroup('Group3').select('Choice3');
    form.getRadioGroup('Group4').select('Choice1');
    form.getCheckBox('Check Box3').check();
    form.getCheckBox('Check Box4').uncheck();
    form.getDropdown('Dropdown7').select('Infinity');
    form.getOptionList('List Box6').select('Honda');
  
    form.flatten();

    // Save the PDF bytes
    const pdfBytes = await pdfDoc.save();

    // Write the PDF bytes to the output file
    await writeFile(output, pdfBytes);

    console.log('PDF file has been created successfully with text added.');
  } catch (err) {
    console.error(err);
  }
}

// Example usage
createPdfWithText('form_to_flatten.pdf', 'output.pdf');
