var express = require('express');
var router = express.Router;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var mongoose = require('mongoose');


var Parcela = require('../Model/parcela');
var Parcela = mongoose.model('Parcela');

module.exports = {
    //helpers
    store: function store(consultaId, parcela) {
        let novaParcela = new Parcela({
            saldoDevedor: parcela.saldoDevedor,
            juros: parcela.juros,
            dataVencimento: parcela.dataParcela,
            consulta: consultaId
        });

        novaParcela.save(function(err, message) {
            if (err) console.log(err);
        });
    }
}