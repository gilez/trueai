import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = "BK21Four-Proposal.pdf";
const data = new Uint8Array(fs.readFileSync(pdfPath));

// Set worker source (fake worker for node)
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.mjs'; 
// Actually in node we might not need to set workerSrc if we use the right import, 
// but let's try without first or use disableWorker: true

const loadingTask = pdfjsLib.getDocument({
    data: data,
    // disableWorker: true // Try disabling worker if it complains
});

loadingTask.promise.then(async function (pdf) {
    console.log('PDF loaded');
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(" ");
        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    }

    fs.writeFileSync("pdf_content.txt", fullText);
    console.log("Text extracted to pdf_content.txt");

}, function (reason) {
    console.error(reason);
});
