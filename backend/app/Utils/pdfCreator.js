let PDFDocument = require('pdfkit');
let fs = require('fs');
module.exports = {
    criaPDFParcelas: function criaPDFParcelas(parcelas) {
        let doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('./resources/pdf/output.pdf'));

        doc.fontSize(25)
            .text('Aqui vai ser o titulo')
            .text('Como que insere colunas aqui?');

        doc.end();
        return true;
    }
}