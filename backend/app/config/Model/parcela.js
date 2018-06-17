var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ParcelaSchema = new Schema({
    saldoDevedor: Number,
    juros: Number,
    valorParcela: Number,
    dataVencimento: String,
    consulta: {type: Schema.Types.ObjectId, ref: 'Consulta'}
});
mongoose.model('Parcela', ParcelaSchema);

module.exports = mongoose.model('Parcela');