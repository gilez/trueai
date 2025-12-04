const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    const rawText = pdfParser.getRawTextContent();
    fs.writeFileSync("./pdf_content.txt", rawText);
    console.log('Text extracted to pdf_content.txt');
});

pdfParser.loadPDF("./BK21Four-Proposal.pdf");
