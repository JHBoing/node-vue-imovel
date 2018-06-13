var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    nome: String,
    CPF: String,
    dataNascimento: Date,
    FGTS: Number
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');