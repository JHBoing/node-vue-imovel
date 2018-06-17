var express = require('express');
var router = express.Router();

let ferramentas = require("../Utils/funcoesAuxiliares");
let consultaController = require("../config/Controller/consultaController");

router.post('/', function(req, res) {

	let valorImovel = req.body.form.valorImovel;
	let taxa = req.body.form.taxa/100;
	let numeroParcelas = req.body.form.numeroParcelas;
	let porcentagemEntrada = req.body.form.porcentagemEntrada/100;
	let dataInicial = req.body.form.dataInicio;
	taxa = Math.pow((1+taxa),(1/12))-1;	

	dadosCalculo = {
		valorImovel,
		taxa,
		numeroParcelas,
		porcentagemEntrada,
		dataInicial
    }
    
	let salario = req.body.form.salario;
    parcelas = ferramentas.calculoParcelas(dadosCalculo);
    let userId = req.body.user._id;

    let inserirConsulta = consultaController.store(userId, parcelas, taxa, porcentagemEntrada);

    if (!ferramentas.verificaSalario(salario, parcelas[0].valorParcela)) {
        res.send("Salario insuficiente")
    } else if (inserirConsulta) {
        res.send(parcelas);
    }



});

module.exports = router;