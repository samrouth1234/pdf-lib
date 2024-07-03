const { PDFDocument, rgb, degrees } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit'); // Import fontkit
const fs = require('fs').promises;

async function createPdf() {
  try {
    // Load the existing PDF document
    const pdfBytes = await fs.readFile('./file.pdf');
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Register fontkit
    pdfDoc.registerFontkit(fontkit);

    // Load and embed the custom font
    const ubuntuFontBytes = await fs.readFile('./KHMERMPTC.OTF');
    const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes);

    // Get the first page of the document
    const page = pdfDoc.getPage(0);
    
    // Get the form instance
    const form = pdfDoc.getForm();

    // Create text fields
    const name = form.createTextField('gundam.model.name');
    name.setText('Dara');
    const sex = form.createTextField('gundam.model.sex');
    sex.setText('Male');
    const age = form.createTextField('gundam.model.age');
    age.setText('23');

    const planetsField = form.createDropdown('favorite.planet')
    planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
    planetsField.select('Pluto')
    planetsField.addToPage(page, { 
      x: 55,
      y: 220 
    })

    const exiaField = form.createCheckBox('gundam.exia')
    const kyriosField = form.createCheckBox('gundam.kyrios')
    const virtueField = form.createCheckBox('gundam.virtue')
    const dynamesField = form.createCheckBox('gundam.dynames')
  
    exiaField.addToPage(page, { 
      x: 55,
      y: 380 
    })
    kyriosField.addToPage(page, { 
      x: 55,
      y: 320 
    })
    virtueField.addToPage(page, { 
      x: 275, 
      y: 380 
    })

    dynamesField.addToPage(page, { 
      x: 275, 
      y: 320 
    })

    exiaField.check()
    dynamesField.check()

    page.drawText('Select your favorite planet*:', { 
      x: 50, 
      y: 280, 
      size: 20 
    })

    // Configure and add the text field to the page
    name.addToPage(page, {
      x: 10,
      y: 800,
      width: 200,
      height: 30,
      textColor: rgb(1, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
      // rotate: degrees(90), // Uncomment if you want to use rotation
      font: ubuntuFont, // Use the embedded custom font
    });

    sex.addToPage(page, {
      x: 220,
      y: 800,
      width: 100,
      height: 30,
      textColor: rgb(1, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
      font: ubuntuFont,
    });

    age.addToPage(page, {
      x: 330,
      y: 800,
      width: 100,
      height: 30,
      textColor: rgb(1, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
      font: ubuntuFont,
    });

    // List all form fields in the document
    const fields = pdfDoc.getForm().getFields();
    console.log({ fields });

    // Save the modified PDF document
    const pdfBytesModified = await pdfDoc.save();
    await fs.writeFile('./new-pdf.pdf', pdfBytesModified);
    console.log('PDF saved successfully.');
  } catch (error) {
    console.error('Error creating PDF:', error);
  }
}

createPdf(); // Call the function to execute the PDF creation process
