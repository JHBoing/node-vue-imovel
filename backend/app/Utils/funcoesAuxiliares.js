module.exports = {
    calculoParcelas: function calculoParcelas(dadosCalculo) {
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
    },
    verificaSalario: function verificaSalario(salario, valorParcela) {
        salario = salario * 0.3;
        if (salario > valorParcela) return true;
        else return false;
    }
}