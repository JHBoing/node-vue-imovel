var express = require('express');
var router = express.Router();

var ferramentas = require("../Utils/funcoesAuxiliares");

router.post('/', function(req, res) {

	let valorImovel = req.body.valorImovel;
	let taxa = req.body.taxa/100;
	let numeroParcelas = req.body.numeroParcelas;
	let porcentagemEntrada = req.body.porcentagemEntrada/100;
	let dataInicial = req.body.dataInicio;
	taxa = Math.pow((1+taxa),(1/12))-1;	

	dadosCalculo = {
		valorImovel,
		taxa,
		numeroParcelas,
		porcentagemEntrada,
		dataInicial
	}
	
	parcelas = ferramentas.calculoParcelas(dadosCalculo);
	res.send(parcelas);
});

module.exports = router;