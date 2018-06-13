var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ParcelaSchema = new Schema({
    saldoDevedor: Number,
    juros: Number,
    valorParcela: Number,
    dataVencimento: Date,
    consulta: [{type: Schema.Types.ObjectId, ref: 'Consulta'}]
});
mongoose.model('Parcela', ParcelaSchema);

module.exports = mongoose.model('Parcela');