let nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
    criaEmail: function criaEmail() {
        var transporte = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASS 
            }
        });

        var email = {
            from: process.env.EMAIL_LOGIN,
            to: 'emaildestinatario',
            subject: 'NODE S2',
            html:'Segue anexo o arquivo com o resultado da sua consulta.',
            attachments: [{
                filename: 'output.pdf',
                path: './resources/pdf/output.pdf'
            }]
        };

        transporte.sendMail(email, function(err) {
            if (err) console.log(err);
            console.log("Email enviado");
        });
    } 
}