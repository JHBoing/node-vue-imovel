const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

app.use(bodyParser.json({ type: 'application/json' }));

var api = express.Router();

function calculoParcelas(dadosCalculo) {
	console.log("entrou aqui");
	let entrada = dadosCalculo.valorImovel * dadosCalculo.porcentagemEntrada;
	let financiavel = dadosCalculo.valorImovel - entrada;
	let amortizacao = financiavel/dadosCalculo.numeroParcelas;
	let numeroParcelas = dadosCalculo.numeroParcelas;
	let taxa = dadosCalculo.taxa;
	let parcelas = [];

	for(let i = 0; i < numeroParcelas; i++) {
		let numero = '';
		let saldoDevedor = '';
		let juros = '';
		let valorParcela = '';
		if(i == 0 ) {
			numero = i + 1;
			saldoDevedor = financiavel;
			juros = saldoDevedor * taxa;
			valorParcela = juros + amortizacao;
			
			parcelas.push({
				numero,
				saldoDevedor,
				juros,
				valorParcela
			});
        } else {
			numero = i + 1;
            saldoDevedor = parcelas[i-1].saldoDevedor - amortizacao;
            juros = saldoDevedor * taxa;
			valorParcela = juros + amortizacao;

			parcelas.push({
				numero,
				saldoDevedor,
				juros,
				valorParcela
			});
		}
	}

	return parcelas;

}

api.post('/parcelas', function(req, res) {

	let valorImovel = req.body.valorImovel;
	let taxa = req.body.taxa/100;
	let numeroParcelas = req.body.numeroParcelas;
	let porcentagemEntrada = req.body.porcentagemEntrada/100;
	taxa = Math.pow((1+taxa),(1/12))-1;	

	dadosCalculo = {
		valorImovel,
		taxa,
		numeroParcelas,
		porcentagemEntrada,
	}
	
	parcelas = calculoParcelas(dadosCalculo);
	console.log(parcelas);
	res.send(parcelas);
});

api.post('/salario', function () {

});

app.use('/api', api);

const port = 8000;

app.listen(port, () => {
	console.log("Online em: localhost:" + port);
});


