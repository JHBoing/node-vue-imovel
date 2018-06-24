const funcoesAuxiliares = require('../../app/Utils/funcoesAuxiliares');

//Setup
//Act
//Assert

test('Deve retornar que o salario é valido; true', () => {
    let salario = 50000;
    let valorParcela = 3000;
    expect(funcoesAuxiliares.verificaSalario(salario, valorParcela)).toBeTruthy;
});

test('Deve retornar que o salario é invalido; false', () => {
    let salario = 3000;
    let valorParcela = 50000;
    expect(funcoesAuxiliares.verificaSalario(salario, valorParcela)).toBeFalsy;
});

test('Correção mes com numero sem 0', () => {
    let mes = "1";
    let mesEsperado = "01";
    expect(funcoesAuxiliares.correcaoMes(mes)).toBe(mesEsperado);
});

test('Correção mes com numero acima ou igual a 10', () => {
    let mes = "11";
    let mesEsperado = "11";
    expect(funcoesAuxiliares.correcaoMes(mes)).toBe(mesEsperado);
});

test('Correção mes com valor NaN', () => {
    let mes = NaN;
    expect(funcoesAuxiliares.correcaoMes(mes)).toBeFalsy;
});

test('Deve retornar o próximo mês, avançando o ano', () => {
    let data = "01/12/2018";
    let dataEsperada = "01/01/2019";
    expect(funcoesAuxiliares.calculoDataParcelas(data)).toBe(dataEsperada);
});

//TODO calculoPascelas. Quebrar em functions menores?