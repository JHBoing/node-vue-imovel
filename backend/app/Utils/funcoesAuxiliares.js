module.exports = {
    calculoParcelas: function calculoParcelas(dadosCalculo) {
        let entrada = dadosCalculo.valorImovel * dadosCalculo.porcentagemEntrada;
        let financiavel = dadosCalculo.valorImovel - entrada;
        let amortizacao = financiavel/dadosCalculo.numeroParcelas;
        let numeroParcelas = dadosCalculo.numeroParcelas;
        let taxa = dadosCalculo.taxa;
        let dataInicial = dadosCalculo.dataInicial; 
        let parcelas = [];

        for(let i = 0; i < numeroParcelas; i++) {
            let numero = '';
            let saldoDevedor = '';
            let juros = '';
            let valorParcela = '';
            let dataParcela = '';

            if(i == 0 ) {
                numero = i + 1;
                saldoDevedor = financiavel;
                juros = saldoDevedor * taxa;
                valorParcela = juros + amortizacao;
                dataParcela = dataInicial;
                
                parcelas.push({
                    numero,
                    saldoDevedor,
                    juros,
                    valorParcela,
                    dataParcela
                });
            } else {
                numero = i + 1;
                saldoDevedor = parcelas[i-1].saldoDevedor - amortizacao;
                juros = saldoDevedor * taxa;
                valorParcela = juros + amortizacao;
                dataParcela = this.calculoDataParcelas(parcelas[i-1].dataParcela);

                parcelas.push({
                    numero,
                    saldoDevedor,
                    juros,
                    valorParcela,
                    dataParcela
                });
            }
        }

        return parcelas;
    },
    calculoDataParcelas: function calculoDataParcelas(data) {
        //transforma data que vem em string para formato Date do javascript
        let dia = data.substring(0, 2); 
        let mes = data.substring(3, 5);
        let ano = data.substring(6, 10);
        let dataAnterior = new Date(ano, mes, dia);

        //Calculo da nova data
        let novoMes = (dataAnterior.getMonth() + 1) % 13;
        let novoAno = dataAnterior.getFullYear() + (( (dataAnterior.getMonth() + 1) - novoMes) / 12);
        let novoDia = dia;
        
        novoMes = this.correcaoMes(novoMes);
        let dataParcela = novoDia + '/' + novoMes + '/' + novoAno;

        return dataParcela;
    },
    correcaoMes: function correcaoMes(mes) {
        if (isNaN(mes)) return false;
        //Se for menor que dez 1~9, adiciona o 0 antes do numero;
        return mes < 10 ? "0" + mes : mes;
    },
    verificaSalario: function verificaSalario(salario, valorParcela) {
        salario = salario * 0.3;
        if (salario > valorParcela) return true;
        else return false;
    },
}