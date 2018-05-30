const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();

app.use(bodyParser.json({ type: 'application/json' }));

var api = express.Router();

api.post('/', function(req, res) {
	console.log(req.body);

	let valorImovel = req.body.valorImovel;
	let taxa = req.body.taxa/100;
	let numeroParcelas = req.body.numeroParcelas;
	let porcentagemEntrada = req.body.porcentagemEntrada/100;
	taxa = Math.pow((1+taxa),(1/12))-1;

	let entrada = valorImovel*porcentagemEntrada;
	let financiavel = valorImovel - entrada;
	let amortizacao = financiavel/numeroParcelas;
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
	res.send(parcelas);
});

app.use('/api', api);

const port = 8000;

app.listen(port, () => {
	console.log("Online em: localhost:" + port);
});


