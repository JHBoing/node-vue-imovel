var express = require('express');
var router = express.Router;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var mongoose = require('mongoose');

var User = require('../Model/user');
var User = mongoose.model('User');

exports.register = function(req, res) {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    let newUser = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        nome: req.body.nome,
        CPF: req.body.cpf,
        dataNascimento: req.body.dataNascimento,
        FGTS: req.body.fgts
    });
    newUser.save(function(err, message) {
        if (err) res.send(err);
        let token = jwt.sign({ id: User._id}, config.secret, {
            expiresIn: 86400 //24 horas
        });
        res.status(200).send({auth: true, token: token});
    })
};

exports.login = function(req, res) {
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) return res.status(500).send("Erro no servidor");
        if (!user) return res.status(404).send("Usuario nao foi encontrado");

        let senhaValida = bcrypt.compareSync(req.body.password, user.password);
        if (!senhaValida) return res.status(401).send({ auth: false, token: null });

        let token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, token: token});
    });
};

exports.me = function (req, res) {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'Envie o token'});
    } else {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token'});
            } else {
                User.findById(decoded.id, { password: 0 }, function(err, user) {
                    if (err) {
                        return res.status(500).send("Nao foi possivel achar o usuario");
                    } else if (!user) {
                        return res.status(404).send("Nenhum usuario encontrado");
                    } else {
                        res.status(200).send(user);
                    }
                });
            }
        });
    }
};

