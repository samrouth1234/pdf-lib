const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

async function create(input, output, callback) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const fields = pdfDoc.getForm().getFields();

        const pdfBytes = await pdfDoc.save();
        await writeFile(output, pdfBytes);

        console.log('PDF created!');
        callback(fields); // Call the callback with fields
    } catch (err) {
        console.log(err);
    }
}

create('tr-unlocked.pdf', 'result.pdf', (fields) => {
    console.log({fields}); // Log fields here
});


