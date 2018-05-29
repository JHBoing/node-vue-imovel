module.exports = function(app) {
    app.get('/teste', (req, res) => {
        res.send("Hello World")
    });

    app.post('/enviar', (req, res) => {
        console.log(req.body);
        res.send("Obrigado, aqui esta sua resposta");
    });

};