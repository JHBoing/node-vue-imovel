var express = require('express');
var router = express.Router;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var mongoose = require('mongoose');

let parcelaController = require("./parcelaController");
var Consulta = require('../Model/consulta');
var Consulta = mongoose.model('Consulta');

module.exports = {
    //helpers
    store: function store(userId, parcelas, taxa, porcEntrada) {
        let date = Date.now();
        let novaConsulta = new Consulta({
            dataConsulta: date,
            porcEntrada,
            taxa,
            user: userId
        });

        novaConsulta.save(function(err, message) {
            if (err) console.log(err);
            parcelas.map((parcela, key) => {
                parcelaController.store(Consulta._id, parcela);
            });
        });

        return true;
    }
}