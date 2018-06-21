let PDFDocument = require('pdfkit');
let fs = require('fs');
let emailCreator = require('./emailCreator');
module.exports = {
    criaPDFParcelas: function criaPDFParcelas(parcelas, email) {
        let doc = new PDFDocument;
        doc.pipe(fs.createWriteStream('./resources/pdf/output.pdf'));

        doc.fontSize(25)
            .text('Parcelas');

        doc.moveDown();
        doc.fontSize(14)
        doc.text('Saldo Devedor | Juros | Valor | Data de Vencimento')
        parcelas.map((parcela, key) => {            
            doc.text(key + ' | ' + parcela.saldoDevedor + ' | ' + parcela.juros + ' | ' + parcela.valorParcela + ' | ' + parcela.dataParcela);
            doc.moveDown();
        });
        doc.end();
        emailCreator.criaEmail(email);
        return true;
    }
}