const fs = require('fs');
// Use the specific CJS entry point found
const pdf = require('./node_modules/pdf-parse/dist/node/cjs/index.cjs');

let dataBuffer = fs.readFileSync('BK21Four-Proposal.pdf');

// Check if it's a function or object with default
if (typeof pdf === 'function') {
    pdf(dataBuffer).then(function (data) {
        fs.writeFileSync('pdf_content.txt', data.text);
        console.log('Text extracted to pdf_content.txt');
    }).catch(function (error) {
        console.log('Error:', error);
    });
} else if (pdf.default && typeof pdf.default === 'function') {
    pdf.default(dataBuffer).then(function (data) {
        fs.writeFileSync('pdf_content.txt', data.text);
        console.log('Text extracted to pdf_content.txt');
    }).catch(function (error) {
        console.log('Error:', error);
    });
} else {
    console.log('Still not a function. Keys:', Object.keys(pdf));
}
