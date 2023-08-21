var html_to_pdf = require('html-pdf-node');
// var fs = require('fs');

export default function handler(req, res) {
    let options = { format: 'A4' };
    console.log(req.body)
    let file = { content: req.body, name: 'example.pdf', path: './mypdf.pdf' };

    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
        res.setHeader('Content-Type', 'application/pdf')

        //    const data = fs.writeFileSync('./src/components/my.pdf', pdfBuffer)
        return res.send(pdfBuffer)
    });
}
